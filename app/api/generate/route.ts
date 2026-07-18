import { NextRequest, NextResponse } from 'next/server'
import { enhanceCV } from '@/lib/ai'
import { CVData } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const data: CVData = await req.json()

    if (!data.name || !data.experiences) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const enhanced = await enhanceCV(data)
    return NextResponse.json(enhanced)
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json({ error: 'Failed to generate CV' }, { status: 500 })
  }
}
