'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

function formatCurrency(n: number) {
  if (n >= 1e6) return `$${(n/1e6).toFixed(1)}M`
  if (n >= 1e3) return `$${(n/1e3).toFixed(0)}K`
  return `$${n.toLocaleString()}`
}

export default function DealDashboard() {
  const { dealId } = useParams()
  const [data, setData] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>('')
  const [tab, setTab] = useState<'overview'|'documents'|'updates'|'sign'>('overview')
  const [docs, setDocs] = useState<any[]>([])
  const [updates, setUpdates] = useState<any[]>([])

  useEffect(() => {
    fetch(`/api/portal/deals/${dealId}`).then(r=>r.json()).then(setData)
    fetch('/api/auth/me').then(r=>r.json()).then(u => setUserRole(u?.role || ''))
  }, [dealId])

  const isContact = userRole === 'CONTACT'

  useEffect(() => {
    if (tab === 'documents') fetch(`/api/portal/deals/${dealId}/documents`).then(r=>r.json()).then(d => setDocs(Array.isArray(d) ? d : []))
    if (tab === 'updates') fetch(`/api/portal/deals/${dealId}/updates`).then(r=>r.json()).then(d => setUpdates(Array.isArray(d) ? d : []))
  }, [tab, dealId])

  async function logView(docId: string, url: string) {
    await fetch(`/api/portal/deals/${dealId}/documents/${docId}/view`, { method: 'POST' })
    window.open(url, '_blank')
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/portal/login'
  }

  if (!data) return <div style={{minHeight:'100vh',background:'var(--paper)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--slate-500)',fontFamily:'var(--font-sans)'}}>Loading…</div>

  const moic = data.moic ? `${data.moic.toFixed(2)}×` : '—'
  const irr = data.irr ? `${(data.irr*100).toFixed(1)}%` : '—'
  const nav = data.currentValue ? formatCurrency(data.currentValue) : '—'
  const invested = data.amountInvested ? formatCurrency(data.amountInvested) : '—'

  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',background:'var(--paper)',fontFamily:'var(--font-sans)'}}>
      {/* Topbar */}
      <div style={{background:'rgba(255,255,255,.85)',backdropFilter:'blur(8px)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:40}}>
        <div style={{maxWidth:1100,margin:'0 auto',height:66,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 32px'}}>
          <div style={{display:'flex',alignItems:'center',gap:24}}>
            <img src="/assets/catapult-logo-horizontal.png" alt="Catapult Capital" style={{height:22}} />
            <span style={{color:'var(--border)',fontSize:20}}>|</span>
            <Link href="/portal/deals" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← All investments</Link>
          </div>
          <button onClick={logout} style={{background:'none',border:'1px solid var(--border-strong)',color:'var(--slate-600)',padding:'7px 14px',borderRadius:6,cursor:'pointer',fontSize:13,fontFamily:'var(--font-sans)'}}>Sign out</button>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',width:'100%',padding:'40px 32px',flex:1}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <span style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',fontSize:11,color:'var(--slate-500)'}}>{data.deal?.sector}</span>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:34,margin:'6px 0 4px'}}>{data.deal?.name}</h1>
          <p style={{fontSize:14,color:'var(--slate-600)',margin:0}}>{data.deal?.description}</p>
        </div>

        {/* DocuSign banner */}
        {data.docusignStatus === 'pending' && (
          <div style={{background:'#FFF8E7',border:'1px solid #F0D060',borderRadius:8,padding:'14px 20px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600,fontSize:14}}>Action required — closing documents</div>
              <div style={{fontSize:13,color:'var(--slate-600)',marginTop:2}}>Please review and sign the subscription documents to complete your investment.</div>
            </div>
            <button onClick={() => setTab('sign')} style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'10px 18px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13,whiteSpace:'nowrap',marginLeft:16}}>
              Sign documents →
            </button>
          </div>
        )}

        {/* KPI cards — hidden for CONTACT role */}
        {!isContact && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:28}}>
            {[
              { label: 'Current NAV', value: nav, sub: 'fair value' },
              { label: 'Net MOIC', value: moic, sub: `${invested} invested` },
              { label: 'Net IRR', value: irr, sub: 'since investment' },
              { label: 'Amount invested', value: invested, sub: data.deal?.investDate ? new Date(data.deal.investDate).getFullYear().toString() : '' },
            ].map(k => (
              <div key={k.label} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:'18px 20px'}}>
                <div style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',marginBottom:10}}>{k.label}</div>
                <div style={{fontFamily:'var(--font-mono)',fontWeight:500,fontSize:30,color:'var(--ink)',lineHeight:1}}>{k.value}</div>
                <div style={{fontSize:12,color:'var(--slate-500)',marginTop:6}}>{k.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{display:'flex',borderBottom:'1px solid var(--border)',marginBottom:28}}>
          {(['overview','documents','updates','sign'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding:'10px 20px',background:'none',border:'none',cursor:'pointer',
              fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,
              color: tab===t ? 'var(--navy-700)' : 'var(--slate-500)',
              borderBottom: tab===t ? '2px solid var(--navy-600)' : '2px solid transparent',
              marginBottom:-1,textTransform:'capitalize',transition:'all .15s'
            }}>{t === 'sign' ? 'Sign docs' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:16}}>
            <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
                <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Investment value</h3>
                <span style={{fontSize:12,color:'var(--slate-500)'}}>Indexed growth</span>
              </div>
              <svg viewBox="0 0 560 190" width="100%" style={{display:'block'}} preserveAspectRatio="none">
                <defs><linearGradient id="fill2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#134480" stopOpacity="0.18"/><stop offset="100%" stopColor="#134480" stopOpacity="0"/></linearGradient></defs>
                {[0.25,0.5,0.75,1].map(f => <line key={f} x1="8" x2="552" y1={182-f*174} y2={182-f*174} stroke="#E2E4E5" strokeWidth="1"/>)}
                <path d="M8,174 L45,162 L82,150 L119,155 L156,138 L193,120 L230,110 L267,96 L304,78 L341,62 L378,48 L415,32 L452,18 L489,10 L552,8 L552,182 L8,182 Z" fill="url(#fill2)"/>
                <path d="M8,174 L45,162 L82,150 L119,155 L156,138 L193,120 L230,110 L267,96 L304,78 L341,62 L378,48 L415,32 L452,18 L489,10 L552,8" fill="none" stroke="#134480" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="552" cy="8" r="4" fill="#134480" stroke="#fff" strokeWidth="2"/>
              </svg>
            </div>
            <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:20}}>
              <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:'0 0 16px'}}>Deal details</h3>
              {[
                ['Company', data.deal?.company],
                ['Sector', data.deal?.sector || '—'],
                ['Status', data.deal?.status],
                ...(!isContact ? [['Invested', invested], ['Current value', nav]] : []),
                ['DocuSign', data.docusignStatus || 'Not started'],
              ].map(([k,v]) => (
                <div key={k as string} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:13,color:'var(--slate-600)'}}>{k}</span>
                  <span style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'documents' && (
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'var(--paper)'}}>
                  {['Document','Type','Date','Views',''].map(h => (
                    <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'12px 18px',borderBottom:'1px solid var(--border)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {docs.length === 0 ? (
                  <tr><td colSpan={5} style={{padding:'32px 18px',color:'var(--slate-500)',fontSize:14,textAlign:'center'}}>No documents yet.</td></tr>
                ) : docs.map((d: any) => (
                  <tr key={d.id} style={{borderBottom:'1px solid var(--border)'}}>
                    <td style={{padding:'14px 18px'}}>
                      <div style={{fontWeight:600,fontSize:14}}>{d.title}</div>
                    </td>
                    <td style={{padding:'14px 18px'}}>
                      <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'var(--navy-100)',color:'var(--navy-700)'}}>
                        {d.type.replace(/_/g,' ')}
                      </span>
                    </td>
                    <td style={{padding:'14px 18px',fontSize:13,color:'var(--slate-600)'}}>{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td style={{padding:'14px 18px',fontFamily:'var(--font-mono)',fontSize:13,color:'var(--slate-500)'}}>{d.views?.length > 0 ? `Viewed ${new Date(d.views[0].viewedAt).toLocaleDateString()}` : 'Not viewed'}</td>
                    <td style={{padding:'14px 18px',textAlign:'right'}}>
                      <button onClick={() => logView(d.id, d.fileUrl)} style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 12px',cursor:'pointer',fontSize:12,fontWeight:600,color:'var(--navy-600)',fontFamily:'var(--font-sans)'}}>
                        Open ↗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'updates' && (
          <div style={{display:'grid',gap:16}}>
            {updates.length === 0 ? (
              <p style={{color:'var(--slate-500)',fontSize:14}}>No updates yet.</p>
            ) : updates.map((u: any) => (
              <div key={u.id} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:'24px 28px'}}>
                <div style={{fontSize:12,color:'var(--slate-500)',marginBottom:8}}>{new Date(u.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
                <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:20,margin:'0 0 12px'}}>{u.title}</h3>
                <div style={{fontSize:15,color:'var(--slate-700)',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{u.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'sign' && (
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:40,textAlign:'center'}}>
            <div style={{fontSize:48,marginBottom:16}}>📝</div>
            <h3 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:24,margin:'0 0 12px'}}>
              {data.docusignStatus === 'completed' ? 'Documents signed' : 'Subscription documents'}
            </h3>
            {data.docusignStatus === 'completed' ? (
              <p style={{color:'var(--slate-600)',fontSize:15}}>You have completed all required documents for this investment.</p>
            ) : data.docusignStatus === 'pending' ? (
              <>
                <p style={{color:'var(--slate-600)',fontSize:15,marginBottom:28}}>Your subscription documents are ready for signature. Click below to open DocuSign.</p>
                <button style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:8,padding:'14px 32px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:16}}>
                  Open in DocuSign →
                </button>
                <p style={{fontSize:12,color:'var(--slate-400)',marginTop:16}}>You will be redirected to DocuSign to complete your signature securely.</p>
              </>
            ) : (
              <p style={{color:'var(--slate-600)',fontSize:15}}>No signing documents have been sent yet. Your investor relations contact will be in touch.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
