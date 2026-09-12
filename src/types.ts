export type Profile = {
  id: string
  name: string
  headline: string
  bio: string
  strengths: string[]
  portrait_url: string
  available: boolean
  email: string
  phone: string
  social: Record<string, string>
}

export type Project = {
  id: string
  tag: string
  title: string
  description: string
  url?: string | null
  sort_order: number
}

export type Post = {
  id: string
  tag: string
  title: string
  excerpt: string
  content?: string | null
  slug: string
  published_at: string
}

export type TravelPlace = {
  id: string
  title: string
  visited_on: string
  description: string
  latitude: number
  longitude: number
}

export type Contact = {
  id: string
  label: string
  value: string
  href: string
  icon: string
  sort_order: number
}
