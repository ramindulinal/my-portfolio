import { supabase } from './supabase'
import { seedContacts, seedPosts, seedProfile, seedProjects, seedTravel } from '../data'
import type { Contact, Post, Profile, Project, TravelPlace } from '../types'
export async function loadPortfolio() {
  if (!supabase) return { profile: seedProfile, projects: seedProjects, posts: seedPosts, travel: seedTravel, contacts: seedContacts }
  const [profile, projects, posts, travel, contacts] = await Promise.all([supabase.from('profiles').select('*').single(), supabase.from('projects').select('*').order('sort_order'), supabase.from('posts').select('*').order('published_at', { ascending: false }), supabase.from('travel_places').select('*').order('visited_on'), supabase.from('contacts').select('*').order('sort_order')])
  return { profile: (profile.data || seedProfile) as Profile, projects: (projects.data || seedProjects) as Project[], posts: (posts.data || seedPosts) as Post[], travel: (travel.data || seedTravel) as TravelPlace[], contacts: (contacts.data || seedContacts) as Contact[] }
}
export async function saveRecord(table: string, record: Record<string, unknown>, id?: string) { if (!supabase) throw new Error('Supabase is not configured'); const query = id ? supabase.from(table).update(record).eq('id', id) : supabase.from(table).insert(record); const { error } = await query; if (error) throw error }
export async function deleteRecord(table: string, id: string) { if (!supabase) throw new Error('Supabase is not configured'); const { error } = await supabase.from(table).delete().eq('id', id); if (error) throw error }
