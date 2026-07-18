'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CVData, Experience, Education, AIEnhancedCV, CVTemplate, SocialLink } from '@/types'
import { saveCVData, saveAIData, saveTemplate } from '@/lib/store'
import StepNav from '@/components/form/StepNav'
import CVPreview from '@/components/cv/CVPreview'
import PhotoUpload from '@/components/form/PhotoUpload'
import OnlinePresence from '@/components/form/OnlinePresence'

const emptyExp = (): Experience => ({
  id: crypto.randomUUID(),
  role: '',
  company: '',
  start: '',
  end: '',
  desc: '',
})

const emptyEdu = (): Education => ({
  id: crypto.randomUUID(),
  school: '',
  degree: '',
  year: '',
  grade: '',
})

const fieldClass = 'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
const labelClass = 'mb-1.5 block text-sm font-black text-slate-800'
const secondaryButtonClass = 'inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950'
const primaryButtonClass = 'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 text-sm font-black text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-950 disabled:opacity-60'

const stepMeta = [
  ['Personal details', 'Start with contact information and a concise summary.'],
  ['Work experience', 'Add the roles you want ProCV to rewrite into stronger bullets.'],
  ['Education', 'Add schools, qualifications, years, and grades where relevant.'],
  ['Skills', 'List practical skills and certifications recruiters should notice.'],
  ['Review CV', 'Choose the template and confirm the AI-enhanced version.'],
] as const

const templates: { key: CVTemplate; name: string; desc: string }[] = [
  { key: 'classic', name: 'Classic', desc: 'Corporate blue' },
  { key: 'modern', name: 'Modern', desc: 'Teal tech' },
  { key: 'minimal', name: 'Minimal', desc: 'ATS-friendly' },
]

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8h8.2M8.5 4.8 11.7 8l-3.2 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12.5 8H4.3M7.5 4.8 4.3 8l3.2 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function Spinner() {
  return <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
}

function SectionCard({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        {eyebrow && <p className="text-xs font-black uppercase tracking-widest text-emerald-800">{eyebrow}</p>}
        <h2 className="mt-1 text-lg font-black tracking-tight text-slate-950">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function NavActions({ back, next, nextLabel, loading }: { back?: () => void; next?: () => void; nextLabel: string; loading?: boolean }) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {back ? (
        <button type="button" onClick={back} className={secondaryButtonClass}>
          <ArrowLeftIcon />
          <span className="ml-2">Back</span>
        </button>
      ) : <span />}
      {next && (
        <button type="button" onClick={next} disabled={loading} className={`${primaryButtonClass} w-full sm:w-auto`}>
          {loading ? <Spinner /> : null}
          {nextLabel}
          {!loading ? <ArrowRightIcon /> : null}
        </button>
      )}
    </div>
  )
}

export default function BuildPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [template, setTemplate] = useState<CVTemplate>('classic')
  const [aiData, setAiData] = useState<AIEnhancedCV | null>(null)
  const [skillInput, setSkillInput] = useState('')

  const [personal, setPersonal] = useState({
    name: '', title: '', email: '', phone: '', location: '', summary: '',
  })
  const [photo, setPhoto] = useState<string | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([emptyExp()])
  const [education, setEducation] = useState<Education[]>([emptyEdu()])
  const [skills, setSkills] = useState<string[]>([])
  const [certs, setCerts] = useState('')

  const updateExp = (id: string, field: keyof Experience, value: string) =>
    setExperiences((items) => items.map((item) => item.id === id ? { ...item, [field]: value } : item))
  const addExp = () => setExperiences((items) => [...items, emptyExp()])
  const removeExp = (id: string) => setExperiences((items) => items.filter((item) => item.id !== id))

  const updateEdu = (id: string, field: keyof Education, value: string) =>
    setEducation((items) => items.map((item) => item.id === id ? { ...item, [field]: value } : item))
  const addEdu = () => setEducation((items) => [...items, emptyEdu()])
  const removeEdu = (id: string) => setEducation((items) => items.filter((item) => item.id !== id))

  const addSkill = () => {
    const skill = skillInput.trim()
    if (!skill || skills.some((item) => item.toLowerCase() === skill.toLowerCase())) return
    setSkills((items) => [...items, skill])
    setSkillInput('')
  }
  const removeSkill = (index: number) => setSkills((items) => items.filter((_, itemIndex) => itemIndex !== index))

  const collectData = (): CVData => ({
    ...personal,
    photo,
    socialLinks,
    experiences,
    education,
    skills,
    certs,
  })

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    const data = collectData()
    saveCVData(data)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()
      const enhanced: AIEnhancedCV = await res.json()
      saveAIData(enhanced)
      saveTemplate(template)
      setAiData(enhanced)
      setStep(4)
    } catch {
      setError('Something went wrong while writing your CV. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const heading = stepMeta[step]

  return (
    <main className="min-h-screen bg-[#f8faf8] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="ProCV home">
            <span className="text-lg font-black tracking-tight"><span className="text-emerald-800">Pro</span>CV</span>
          </Link>
          <div className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-900 sm:block">
            Draft first, pay after preview
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8 lg:py-8">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-800">CV builder</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Build your professional CV</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Complete each step, let AI sharpen the writing, then choose a template before payment.</p>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-50 px-2 py-3">
                <div className="text-base font-black text-slate-950">5</div>
                <div className="text-[11px] font-semibold text-slate-500">Steps</div>
              </div>
              <div className="rounded-xl bg-slate-50 px-2 py-3">
                <div className="text-base font-black text-slate-950">3</div>
                <div className="text-[11px] font-semibold text-slate-500">Templates</div>
              </div>
              <div className="rounded-xl bg-slate-50 px-2 py-3">
                <div className="text-base font-black text-slate-950">NGN</div>
                <div className="text-[11px] font-semibold text-slate-500">1,500</div>
              </div>
            </div>
          </div>
        </aside>

        <section>
          <StepNav current={step} onChange={setStep} />

          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-800">Step {step + 1} of 5</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{heading[0]}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{heading[1]}</p>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <SectionCard title="Profile photo" eyebrow="Optional">
                <PhotoUpload photo={photo} onChange={setPhoto} />
              </SectionCard>

              <SectionCard title="Personal information" eyebrow="Required details">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {([
                    ['Full name', 'name', 'Chukwuemeka Okafor'],
                    ['Job title / role', 'title', 'Senior Software Engineer'],
                    ['Email address', 'email', 'emeka@gmail.com'],
                    ['Phone number', 'phone', '+234 801 234 5678'],
                    ['Location', 'location', 'Lagos, Nigeria'],
                  ] as const).map(([label, key, placeholder]) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <input
                        className={fieldClass}
                        placeholder={placeholder}
                        value={personal[key]}
                        onChange={(e) => setPersonal((current) => ({ ...current, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Online presence" eyebrow="Links">
                <OnlinePresence links={socialLinks} onChange={setSocialLinks} />
              </SectionCard>

              <SectionCard title="Career summary" eyebrow="AI input">
                <label className={labelClass}>Current summary</label>
                <textarea
                  className={`${fieldClass} min-h-32 resize-none`}
                  placeholder="I am a software engineer with 5 years experience building fintech apps in Lagos. I love solving complex problems and have led teams of up to 8 people."
                  value={personal.summary}
                  onChange={(e) => setPersonal((current) => ({ ...current, summary: e.target.value }))}
                />
              </SectionCard>

              <NavActions next={() => setStep(1)} nextLabel="Next: Experience" />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <SectionCard title="Work experience" eyebrow="Roles">
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={exp.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-black text-slate-900">Role {index + 1}</h3>
                        {experiences.length > 1 && (
                          <button type="button" onClick={() => removeExp(exp.id)} className="text-xs font-black text-slate-400 hover:text-rose-600">
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {([
                          ['Job title', 'role', 'Software Engineer'],
                          ['Company / organisation', 'company', 'Access Bank'],
                          ['Start date', 'start', 'Jan 2021'],
                          ['End date', 'end', 'Dec 2023 or Present'],
                        ] as const).map(([label, field, placeholder]) => (
                          <div key={field}>
                            <label className={labelClass}>{label}</label>
                            <input className={fieldClass} placeholder={placeholder} value={exp[field]} onChange={(e) => updateExp(exp.id, field, e.target.value)} />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <label className={labelClass}>What did you do?</label>
                        <textarea
                          className={`${fieldClass} min-h-28 resize-none`}
                          placeholder="I built the mobile banking frontend, fixed bugs, worked with the backend team on APIs, and trained junior developers."
                          value={exp.desc}
                          onChange={(e) => updateExp(exp.id, 'desc', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addExp} className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-900 transition hover:bg-emerald-100">
                  <PlusIcon />
                  Add another role
                </button>
              </SectionCard>

              <NavActions back={() => setStep(0)} next={() => setStep(2)} nextLabel="Next: Education" />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <SectionCard title="Education" eyebrow="Qualifications">
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-black text-slate-900">Qualification {index + 1}</h3>
                        {education.length > 1 && (
                          <button type="button" onClick={() => removeEdu(edu.id)} className="text-xs font-black text-slate-400 hover:text-rose-600">
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {([
                          ['School / institution', 'school', 'University of Lagos'],
                          ['Degree / certificate', 'degree', 'B.Sc Computer Science'],
                          ['Year', 'year', '2018 - 2022'],
                          ['Grade / class', 'grade', 'Second Class Upper'],
                        ] as const).map(([label, field, placeholder]) => (
                          <div key={field}>
                            <label className={labelClass}>{label}</label>
                            <input className={fieldClass} placeholder={placeholder} value={edu[field]} onChange={(e) => updateEdu(edu.id, field, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addEdu} className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-900 transition hover:bg-emerald-100">
                  <PlusIcon />
                  Add qualification
                </button>
              </SectionCard>

              <NavActions back={() => setStep(1)} next={() => setStep(3)} nextLabel="Next: Skills" />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <SectionCard title="Skills and certifications" eyebrow="Strengths">
                <div>
                  <label className={labelClass}>Skills</label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      className={fieldClass}
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button type="button" onClick={addSkill} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-black text-emerald-900 transition hover:bg-emerald-100 sm:h-auto">
                      <PlusIcon />
                      Add
                    </button>
                  </div>

                  {skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span key={skill} className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-900">
                          {skill}
                          <button type="button" onClick={() => removeSkill(index)} className="text-emerald-600 hover:text-emerald-950" aria-label={`Remove ${skill}`}>x</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <label className={labelClass}>Certifications</label>
                  <textarea
                    className={`${fieldClass} min-h-28 resize-none`}
                    placeholder="AWS Certified Developer, Google Analytics, NYSC Certificate 2022, HubSpot Content Marketing"
                    value={certs}
                    onChange={(e) => setCerts(e.target.value)}
                  />
                </div>
              </SectionCard>

              {error && <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p>}
              <NavActions back={() => setStep(2)} next={handleGenerate} nextLabel={loading ? 'AI is writing...' : 'Generate CV with AI'} loading={loading} />
            </div>
          )}

          {step === 4 && aiData && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-900">
                AI has rewritten your summary and experience. Choose a template before payment.
              </div>

              <SectionCard title="Choose template" eyebrow="Style">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {templates.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setTemplate(item.key)}
                      className={`rounded-2xl border p-4 text-left transition ${template === item.key ? 'border-emerald-700 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-300'}`}
                    >
                      <div className="text-sm font-black text-slate-950">{item.name}</div>
                      <div className="mt-1 text-xs font-semibold text-slate-500">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Preview" eyebrow="Final check">
                <div className="overflow-x-auto pb-1">
                  <div className="min-w-[320px]">
                    <CVPreview data={aiData} template={template} />
                  </div>
                </div>
              </SectionCard>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => setStep(3)} className={secondaryButtonClass}>
                  <ArrowLeftIcon />
                  <span className="ml-2">Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => { saveTemplate(template); router.push('/pay') }}
                  className={`${primaryButtonClass} w-full sm:w-auto`}
                >
                  Pay and download
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}



