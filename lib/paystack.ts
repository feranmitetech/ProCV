const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!
const PAYSTACK_PUBLIC = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

export { PAYSTACK_PUBLIC }

export async function initializeTransaction(email: string, amountKobo: number, reference: string) {
  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amountKobo,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/download?ref=${reference}`,
      metadata: { cancel_action: `${process.env.NEXT_PUBLIC_APP_URL}/pay` },
    }),
  })
  return res.json()
}

export async function verifyTransaction(reference: string) {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  })
  return res.json()
}

export function generateReference(email: string) {
  return `procv_${email.split('@')[0]}_${Date.now()}`
}
