import Anthropic from '@anthropic-ai/sdk'
import { CVData, AIEnhancedCV } from '@/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function enhanceCV(data: CVData): Promise<AIEnhancedCV> {
  const expText = data.experiences
    .map(
      (e, i) =>
        `Experience ${i + 1}: ${e.role} at ${e.company} (${e.start} - ${e.end})\nDescription: ${e.desc}`
    )
    .join('\n\n')

  const prompt = `You are an expert Nigerian CV writer. Rewrite the following CV details to be professional, impactful, and suited to the Nigerian job market.

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "aiSummary": "3-sentence professional summary using confident, action-oriented language",
  "aiExperiences": [
    {
      "id": "same id as input",
      "role": "same as input",
      "company": "same as input", 
      "start": "same as input",
      "end": "same as input",
      "desc": "same as input",
      "bullets": ["bullet 1", "bullet 2", "bullet 3"]
    }
  ]
}

Rules:
- Each bullet point must start with a strong past-tense action verb (Engineered, Led, Increased, Delivered, Managed, Built, Streamlined, etc.)
- Include quantifiable results where possible (percentages, team sizes, time saved)
- Keep Nigerian context (mention NYSC if relevant, use NGN not USD, reference Nigerian companies/sectors where fitting)
- Summary should be 3 sentences: who they are, what they excel at, what value they bring
- Never use weak phrases like "responsible for" or "helped with"

Name: ${data.name}
Title: ${data.title}
Raw Summary: ${data.summary}
Skills: ${data.skills.join(', ')}

${expText}`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content
    .map((c) => (c.type === 'text' ? c.text : ''))
    .join('')
    .replace(/```json|```/g, '')
    .trim()

  const parsed = JSON.parse(text)

  return {
    ...data,
    aiSummary: parsed.aiSummary,
    aiExperiences: parsed.aiExperiences,
  }
}


