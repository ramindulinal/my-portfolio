import { useEffect, useState } from 'react'
import { loadPortfolio } from './lib/data'
import type { Contact, Post, Profile, Project, TravelPlace } from './types'
import Map from './components/Map'
import Admin from './components/Admin'
import { safeExternalUrl } from './lib/safeUrl'

export default function App() {
  const [data, setData] = useState<{ profile: Profile; projects: Project[]; posts: Post[]; travel: TravelPlace[]; contacts: Contact[] } | null>(null)
  const [admin, setAdmin] = useState(location.pathname === '/admin')
  useEffect(() => { loadPortfolio().then(setData) }, [])
  useEffect(() => { const onPop = () => setAdmin(location.pathname === '/admin'); addEventListener('popstate', onPop); return () => removeEventListener('popstate', onPop) }, [])
  if (admin) return <Admin />
  if (!data) return <div className="loading" aria-live="polite">Loading portfolio…</div>
  const { profile, projects, posts, travel, contacts } = data
  return <><header className="sticky-header"><nav className="navbar" aria-label="Main navigation"><a className="nav-logo" href="#home">Ramindu Linal.</a><div className="nav-links">{[['Home','home'],['Works','works'],['Blog','blog'],['Travel Map','travel'],['About','about']].map(([label,id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><a className="admin-link" href="/admin">Admin</a></nav></header>
    <main><section className="hero-container" id="home"><div className="status-badge"><span className="status-dot" /> {profile.available ? 'Open to new opportunities' : 'Currently working on new ideas'}</div><h1 className="text-script">Hey, <span>there</span></h1><div className="portrait-wrapper">{profile.portrait_url ? <img className="portrait-img" src={profile.portrait_url} alt={`${profile.name} portrait`} /> : <div className="portrait-placeholder" aria-label="Portrait placeholder">RL</div>}</div><div className="text-left">I AM,<br />{profile.name.toUpperCase()}</div><div className="text-right"><div className="sub-heading">School Leaver & Explorer</div><h2>{profile.headline}</h2></div></section>
    <section className="section" id="works"><h2 className="section-title">Featured Works</h2><div className="grid">{projects.map(p => <article className="card" key={p.id}><span className="card-tag">{p.tag}</span><h3>{p.title}</h3><p>{p.description}</p>{p.url &&     <a className="text-link" href={safeExternalUrl(p.url)}>View project ↗</a>}</article>)}</div></section>
    <section className="section blog-section" id="blog"><h2 className="section-title">Journal & Thoughts</h2><div className="grid">{posts.map(p => <article className="card" key={p.id}><span className="card-tag">{p.tag}</span><h3>{p.title}</h3><p>{p.excerpt}</p><time dateTime={p.published_at}>{new Date(p.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time></article>)}</div></section>
    <section className="section" id="travel"><h2 className="section-title">Places Visited & Footprints</h2><Map places={travel} /></section>
    <section className="section" id="about"><h2 className="section-title">About Me</h2><div className="about-box"><div><h3>Hi, I'm {profile.name} Hettiarachchi.</h3><p>{profile.bio}</p></div><div><h3>Core Strengths</h3>{profile.strengths.map(s => <p key={s}><strong>• {s.split(':')[0]}:</strong>{s.split(':').slice(1).join(':')}</p>)}</div></div></section></main>
    <Contact contacts={contacts} /><footer>© {new Date().getFullYear()} {profile.name}. Built with clean code and modern aesthetics.</footer></>
}
function Contact({ contacts }: { contacts: Contact[] }) { const [open, setOpen] = useState(false); return <div className="floating-wrapper"><div className={`contact-list ${open ? 'active' : ''}`}>{contacts.map(c => { const href = safeExternalUrl(c.href); return href ? <a className="expand-btn" href={href} key={c.id} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span className="label">{c.label}</span><span className="icon">{c.icon}</span></a> : null })}</div><button className={`floating-pill-btn ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}><span className="btn-label">{open ? 'Close' : 'Contact Me'}</span><span className="btn-icon">{open ? '×' : '✦'}</span></button></div> }
