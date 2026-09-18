'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loadAIData, loadTemplate } from '@/lib/store'
import { AIEnhancedCV, CVTemplate } from '@/types'
import CVPreview from '@/components/cv/CVPreview'

function Spinner({ dark = false }: { dark?: boolean }) {
  return <span className={`inline-block h-5 w-5 rounded-full border-2 ${dark ? 'border-slate-200 border-t-emerald-800' : 'border-white/30 border-t-white'} animate-spin`} />
}

function DownloadContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')
  const [verified, setVerified] = useState(false)
  const [checking, setChecking] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [error, setError] = useState('')
  const [aiData, setAiData] = useState<AIEnhancedCV | null>(null)
  const [template, setTemplate] = useState<CVTemplate>('classic')

  useEffect(() => {
    let cancelled = false

    Promise.resolve().then(() => {
      if (cancelled) return
      const data = loadAIData()
      const tpl = loadTemplate()
      setAiData(data)
      setTemplate(tpl)

      if (!ref) {
        setChecking(false)
        return
      }

      fetch(`/api/payment/verify?ref=${ref}`)
        .then((response) => response.json())
        .then((result) => { if (result.verified) setVerified(true) })
        .catch(() => setVerified(false))
        .finally(() => setChecking(false))
    })

    return () => { cancelled = true }
  }, [ref])

  const handleDownload = async () => {
    if (!aiData) return
    setDownloading(true)
    setError('')

    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData: aiData, template }),
      })

      if (!res.ok) throw new Error('PDF generation failed')

      const blob = await res.blob()
      if (!blob.size || !blob.type.includes('pdf')) {
        throw new Error('Invalid PDF response')
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ProCV-${aiData.name.replace(/\s+/g, '-')}.pdf`
      a.target = '_blank'
      a.rel = 'noopener'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()

      window.setTimeout(() => {
        a.remove()
        URL.revokeObjectURL(url)
      }, 10_000)
      setDownloaded(true)
    } catch {
      setError('Could not generate PDF. Try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faf8] px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Spinner dark />
          <p className="mt-4 text-sm font-bold text-slate-500">Verifying payment...</p>
        </div>
      </main>
    )
  }

  if (!verified) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faf8] px-4 py-12">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 8v5M12 16.5v.1M10.3 4.3 2.8 18a1.7 1.7 0 0 0 1.5 2.5h15.4a1.7 1.7 0 0 0 1.5-2.5L13.7 4.3a1.9 1.9 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-slate-950">Payment not verified</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">We could not confirm your payment. If you were charged, contact support with your payment reference.</p>
          <Link href="/pay" className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-900 px-5 text-sm font-black text-white hover:bg-emerald-950">
            Try again
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8faf8] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="ProCV home">
                <span className="text-lg font-black tracking-tight"><span className="text-emerald-800">Pro</span>CV</span>
            </Link>
            <p className="mt-3 text-sm font-bold text-emerald-900">Payment confirmed. Your CV is ready.</p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading || !aiData}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-950 disabled:opacity-60"
          >
            {downloading ? <Spinner /> : null}
            {downloading ? 'Generating PDF...' : downloaded ? 'Download again' : 'Download PDF'}
          </button>
        </header>

        {error && (
          <p className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-bold text-rose-700">
            {error}
          </p>
        )}

        {aiData ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
            <CVPreview data={aiData} template={template} />
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-black text-slate-950">No CV data found</h2>
            <p className="mt-2 text-sm text-slate-600">Build a CV again to generate a fresh PDF.</p>
            <Link href="/build" className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-900 px-5 text-sm font-black text-white hover:bg-emerald-950">
              Build another CV
            </Link>
          </div>
        )}

        <div className="mt-5 flex justify-center">
          <Link href="/build" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 hover:bg-slate-50">
            Build another CV
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#f8faf8] text-sm font-bold text-slate-500">Loading...</main>}>
      <DownloadContent />
    </Suspense>
  )
}


