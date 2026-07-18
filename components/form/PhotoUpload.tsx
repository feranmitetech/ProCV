'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface Props {
  photo: string | null
  onChange: (photo: string | null) => void
}

export default function PhotoUpload({ photo, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be under 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => onChange(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      <div className="flex-shrink-0">
        {photo ? (
          <div className="relative h-24 w-24">
            <Image
              src={photo}
              alt="Profile"
              width={96}
              height={96}
              unoptimized
              className="h-24 w-24 rounded-2xl border border-emerald-200 object-cover shadow-sm"
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-sm font-black text-white shadow-sm hover:bg-rose-700"
              aria-label="Remove photo"
            >
              x
            </button>
          </div>
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      <div
        className={`min-h-24 flex-1 rounded-2xl border border-dashed p-4 text-center transition ${
          dragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white hover:border-emerald-400 hover:bg-emerald-50'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
      >
        <p className="mb-1 text-sm font-bold text-slate-800">
          {photo ? 'Change photo' : 'Upload profile photo'}
        </p>
        <p className="text-xs font-medium text-slate-500">Click or drag and drop | JPG, PNG | Max 2MB</p>
        <p className="mt-1 text-xs text-slate-400">Recommended: square professional headshot</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}


