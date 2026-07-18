import Link from 'next/link'

const features = [
  'AI rewrites plain notes into concise, achievement-led bullet points',
  'Creates a focused career summary recruiters can scan quickly',
  'Includes Classic, Modern, and Minimal CV layouts',
  'Exports a clean PDF you can send anywhere',
]

const steps = [
  {
    number: '01',
    title: 'Add your details',
    description: 'Write your experience in everyday language. Keep it rough; ProCV handles the polish.',
  },
  {
    number: '02',
    title: 'Review the AI draft',
    description: 'Get sharper bullets, a stronger summary, and formatting that feels ready for recruiters.',
  },
  {
    number: '03',
    title: 'Pay once, download',
    description: 'Choose a template, pay NGN 1,500 with Paystack, and keep your finished PDF forever.',
  },
]

const bullets = [
  'Engineered 3 payment APIs processing over NGN 2B monthly with 99.9% uptime',
  'Led 6 engineers to ship a wallet feature 2 weeks early, increasing retention by 34%',
  'Reduced API response time by 60% through Redis caching and PostgreSQL optimisation',
]

const skills = ['React.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Next.js']

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.3 4.3 6.4 11.2 2.7 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8h8.2M8.5 4.8 11.7 8l-3.2 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f8faf8] text-slate-950">
      <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="ProCV home">
            <span className="text-lg font-black tracking-tight"><span className="text-emerald-800">Pro</span>CV</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <a href="#how" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950">How it works</a>
            <a href="#sample" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950">Sample CV</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950">Pricing</a>
          </div>

          <Link href="/build" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-900 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2">
            Build CV
            <ArrowIcon />
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Built for Nigerian professionals
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Professional CV builder
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Turn rough work history into a recruiter-ready CV in minutes. ProCV sharpens your summary, rewrites your experience, and exports a polished PDF after one payment.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/build" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:-translate-y-0.5 hover:bg-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2">
                Build my CV - NGN 1,500
                <ArrowIcon />
              </Link>
              <a href="#sample" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-950">
                View sample
              </a>
            </div>

            <div className="mt-7 grid max-w-lg grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/80 text-center">
              <div className="px-3 py-4">
                <div className="text-lg font-black text-slate-950">2 min</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">Draft time</div>
              </div>
              <div className="px-3 py-4">
                <div className="text-lg font-black text-slate-950">3</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">Templates</div>
              </div>
              <div className="px-3 py-4">
                <div className="text-lg font-black text-slate-950">Once</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">No subscription</div>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-6">
            <div className="absolute -right-10 top-8 hidden h-48 w-48 rounded-full bg-amber-100/70 blur-3xl lg:block" />
            <div className="relative mx-auto max-w-md rounded-[1.75rem] border border-slate-200 bg-slate-100 p-3 shadow-2xl shadow-slate-900/10">
              <div className="rounded-[1.25rem] bg-white p-5 shadow-sm">
                <div className="rounded-xl bg-emerald-900 px-5 py-5 text-white">
                  <div className="text-xl font-black">Chukwuemeka Okafor</div>
                  <div className="mt-1 text-sm font-medium text-emerald-50">Senior Software Engineer</div>
                  <div className="mt-3 text-xs leading-5 text-emerald-100/80">emeka@gmail.com | Lagos, Nigeria | linkedin.com/in/emeka</div>
                </div>

                <div className="mt-5 space-y-5 text-sm">
                  <section>
                    <h2 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Profile</h2>
                    <p className="mt-3 text-xs leading-6 text-slate-700">
                      Results-driven Software Engineer with 6+ years delivering scalable fintech and SaaS products across Nigeria.
                    </p>
                  </section>

                  <section>
                    <h2 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Experience</h2>
                    <div className="mt-3">
                      <div className="text-sm font-black text-slate-950">Senior Software Engineer</div>
                      <div className="mt-1 text-xs font-semibold text-slate-500">Flutterwave | Jan 2022 - Present</div>
                      <div className="mt-3 space-y-2">
                        {bullets.map((bullet) => (
                          <div key={bullet} className="flex gap-2 text-xs leading-5 text-slate-700">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Skills</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skills.slice(0, 6).map((skill) => (
                        <span key={skill} className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-900">{skill}</span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#eef7f1] py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-emerald-800">Why it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Stop underselling your experience.</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
              Most CVs hide strong work behind vague phrases. ProCV turns responsibilities into clear outcomes, metrics, and confident language.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex gap-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-900 text-white">
                  <CheckIcon />
                </span>
                <p className="text-sm font-semibold leading-6 text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-widest text-emerald-800">How it works</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">From blank page to polished PDF.</h2>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10">
              <div className="text-sm font-black text-amber-600">{step.number}</div>
              <h3 className="mt-4 text-lg font-black text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-slate-950 py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-emerald-300">Simple pricing</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">One payment. No monthly plan.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Pay once after your CV is ready, download your PDF, and reuse it whenever you need to apply.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-left shadow-xl shadow-black/20">
            <div className="text-sm font-bold text-slate-300">Full CV export</div>
            <div className="mt-2 text-4xl font-black">NGN 1,500</div>
            <Link href="/build" className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 text-sm font-black text-emerald-950 transition hover:bg-emerald-300">
              Start building
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="sample" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-emerald-800">Sample CV</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">A cleaner CV, written like your work matters.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">A realistic example using the Classic template.</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
          <div className="bg-emerald-900 px-5 py-6 text-white sm:px-8">
            <h3 className="text-xl font-black">Chukwuemeka Okafor</h3>
            <p className="mt-1 text-sm font-semibold text-emerald-50">Senior Software Engineer</p>
            <p className="mt-3 text-xs leading-6 text-emerald-100/80">emeka@gmail.com | +234 801 234 5678 | Lagos, Nigeria | github.com/emeka</p>
          </div>

          <div className="space-y-6 px-5 py-6 text-sm sm:px-8">
            <section>
              <h4 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Profile</h4>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Results-driven Software Engineer with 6+ years delivering scalable fintech and SaaS solutions across the Nigerian market. Proven record of leading cross-functional teams and shipping mobile applications used by thousands of active users.
              </p>
            </section>

            <section>
              <h4 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Experience</h4>
              <div className="mt-3">
                <div className="font-black text-slate-950">Senior Software Engineer</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">Flutterwave | Jan 2022 - Present</div>
                <div className="mt-3 space-y-2">
                  {bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-2 text-sm leading-6 text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-700" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h4 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Education</h4>
              <div className="mt-3 font-black text-slate-950">B.Sc Computer Science</div>
              <div className="mt-1 text-sm text-slate-600">University of Lagos | 2015 - 2019 | Second Class Upper</div>
            </section>

            <section>
              <h4 className="border-b border-slate-200 pb-2 text-[11px] font-black uppercase tracking-widest text-emerald-800">Skills</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-900">{skill}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-14 text-center sm:px-6 sm:py-16">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Ready to send a better CV?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">Build a polished PDF today and keep it ready for your next application.</p>
        <Link href="/build" className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-900 px-7 text-sm font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-950">
          Build my CV now
          <ArrowIcon />
        </Link>
      </section>

      <footer className="border-t border-emerald-800 bg-emerald-950 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="text-base font-black text-white"><span className="text-emerald-300">Pro</span>CV</span>
          <span className="text-xs font-semibold text-emerald-200/80">Built by Feranmite Technology | Lagos, Nigeria</span>
        </div>
      </footer>
    </main>
  )
}



