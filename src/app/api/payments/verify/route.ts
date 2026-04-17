import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyTransaction } from '@/lib/paystack';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');
    if (!reference) return NextResponse.redirect(new URL('/student/payments?error=missing_reference', request.url));

    const result = await verifyTransaction(reference);
    const supabase = await createClient();

    if (result.status && (result.data as Record<string, unknown>)?.status === 'success') {
      const data = result.data as Record<string, unknown>;
      // Update payment status
      await supabase.from('payments').update({
        status: 'successful',
        payment_channel: (data.channel as string) || 'card',
        paystack_reference: (data.reference as string) || reference,
        paid_at: new Date().toISOString(),
      }).eq('reference', reference);

      // Get payment to create enrollment if course payment
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

      return NextResponse.redirect(new URL(`/student/payments?success=true&reference=${reference}`, request.url));
    } else {
      await supabase.from('payments').update({ status: 'failed' }).eq('reference', reference);
      return NextResponse.redirect(new URL(`/student/payments?error=payment_failed&reference=${reference}`, request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/student/payments?error=verification_failed', request.url));
  }
}
