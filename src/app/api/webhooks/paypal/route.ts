import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = body.event_type;

    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      console.warn('PayPal webhook ID not configured');
      return NextResponse.json({ status: 'received' });
    }

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      const resource = body.resource;
      const transactionId = resource?.id;
      const orderId = resource?.supplementary_data?.related_ids?.order_id;
      const amount = resource?.amount?.value;

      console.log('PayPal payment completed:', {
        transactionId,
        orderId,
        amount,
      });

      if (orderId) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseKey) {
          await fetch(
            `${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`,
            {
              method: 'PATCH',
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
              },
              body: JSON.stringify({
                status: 'fulfilled',
                paypal_transaction_id: transactionId,
                fulfilled_at: new Date().toISOString(),
              }),
            }
          );
        }
      }
    }

    return NextResponse.json({ status: 'received' });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
