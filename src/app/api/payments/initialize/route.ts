import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { initializeTransaction, generatePaymentReference } from '@/lib/paystack';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { course_id, amount, email, metadata } = await request.json();
    if (!amount || !email) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

    const reference = generatePaymentReference();
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/verify?reference=${reference}`;

    // Create payment record
    const { error: dbError } = await supabase.from('payments').insert({
      user_id: user.id,
      course_id: course_id || null,
      reference,
      amount,
      currency: 'GHS',
      payment_method: 'paystack',
      status: 'pending',
      metadata: metadata || {},
    });

    if (dbError) return NextResponse.json({ error: 'Failed to create payment record' }, { status: 500 });

    // Initialize Paystack transaction
    const result = await initializeTransaction({
      email,
      amount,
      reference,
      callback_url: callbackUrl,
      metadata: { user_id: user.id, course_id, ...metadata },
    });

    if (!result.status) return NextResponse.json({ error: result.message }, { status: 400 });

    return NextResponse.json({ authorization_url: (result.data as Record<string, unknown>)?.authorization_url, reference });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
