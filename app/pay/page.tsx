'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadAIData } from '@/lib/store'

const benefits = [
  'AI-enhanced career summary',
  'Professionally rewritten experience',
  'Your selected CV template',
  'PDF download you can keep forever',
]

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.3 4.3 6.4 11.2 2.7 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Spinner() {
  return <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
}

export default function PayPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasData, setHasData] = useState(false)

  useEffect(() => {
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return
      const data = loadAIData()
      if (data) {
        setHasData(true)
        setEmail(data.email || '')
      }
    })

    return () => { cancelled = true }
  }, [])

  const handlePay = async () => {
    if (!email.trim()) {
      setError('Enter your email to continue')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.authorizationUrl
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Payment failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!hasData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faf8] px-4 py-12">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 8v5M12 16.5v.1M10.3 4.3 2.8 18a1.7 1.7 0 0 0 1.5 2.5h15.4a1.7 1.7 0 0 0 1.5-2.5L13.7 4.3a1.9 1.9 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-slate-950">No CV data found</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Build and preview your CV before opening payment.</p>
          <Link href="/build" className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-900 px-5 text-sm font-black text-white hover:bg-emerald-950">
            Build your CV
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 py-10 text-slate-950 sm:py-14">
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[1fr_420px]">
        <section>
          <Link href="/" className="inline-flex items-center gap-2" aria-label="ProCV home">
            <span className="text-lg font-black tracking-tight"><span className="text-emerald-800">Pro</span>CV</span>
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-widest text-emerald-800">Secure checkout</p>
          <h1 className="mt-3 max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Download your polished CV.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">Pay once with Paystack, then download your finished PDF immediately. No subscription, no recurring billing.</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-900 text-white"><CheckIcon /></span>
                <span className="text-sm font-bold leading-6 text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <div className="text-sm font-bold text-slate-300">Full CV export</div>
            <div className="mt-2 text-4xl font-black">NGN 1,500</div>
            <div className="mt-2 text-xs font-semibold text-slate-400">One-time payment</div>
          </div>

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-black text-slate-800">Email for receipt</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}

          <button
            type="button"
            onClick={handlePay}
            disabled={loading}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-950 disabled:opacity-60"
          >
            {loading ? <Spinner /> : null}
            {loading ? 'Redirecting to Paystack...' : 'Pay with Paystack'}
          </button>

          <p className="mt-3 text-center text-xs font-semibold text-slate-400">Secured by Paystack | SSL encrypted</p>
          <Link href="/build" className="mt-5 flex h-11 items-center justify-center rounded-xl border border-slate-300 text-sm font-black text-slate-700 hover:bg-slate-50">
            Back to CV builder
          </Link>
        </section>
      </div>
    </main>
  )
}


