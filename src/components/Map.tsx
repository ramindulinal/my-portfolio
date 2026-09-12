import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { TravelPlace } from '../types'
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>)[character])
export default function Map({ places }: { places: TravelPlace[] }) { const ref = useRef<HTMLDivElement>(null); useEffect(() => { if (!ref.current) return; const map = L.map(ref.current).setView([7.8731, 80.7718], 8); L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap &copy; CARTO' }).addTo(map); places.forEach(p => L.marker([p.latitude, p.longitude]).addTo(map).bindPopup(`<strong>${escapeHtml(p.title)}</strong><br><small>${escapeHtml(new Date(p.visited_on).toLocaleDateString())}</small><br>${escapeHtml(p.description)}`)); return () => map.remove() }, [places]); return <div className="map-wrapper"><div className="travel-map" ref={ref} role="application" aria-label="Map of visited places" /></div> }
