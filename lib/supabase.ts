import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase env vars missing')
    _client = createClient(url, key)
  }
  return _client
}

export async function logPayment({
  reference, email, amount, status,
}: {
  reference: string; email: string; amount: number; status: 'pending' | 'success' | 'failed'
}) {
  try {
    const { error } = await getClient().from('payments').upsert(
      { reference, email, amount, status, created_at: new Date().toISOString() },
      { onConflict: 'reference' }
    )
    if (error) console.error('Supabase log error:', error)
  } catch (e) {
    console.error('Supabase unavailable:', e)
  }
}

export async function markPaymentSuccess(reference: string, email: string, amount: number) {
  try {
    const { error } = await getClient().from('payments').upsert(
      { reference, email, amount, status: 'success', paid_at: new Date().toISOString() },
      { onConflict: 'reference' }
    )
    if (error) console.error('Supabase update error:', error)
  } catch (e) {
    console.error('Supabase unavailable:', e)
  }
}

export async function getPayment(reference: string) {
  try {
    const { data, error } = await getClient()
      .from('payments').select('*').eq('reference', reference).single()
    if (error) return null
    return data
  } catch {
    return null
  }
}
