import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { verifyTransaction } from '@/lib/paystack'
import { markPaymentSuccess } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex')

    const signature = req.headers.get('x-paystack-signature')
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.event === 'charge.success') {
      const reference = event.data.reference
      const email = event.data.customer?.email
      const amount = event.data.amount

      const verification = await verifyTransaction(reference)
      if (verification.data?.status === 'success') {
        await markPaymentSuccess(reference, email, amount)
        console.log('Payment logged to Supabase:', reference)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 })
  }
}
