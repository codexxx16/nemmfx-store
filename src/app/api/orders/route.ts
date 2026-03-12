import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ orders: [], order: null });
    }

    if (orderId) {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/orders?id=eq.${orderId}&select=*,order_items(*)`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      const orders = await res.json();
      return NextResponse.json({ order: orders?.[0] || null });
    }

    const userRes = await fetch(
      `${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(session.user.email)}&select=id`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const users = await userRes.json();
    const userId = users?.[0]?.id;

    if (!userId) {
      return NextResponse.json({ orders: [] });
    }

    const ordersRes = await fetch(
      `${supabaseUrl}/rest/v1/orders?user_id=eq.${userId}&order=created_at.desc&select=*`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    const orders = await ordersRes.json();
    return NextResponse.json({ orders: orders || [] });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let orderId: string;
    let method: string;
    let totalStr: string;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      orderId = formData.get('orderId') as string;
      method = formData.get('method') as string;
      totalStr = formData.get('total') as string;
      const file = formData.get('file') as File | null;

      if (file) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (supabaseUrl && supabaseKey) {
          const fileName = `${orderId}/${Date.now()}-${file.name}`;
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          await fetch(
            `${supabaseUrl}/storage/v1/object/pop-uploads/${fileName}`,
            {
              method: 'POST',
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                'Content-Type': file.type,
              },
              body: buffer,
            }
          );
        }
      }
    } else {
      const body = await request.json();
      orderId = body.orderId;
      method = body.method;
      totalStr = body.total;
    }

    const total = parseFloat(totalStr) || 0;
    const vatUsd = total * 0.15 / 1.15;
    const subtotalUsd = total - vatUsd;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const session = await getServerSession(authOptions);
      let userId = null;

      if (session?.user?.email) {
        const userRes = await fetch(
          `${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(session.user.email)}&select=id`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );
        const users = await userRes.json();
        userId = users?.[0]?.id || null;
      }

      await fetch(`${supabaseUrl}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          id: orderId,
          user_id: userId,
          status: 'pending_verification',
          payment_method: method,
          subtotal_usd: subtotalUsd,
          vat_usd: vatUsd,
          total_usd: total,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      orderId,
      status: 'pending_verification',
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
