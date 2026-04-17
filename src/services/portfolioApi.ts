import type {
  ApiExperience,
  ApiProject,
  Experience,
  PortfolioApiResponse,
  PortfolioData,
  Project,
} from '../models/portfolio'

function toNumberId(id: string) {
  const n = Number(id)
  return Number.isFinite(n) ? n : 0
}

function mapProject(p: ApiProject): Project {
  return {
    id: toNumberId(p.Id),
    title: p.title,
    category: p.category,
    description: p.description,
    tech: p.tech ?? [],
    image: p.image,
    url: p.url ?? null,
    github: p.github ?? null,
  }
}

function mapExperience(e: ApiExperience): Experience {
  return {
    id: toNumberId(e.Id),
    order: e.order ?? toNumberId(e.Id),
    company: e.company,
    role: e.role,
    period: e.period,
    description: e.description,
  }
}

export async function fetchPortfolioData(signal?: AbortSignal): Promise<PortfolioData> {
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined
  if (!baseUrl) throw new Error('Missing VITE_API_URL')

  const res = await fetch(baseUrl, { signal })
  if (!res.ok) throw new Error(`API error (${res.status})`)

  const json = (await res.json()) as PortfolioApiResponse

  return {
    projects: (json.projects ?? []).map(mapProject),
    experiences: (json.experiences ?? [])
      .map(mapExperience)
      .sort((a, b) => a.order - b.order),
  }
}

