import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY || '').update(body).digest('hex');
    const signature = request.headers.get('x-paystack-signature');

    if (hash !== signature) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

    const event = JSON.parse(body);
    const supabase = await createAdminClient();

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;

      await supabase.from('payments').update({
        status: 'successful',
        payment_channel: data.channel || 'card',
        paystack_reference: data.reference,
        paid_at: new Date().toISOString(),
      }).eq('reference', reference);

      // Auto-enroll for course payments
      const { data: payment } = await supabase.from('payments').select('*').eq('reference', reference).single();
      if (payment?.course_id && payment?.user_id) {
        const { data: existing } = await supabase.from('enrollments').select('id').eq('user_id', payment.user_id).eq('course_id', payment.course_id).single();
        if (!existing) {
          await supabase.from('enrollments').insert({
            user_id: payment.user_id,
            course_id: payment.course_id,
            payment_id: payment.id,
            status: 'active',
            progress_percentage: 0,
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
