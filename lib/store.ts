import { CVData, AIEnhancedCV, CVTemplate } from '@/types'

const STORAGE_KEY = 'procv_data'
const AI_KEY = 'procv_ai'
const TEMPLATE_KEY = 'procv_template'

export function saveCVData(data: CVData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadCVData(): CVData | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as CVData
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function saveAIData(data: AIEnhancedCV) {
  if (typeof window === 'undefined') return
  localStorage.setItem(AI_KEY, JSON.stringify(data))
}

export function loadAIData(): AIEnhancedCV | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(AI_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AIEnhancedCV
  } catch {
    localStorage.removeItem(AI_KEY)
    return null
  }
}

export function saveTemplate(t: CVTemplate) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TEMPLATE_KEY, t)
}

export function loadTemplate(): CVTemplate {
  if (typeof window === 'undefined') return 'classic'
  const value = localStorage.getItem(TEMPLATE_KEY)
  return value === 'modern' || value === 'minimal' || value === 'classic' ? value : 'classic'
}

export function clearAll() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(AI_KEY)
  localStorage.removeItem(TEMPLATE_KEY)
}
