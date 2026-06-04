'use client'
import { useEffect, useState } from 'react'

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portal/deals').then(r => r.json()).then(d => { setDeals(Array.isArray(d) ? d : []); setLoading(false) })
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/portal/login'
  }

  return (
    <div style={{minHeight:'100vh',background:'var(--paper)',fontFamily:'var(--font-sans)'}}>
      <div style={{background:'var(--navy-900)',borderBottom:'1px solid var(--border-on-brand)',padding:'0 32px'}}>
        <div style={{maxWidth:900,margin:'0 auto',height:66,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <img src="/assets/catapult-logo-horizontal-reversed.png" alt="Catapult Capital" style={{height:22}} />
          <button onClick={logout} style={{background:'none',border:'1px solid var(--border-on-brand)',color:'var(--fg-on-brand-muted)',padding:'7px 14px',borderRadius:6,cursor:'pointer',fontSize:13,fontFamily:'var(--font-sans)'}}>Sign out</button>
        </div>
      </div>
      <div style={{maxWidth:900,margin:'0 auto',padding:'48px 32px'}}>
        <span style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',fontSize:11,color:'var(--slate-500)'}}>Your investments</span>
        <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:32,margin:'8px 0 32px'}}>Portfolio</h1>
        {loading ? <p style={{color:'var(--slate-500)'}}>Loading…</p> : deals.length === 0 ? (
          <p style={{color:'var(--slate-500)'}}>No active investments found.</p>
        ) : (
          <div style={{display:'grid',gap:16}}>
            {deals.map((a: any) => (
              <a key={a.dealId} href={`/portal/deals/${a.dealId}`} style={{
                display:'block',background:'#fff',border:'1px solid var(--border)',borderRadius:10,
                padding:'24px 28px',textDecoration:'none',color:'inherit',
                transition:'border-color .15s,box-shadow .15s'
              }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--navy-400)';(e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(11,37,69,.08)'}}
                 onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border)';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.12em',fontSize:10,color:'var(--slate-500)',marginBottom:6}}>{a.deal?.sector || 'Investment'}</div>
                    <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:600,color:'var(--ink)'}}>{a.deal?.name || a.deal?.company}</div>
                    <div style={{fontSize:13,color:'var(--slate-600)',marginTop:4}}>{a.deal?.description}</div>
                  </div>
                  {a.amountInvested && (
                    <div style={{textAlign:'right',flexShrink:0,marginLeft:24}}>
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
  )
}
