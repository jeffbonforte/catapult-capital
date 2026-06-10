'use client'
import { useEffect, useState } from 'react'
import '../portal.css'

function IconGrid({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
function IconBuilding({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>
}
function IconFileText({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}
function IconSettings({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/portal/deals').then(r => r.json()),
      fetch('/api/auth/me').then(r => r.json()),
    ]).then(([d, u]) => {
      setDeals(Array.isArray(d) ? d : [])
      setUser(u?.id ? u : null)
      setLoading(false)
    })
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/portal/login'
  }

  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '??'
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sb-logo">
          <a href="/"><img src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" style={{filter:'brightness(0) invert(1)',display:'block'}} /></a>
        </div>
        <div className="sb-section">
          <div className="lbl">Portal</div>
          <div className="sb-item active">
            <span className="ic"><IconGrid size={18} /></span>
            <span>Portfolio</span>
          </div>
          <div className="sb-item" style={{opacity:.5,pointerEvents:'none'}}>
            <span className="ic"><IconFileText size={18} /></span>
            <span>Documents</span>
          </div>
        </div>
        {isAdmin && (
          <div className="sb-section">
            <div className="lbl">Admin</div>
            <a href="/admin" style={{textDecoration:'none'}}>
              <div className="sb-item">
                <span className="ic"><IconSettings size={18} /></span>
                <span>Admin panel</span>
              </div>
            </a>
          </div>
        )}
        <div className="sb-foot">
          <div className="sb-avatar">{initials}</div>
          <div>
            <div className="nm">{user?.name || '…'}</div>
            <div className="sub" style={{cursor:'pointer'}} onClick={logout}>Sign out</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        <div className="topbar">
          <h1>Portfolio</h1>
        </div>
        <div className="content">
          <div className="content-inner">
            <div className="page-intro">
              <div>
                <span className="eyebrow" style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',fontSize:11,color:'var(--slate-500)',display:'block',marginBottom:6}}>Your investments</span>
                <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:'clamp(24px,5vw,30px)',margin:0}}>
                  {loading ? 'Loading…' : `Welcome back, ${user?.name?.split(' ')[0] || ''}`}
                </h2>
              </div>
            </div>

            {loading ? null : isAdmin && deals.length === 0 ? (
              <div style={{background:'var(--navy-50)',border:'1px solid var(--navy-100)',borderRadius:10,padding:'24px 28px',marginBottom:24}}>
                <div style={{fontWeight:600,color:'var(--navy-700)',marginBottom:4}}>You're logged in as an admin</div>
                <div style={{fontSize:14,color:'var(--navy-600)',marginBottom:16}}>Admin accounts don't have LP investment access by default. Use the admin panel to manage investors and deals.</div>
                <a href="/admin" style={{display:'inline-block',background:'var(--navy-600)',color:'#fff',padding:'10px 18px',borderRadius:6,textDecoration:'none',fontWeight:600,fontSize:13}}>Go to admin panel →</a>
              </div>
            ) : !loading && deals.length === 0 ? (
              <p style={{color:'var(--slate-500)',fontSize:14}}>No active investments found.</p>
            ) : (
              <div style={{display:'grid',gap:16}}>
                {deals.map((a: any) => (
                  <a key={a.dealId} href={`/portal/deals/${a.dealId}`} style={{
                    display:'block',background:'#fff',border:'1px solid var(--border)',borderRadius:10,
                    padding:'24px 28px',textDecoration:'none',color:'inherit',
                    transition:'border-color .15s,box-shadow .15s'
                  }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--navy-400)';(e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(11,37,69,.08)'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border)';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:16}}>
                      <div style={{minWidth:0,flex:'1 1 240px'}}>
                        <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--slate-500)',marginBottom:6}}>{a.deal?.sector || 'Investment'}</div>
                        <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,color:'var(--ink)'}}>{a.deal?.name || a.deal?.company}</div>
                        <div style={{fontSize:13,color:'var(--slate-600)',marginTop:4}}>{a.deal?.description}</div>
                      </div>
                      {a.amountInvested && user?.role !== 'CONTACT' && (
                        <div style={{textAlign:'right',flexShrink:0}}>
                          <div style={{fontFamily:'var(--font-mono)',fontSize:22,fontWeight:500,color:'var(--navy-700)'}}>${(a.amountInvested/1e6).toFixed(1)}M</div>
                          <div style={{fontSize:11,color:'var(--slate-500)',marginTop:2}}>invested</div>
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
