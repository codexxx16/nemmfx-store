import { NextRequest, NextResponse } from 'next/server';

const PAYPAL_API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await res.json();
  return data.access_token;
}

const processedTransactions = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const { orderID } = await request.json();

    if (!orderID) {
      return NextResponse.json(
        { error: 'Missing orderID' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    const verifyRes = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: 'Failed to verify PayPal order' },
        { status: 500 }
      );
    }

    const orderDetails = await verifyRes.json();

    if (orderDetails.status === 'COMPLETED') {
      const transactionId =
        orderDetails.purchase_units?.[0]?.payments?.captures?.[0]?.id;

      if (transactionId && processedTransactions.has(transactionId)) {
        return NextResponse.json({
          status: 'COMPLETED',
          message: 'Order already processed',
          transactionId,
        });
      }

      if (transactionId) {
        processedTransactions.add(transactionId);
      }

      await saveOrderToDatabase(orderID, transactionId, orderDetails);

      return NextResponse.json({
        status: 'COMPLETED',
        transactionId,
        orderId: orderID,
      });
    }

    if (orderDetails.status === 'APPROVED') {
      const captureRes = await fetch(
        `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!captureRes.ok) {
        return NextResponse.json(
          { error: 'Failed to capture PayPal payment' },
          { status: 500 }
        );
      }

      const captureData = await captureRes.json();

      if (captureData.status === 'COMPLETED') {
        const transactionId =
          captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id;

        if (transactionId && processedTransactions.has(transactionId)) {
          return NextResponse.json({
            status: 'COMPLETED',
            message: 'Order already processed',
            transactionId,
          });
        }

        if (transactionId) {
          processedTransactions.add(transactionId);
        }

        await saveOrderToDatabase(orderID, transactionId, captureData);

        return NextResponse.json({
          status: 'COMPLETED',
          transactionId,
          orderId: orderID,
        });
      }

      return NextResponse.json(
        { error: 'Payment capture not completed', status: captureData.status },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Order not approved', status: orderDetails.status },
      { status: 400 }
    );
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function saveOrderToDatabase(
  orderID: string,
  transactionId: string | undefined,
  _orderDetails: Record<string, unknown>
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn('Supabase not configured, skipping order save');
      return;
    }

    const amount =
      (_orderDetails as Record<string, Array<Record<string, Record<string, string>>>>)
        .purchase_units?.[0]?.amount?.value || '0';
    const totalUsd = parseFloat(amount);
    const vatUsd = totalUsd * 0.15 / 1.15;
    const subtotalUsd = totalUsd - vatUsd;

    await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        id: orderID,
        status: 'fulfilled',
        payment_method: 'paypal',
        paypal_transaction_id: transactionId || null,
        subtotal_usd: subtotalUsd,
        vat_usd: vatUsd,
        total_usd: totalUsd,
        fulfilled_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error('Failed to save order to database:', err);
  }
}
