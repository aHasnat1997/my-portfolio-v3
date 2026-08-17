import type { APIRoute } from "astro"
import { supabase } from "@/db/supabase"
import type { ExperienceCard } from "@/constants/experience"

type ExperienceRow = {
  id: string
  label: string
  heading: string | null
  subheading: string | null
  bullet_label: string | null
  tag_label: string | null
  description: string | null
  mindset_label: string | null
  closing: string | null
  experience_company: {
    id: string
    name: string
    href: string | null
    date: string | null
    tracking_company: string | null
  }[]
  experience_bullets: { bullet: string; sort_order: number }[]
  experience_tags: { tag: string; sort_order: number }[]
  experience_mindset: { prefix: string; emphasis: string; sort_order: number }[]
}

const byOrder = (a: { sort_order: number }, b: { sort_order: number }) =>
  a.sort_order - b.sort_order

function shapeExperience(e: ExperienceRow): ExperienceCard {
  const co = e.experience_company[0]
  return {
    label: e.label,
    heading: e.heading ?? undefined,
    subheading: e.subheading ?? undefined,
    company: co
      ? {
          id: co.id,
          name: co.name,
          href: co.href ?? "",
          date: co.date ?? "",
          trackingCompany: co.tracking_company ?? "",
        }
      : undefined,
    bulletLabel: e.bullet_label ?? undefined,
    bullets: e.experience_bullets.sort(byOrder).map((r) => r.bullet),
    tagLabel: e.tag_label ?? undefined,
    tags: e.experience_tags.sort(byOrder).map((r) => r.tag),
    mindsetLabel: e.mindset_label ?? undefined,
    mindset: e.experience_mindset.sort(byOrder).map((r) => ({
      prefix: r.prefix,
      emphasis: r.emphasis,
    })),
    closing: e.closing ?? undefined,
    description: e.description ?? undefined,
  }
}

export const GET: APIRoute = async () => {
  const { data, error } = await supabase.from("experience").select(`
    *,
    experience_company(*),
    experience_bullets(*),
    experience_tags(*),
    experience_mindset(*)
  `)

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })

  const shaped: ExperienceCard[] = (data as ExperienceRow[]).map(
    shapeExperience
  )

  return new Response(JSON.stringify(shaped), {
    headers: { "Content-Type": "application/json" },
  })
}
