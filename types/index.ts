export interface Experience {
  id: string
  role: string
  company: string
  start: string
  end: string
  desc: string
  bullets?: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  year: string
  grade: string
}

export interface SocialLink {
  platform: string
  url: string
  category: string
}

export interface CVData {
  // Personal
  name: string
  title: string
  email: string
  phone: string
  location: string
  photo: string | null
  // Social links
  socialLinks: SocialLink[]
  // Summary
  summary: string
  // Experience & Education
  experiences: Experience[]
  education: Education[]
  // Skills
  skills: string[]
  certs: string
}

export interface AIEnhancedCV extends CVData {
  aiSummary: string
  aiExperiences: Experience[]
}

export type CVTemplate = 'classic' | 'modern' | 'minimal'

export interface PaymentRecord {
  id: string
  email: string
  amount: number
  reference: string
  status: 'pending' | 'success' | 'failed'
  createdAt: string
}
