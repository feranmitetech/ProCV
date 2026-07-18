'use client'

import Image from 'next/image'
import { AIEnhancedCV, CVTemplate } from '@/types'

interface CVPreviewProps {
  data: AIEnhancedCV
  template: CVTemplate
}

const templateStyles = {
  classic: {
    header: 'bg-[#12385f] text-white',
    accent: '#12385f',
    chip: 'border-blue-100 bg-blue-50 text-blue-900',
  },
  modern: {
    header: 'bg-[#0f766e] text-white',
    accent: '#0f766e',
    chip: 'border-teal-100 bg-teal-50 text-teal-900',
  },
  minimal: {
    header: 'border-b-2 border-slate-900 bg-white text-slate-950',
    accent: '#0f172a',
    chip: 'border-slate-200 bg-slate-50 text-slate-800',
  },
} satisfies Record<CVTemplate, { header: string; accent: string; chip: string }>

export default function CVPreview({ data, template }: CVPreviewProps) {
  const topLinks = (data.socialLinks || []).filter((link) => link.url).slice(0, 4)
  const contacts = [data.email, data.phone, data.location, ...topLinks.map((link) => link.url)]
    .filter(Boolean)
    .join(' | ')
  const styles = templateStyles[template]
  const mutedHeaderText = template === 'minimal' ? 'text-slate-500' : 'text-white/80'

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-[11px] leading-relaxed text-slate-900 shadow-sm">
      <header className={`${styles.header} px-5 py-5 sm:px-6`}>
        <div className="flex items-start gap-4">
          {data.photo && (
            <Image
              src={data.photo}
              alt={data.name || 'Profile photo'}
              width={64}
              height={64}
              unoptimized
              className="h-16 w-16 flex-shrink-0 rounded-2xl border border-white/30 object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <h2 className="break-words text-xl font-black tracking-tight">{data.name || 'Your Name'}</h2>
            <p className={`mt-1 text-sm font-semibold ${mutedHeaderText}`}>{data.title || 'Professional Title'}</p>
            {contacts && <p className={`mt-2 break-words text-[10px] leading-5 ${mutedHeaderText}`}>{contacts}</p>}
          </div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        {data.aiSummary && (
          <Section title="Profile" accent={styles.accent}>
            <p className="text-slate-700">{data.aiSummary}</p>
          </Section>
        )}

        {data.aiExperiences?.length > 0 && (
          <Section title="Experience" accent={styles.accent}>
            <div className="space-y-3">
              {data.aiExperiences.map((exp) => (
                <div key={exp.id}>
                  <div className="font-black text-slate-950">{exp.role}</div>
                  <div className="text-slate-500">{[exp.company, exp.start && exp.end ? `${exp.start} - ${exp.end}` : exp.start || exp.end].filter(Boolean).join(' | ')}</div>
                  <ul className="mt-1.5 space-y-1">
                    {exp.bullets?.map((bullet, i) => (
                      <li key={`${exp.id}-${i}`} className="flex gap-2">
                        <span style={{ backgroundColor: styles.accent }} className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full" />
                        <span className="text-slate-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.education?.length > 0 && (
          <Section title="Education" accent={styles.accent}>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-black text-slate-950">{edu.degree}</div>
                  <div className="text-slate-500">{[edu.school, edu.year, edu.grade].filter(Boolean).join(' | ')}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.skills?.length > 0 && (
          <Section title="Skills" accent={styles.accent}>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span key={skill} className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${styles.chip}`}>
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {data.certs && (
          <Section title="Certifications" accent={styles.accent}>
            <p className="text-slate-700">{data.certs}</p>
          </Section>
        )}

        {data.socialLinks?.filter((link) => link.url).length > 0 && (
          <Section title="Online Presence" accent={styles.accent}>
            <div className="grid gap-1 sm:grid-cols-2">
              {data.socialLinks.filter((link) => link.url).map((link) => (
                <div key={link.platform} className="break-words text-[10px]">
                  <span className="font-black text-slate-700">{link.platform}:</span>{' '}
                  <span className="text-slate-500">{link.url}</span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </article>
  )
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <section>
      <h3 className="mb-2 border-b border-slate-200 pb-1 text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
        {title}
      </h3>
      {children}
    </section>
  )
}
