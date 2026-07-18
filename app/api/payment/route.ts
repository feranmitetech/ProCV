import { NextRequest, NextResponse } from 'next/server'
import { initializeTransaction, generateReference } from '@/lib/paystack'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const reference = generateReference(email)
    // ₦1,500 = 150000 kobo
    const result = await initializeTransaction(email, 150000, reference)

    if (!result.status) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    return NextResponse.json({
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    })
  } catch (err) {
    console.error('Payment error:', err)
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 })
  }
}
