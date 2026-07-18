import { NextRequest, NextResponse } from 'next/server'
import { verifyTransaction } from '@/lib/paystack'
import { markPaymentSuccess } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get('ref')

  if (!ref) {
    return NextResponse.json({ verified: false, error: 'No reference provided' }, { status: 400 })
  }

  try {
    const result = await verifyTransaction(ref)

    if (result.data?.status === 'success') {
      const email = result.data.customer?.email
      const amount = result.data.amount

      // Log to Supabase on verify too (catches cases where webhook was missed)
      await markPaymentSuccess(ref, email, amount)

      return NextResponse.json({ verified: true, email, amount, reference: ref })
    }

    return NextResponse.json({ verified: false, status: result.data?.status })
  } catch (err) {
    console.error('Verify error:', err)
    return NextResponse.json({ verified: false, error: 'Verification failed' }, { status: 500 })
  }
}
