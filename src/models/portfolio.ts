export type ProjectCategory =
  | 'Todos'
  | 'Fullstack'
  | 'Web'
  | 'Mobile'
  | 'UX/UI'
  | 'Ferramentas'

export interface ApiProject {
  Id: string
  title: string
  category: Exclude<ProjectCategory, 'Todos'> | string
  description: string
  tech: string[]
  image: string
  url: string | null
  github: string | null
}

export interface ApiExperience {
  Id: string
  order?: number
  company: string
  role: string
  period: string
  description: string
}

export interface PortfolioApiResponse {
  projects: ApiProject[]
  experiences: ApiExperience[]
}

export interface Project {
  id: number
  title: string
  category: Exclude<ProjectCategory, 'Todos'> | string
  description: string
  tech: string[]
  image: string
  url: string | null
  github: string | null
}

export interface Experience {
  id: number
  order: number
  company: string
  role: string
  period: string
  description: string
}

export interface PortfolioData {
  projects: Project[]
  experiences: Experience[]
}

