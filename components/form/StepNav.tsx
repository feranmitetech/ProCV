'use client'

const STEPS = [
  { label: 'Personal', short: 'Info' },
  { label: 'Experience', short: 'Work' },
  { label: 'Education', short: 'Edu' },
  { label: 'Skills', short: 'Skills' },
  { label: 'Preview', short: 'Preview' },
]

interface StepNavProps {
  current: number
  onChange: (step: number) => void
}

export default function StepNav({ current, onChange }: StepNavProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-5">
        {STEPS.map((step, i) => {
          const isActive = i === current
          const isDone = i < current

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => isDone && onChange(i)}
              disabled={!isDone && !isActive}
              className={`group flex min-h-16 flex-col items-center justify-center gap-1 border-r border-slate-200 px-1.5 py-2 text-center text-[10px] font-bold transition last:border-r-0 sm:text-xs
                ${isActive ? 'bg-emerald-900 text-white' : ''}
                ${isDone ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100' : ''}
                ${!isDone && !isActive ? 'bg-white text-slate-400' : ''}
              `}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black sm:h-7 sm:w-7 ${
                isActive ? 'bg-white text-emerald-900' : isDone ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {isDone ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13.3 4.3 6.4 11.2 2.7 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : String(i + 1).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.short}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
