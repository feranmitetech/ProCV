import { NextRequest, NextResponse } from 'next/server'
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer'
import { AIEnhancedCV, CVTemplate } from '@/types'

const colors = {
  classic: { header: '#12385f', accent: '#12385f', headerText: '#ffffff', mutedHeader: '#dbeafe', chipBg: '#eff6ff', chipText: '#1e3a8a' },
  modern: { header: '#0f766e', accent: '#0f766e', headerText: '#ffffff', mutedHeader: '#ccfbf1', chipBg: '#f0fdfa', chipText: '#115e59' },
  minimal: { header: '#ffffff', accent: '#0f172a', headerText: '#0f172a', mutedHeader: '#64748b', chipBg: '#f8fafc', chipText: '#334155' },
} satisfies Record<CVTemplate, { header: string; accent: string; headerText: string; mutedHeader: string; chipBg: string; chipText: string }>

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#111827',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.45,
  },
  header: {
    paddingHorizontal: 32,
    paddingVertical: 26,
  },
  minimalHeader: {
    borderBottomWidth: 3,
    borderBottomColor: '#0f172a',
    borderBottomStyle: 'solid',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
  },
  contacts: {
    marginTop: 6,
    fontSize: 9,
    lineHeight: 1.4,
  },
  body: {
    paddingHorizontal: 32,
    paddingVertical: 22,
  },
  section: {
    marginBottom: 13,
  },
  sectionTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    letterSpacing: 1.2,
    marginBottom: 7,
    paddingBottom: 3,
    textTransform: 'uppercase',
  },
  paragraph: {
    color: '#374151',
    fontSize: 10.5,
    lineHeight: 1.6,
  },
  item: {
    marginBottom: 9,
  },
  itemTitle: {
    color: '#111827',
    fontFamily: 'Helvetica-Bold',
    fontSize: 11.5,
  },
  itemMeta: {
    color: '#6b7280',
    fontSize: 10,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  bulletDot: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    width: 8,
  },
  bulletText: {
    color: '#374151',
    flex: 1,
    fontSize: 10,
    lineHeight: 1.45,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  chip: {
    borderRadius: 10,
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
})

function cleanFilename(name: string) {
  const fallback = name.trim() || 'CV'
  return fallback.replace(/[^a-z0-9-]+/gi, '-').replace(/^-+|-+$/g, '') || 'CV'
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: accent }]}>{title}</Text>
      {children}
    </View>
  )
}

function CVDocument({ data, template }: { data: AIEnhancedCV; template: CVTemplate }) {
  const theme = colors[template]
  const links = (data.socialLinks || []).filter((link) => link.url).slice(0, 3).map((link) => link.url)
  const contacts = [data.email, data.phone, data.location, ...links].filter(Boolean).join(' | ')

  return (
    <Document title={`${data.name || 'ProCV'} CV`} author="ProCV" creator="ProCV">
      <Page size="A4" style={styles.page}>
        <View style={[
          styles.header,
          { backgroundColor: theme.header, color: theme.headerText },
          template === 'minimal' ? styles.minimalHeader : {},
        ]}>
          <Text style={styles.name}>{data.name || 'Your Name'}</Text>
          <Text style={[styles.title, { color: template === 'minimal' ? '#334155' : theme.mutedHeader }]}>{data.title || 'Professional Title'}</Text>
          {contacts ? <Text style={[styles.contacts, { color: template === 'minimal' ? '#64748b' : theme.mutedHeader }]}>{contacts}</Text> : null}
        </View>

        <View style={styles.body}>
          {data.aiSummary ? (
            <Section title="Profile" accent={theme.accent}>
              <Text style={styles.paragraph}>{data.aiSummary}</Text>
            </Section>
          ) : null}

          {data.aiExperiences?.length ? (
            <Section title="Experience" accent={theme.accent}>
              {data.aiExperiences.map((exp) => (
                <View key={exp.id} style={styles.item} wrap={false}>
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemMeta}>{[exp.company, exp.start && exp.end ? `${exp.start} - ${exp.end}` : exp.start || exp.end].filter(Boolean).join(' | ')}</Text>
                  {(exp.bullets || []).map((bullet, index) => (
                    <View key={`${exp.id}-${index}`} style={styles.bulletRow}>
                      <Text style={[styles.bulletDot, { color: theme.accent }]}>-</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </Section>
          ) : null}

          {data.education?.length ? (
            <Section title="Education" accent={theme.accent}>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.item} wrap={false}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemMeta}>{[edu.school, edu.year, edu.grade].filter(Boolean).join(' | ')}</Text>
                </View>
              ))}
            </Section>
          ) : null}

          {data.skills?.length ? (
            <Section title="Skills" accent={theme.accent}>
              <View style={styles.chips}>
                {data.skills.map((skill) => (
                  <Text key={skill} style={[styles.chip, { backgroundColor: theme.chipBg, color: theme.chipText }]}>{skill}</Text>
                ))}
              </View>
            </Section>
          ) : null}

          {data.certs ? (
            <Section title="Certifications" accent={theme.accent}>
              <Text style={styles.paragraph}>{data.certs}</Text>
            </Section>
          ) : null}
        </View>
      </Page>
    </Document>
  )
}

export const maxDuration = 30
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { cvData, template } = await req.json() as { cvData: AIEnhancedCV; template: CVTemplate }
  const document = <CVDocument data={cvData} template={template} />

  try {
    const pdfBuffer = await renderToBuffer(document)

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ProCV-${cleanFilename(cvData.name)}.pdf"`,
      },
    })
  } catch (err) {
    console.error('PDF error:', err)
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 })
  }
}

