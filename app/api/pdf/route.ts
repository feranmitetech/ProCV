/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server'
import { AIEnhancedCV, CVTemplate } from '@/types'

function buildCVHtml(data: AIEnhancedCV, template: CVTemplate): string {
  const topLinks = (data.socialLinks || []).filter((l: {url: string}) => l.url).slice(0, 3).map((l: {url: string}) => l.url)
  const contacts = [data.email, data.phone, data.location, ...topLinks]
    .filter(Boolean).join(' &nbsp;|&nbsp; ')

  const NAVY = '#1E3A5F'
  const BLUE = '#185FA5'
  const GREEN = '#1B6B2F'
  const headerBg = template === 'classic' ? NAVY : template === 'modern' ? BLUE : '#ffffff'
  const headerColor = template === 'minimal' ? NAVY : '#ffffff'
  const headerBorder = template === 'minimal' ? `border-bottom:3px solid ${NAVY};` : ''
  const accent = template === 'minimal' ? NAVY : GREEN

  const section = (t: string) =>
    `<div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${accent};border-bottom:1px solid #e5e7eb;padding-bottom:3px;margin:14px 0 8px">${t}</div>`

  const expHtml = (data.aiExperiences || []).map(e => `
    <div style="margin-bottom:12px">
      <div style="font-weight:600;font-size:12px;color:#111">${e.role}</div>
      <div style="font-size:11px;color:#666;margin-bottom:4px">${e.company} | ${e.start} - ${e.end}</div>
      ${(e.bullets || []).map(b => `
        <div style="display:flex;gap:6px;margin-bottom:3px">
          <span style="color:${accent};font-size:10px">&bull;</span>
          <span style="font-size:11px;color:#333;line-height:1.5">${b}</span>
        </div>`).join('')}
    </div>`).join('')

  const eduHtml = (data.education || []).map(e => `
    <div style="margin-bottom:8px">
      <div style="font-weight:600;font-size:12px;color:#111">${e.degree}</div>
      <div style="font-size:11px;color:#666">${e.school} | ${e.year}${e.grade ? ` | ${e.grade}` : ''}</div>
    </div>`).join('')

  const skillsHtml = (data.skills || []).map(s =>
    `<span style="background:#EAF5EC;color:${GREEN};font-size:10px;padding:2px 10px;border-radius:10px;font-weight:500;margin:2px">${s}</span>`
  ).join('')

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial,Helvetica,sans-serif}@page{margin:0;size:A4}</style>
</head><body><div style="width:210mm;min-height:297mm;background:#fff">
  <div style="background:${headerBg};color:${headerColor};padding:28px 32px;${headerBorder}">
    <div style="font-size:22px;font-weight:700">${data.name}</div>
    <div style="font-size:13px;opacity:0.85;margin-top:3px">${data.title}</div>
    <div style="font-size:10px;opacity:0.75;margin-top:5px">${contacts}</div>
  </div>
  <div style="padding:20px 32px 32px">
    ${data.aiSummary ? `${section('Profile')}<p style="font-size:11px;color:#444;line-height:1.65">${data.aiSummary}</p>` : ''}
    ${expHtml ? `${section('Experience')}${expHtml}` : ''}
    ${eduHtml ? `${section('Education')}${eduHtml}` : ''}
    ${skillsHtml ? `${section('Skills')}<div style="display:flex;flex-wrap:wrap;gap:4px">${skillsHtml}</div>` : ''}
    ${data.certs ? `${section('Certifications')}<p style="font-size:11px;color:#444">${data.certs}</p>` : ''}
  </div>
</div></body></html>`
}

export const maxDuration = 30
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { cvData, template } = await req.json() as { cvData: AIEnhancedCV; template: CVTemplate }
    const html = buildCVHtml(cvData, template)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let browser: any
    try {
      const chromium = require('@sparticuz/chromium')
      const puppeteer = require('puppeteer-core')
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
      })
    } catch {
      const puppeteer = require('puppeteer')
      browser = await puppeteer.launch({ headless: true })
    }

    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } })
    await browser.close()

    return new NextResponse(new Uint8Array(pdf as Buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ProCV-${cvData.name.replace(/\s+/g, '-')}.pdf"`,
      },
    })
  } catch (err) {
    console.error('PDF error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}

