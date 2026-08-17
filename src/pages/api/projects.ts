import type { APIRoute } from "astro"
import { supabase } from "@/db/supabase"
import type { Project } from "@/constants/projects"

type ProjectRow = {
  id: string
  tag: string
  title: string
  blurb: string | null
  description: string | null
  role: string | null
  scope: string | null
  focus: string | null
  overview: string | null
  vision: string | null
  audience: string | null
  outcome: string | null
  problem: string | null
  solution: string | null
  learning: string | null
  project_stack: { name: string; sort_order: number }[]
  project_features: { feature: string; sort_order: number }[]
  project_responsibilities: { responsibility: string; sort_order: number }[]
  project_contributions: { contribution: string; sort_order: number }[]
  project_tech_stack: { category: string; value: string }[]
  project_challenges: {
    title: string
    problem: string
    solution: string
    sort_order: number
  }[]
  project_impact: { title: string; description: string; sort_order: number }[]
  project_images: { src: string; caption: string | null; sort_order: number }[]
}

const byOrder = (a: { sort_order: number }, b: { sort_order: number }) =>
  a.sort_order - b.sort_order

function shapeProject(p: ProjectRow): Project {
  return {
    id: p.id,
    tag: p.tag,
    title: p.title,
    blurb: p.blurb ?? "",
    desc: p.description ?? "",
    stack: p.project_stack.sort(byOrder).map((r) => r.name),
    features: p.project_features.sort(byOrder).map((r) => r.feature),
    details: {
      role: p.role ?? "",
      scope: p.scope ?? "",
      focus: p.focus ?? "",
      overview: p.overview ?? "",
      vision: p.vision ?? "",
      audience: p.audience ?? "",
      outcome: p.outcome ?? "",
      problem: p.problem ?? "",
      solution: p.solution ?? "",
      learning: p.learning ?? "",
      responsibilities: p.project_responsibilities
        .sort(byOrder)
        .map((r) => r.responsibility),
      contributions: p.project_contributions
        .sort(byOrder)
        .map((r) => r.contribution),
      techStack: Object.fromEntries(
        p.project_tech_stack.map((r) => [r.category, r.value])
      ),
      challenges: p.project_challenges.sort(byOrder).map((r) => ({
        title: r.title,
        problem: r.problem,
        solution: r.solution,
      })),
      impact: p.project_impact.sort(byOrder).map((r) => ({
        title: r.title,
        desc: r.description,
      })),
      images: p.project_images.sort(byOrder).map((r) => ({
        src: r.src,
        caption: r.caption ?? "",
      })),
    },
  }
}

export const GET: APIRoute = async () => {
  const { data, error } = await supabase.from("projects").select(`
    *,
    project_stack(*),
    project_features(*),
    project_responsibilities(*),
    project_contributions(*),
    project_tech_stack(*),
    project_challenges(*),
    project_impact(*),
    project_images(*)
  `)

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })

  const shaped: Project[] = (data as ProjectRow[]).map(shapeProject)

  return new Response(JSON.stringify(shaped), {
    headers: { "Content-Type": "application/json" },
  })
}
