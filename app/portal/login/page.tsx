'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [tab, setTab] = useState<'magic' | 'code'>('magic')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/auth/magic-link', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email }) })
    if (!res.ok) { setError('Failed to send login link. Please try again or contact support.'); setLoading(false); return }
    setSent(true); setLoading(false)
  }

  async function handleAccessCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/auth/access-code', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ code }) })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Invalid code'); setLoading(false); return }
    window.location.href = data.dealId ? `/portal/deals/${data.dealId}` : '/portal/deals'
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(160deg,#0E2E54,#0B2545)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'#fff',borderRadius:12,padding:40,width:'100%',maxWidth:420,boxShadow:'0 24px 64px rgba(11,37,69,.25)'}}>
        <a href="/"><img src="/assets/catapult-logo-horizontal.png" alt="Catapult Capital" style={{height:26,marginBottom:32,display:'block'}} /></a>

        {sent ? (
          <div style={{textAlign:'center',padding:'16px 0'}}>
            <div style={{fontSize:40,marginBottom:16}}>📬</div>
            <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:22,margin:'0 0 10px'}}>Check your inbox</h2>
            <p style={{fontSize:14,color:'var(--slate-600)',lineHeight:1.6}}>
              We sent a secure login link to <strong>{email}</strong>. It expires in 15 minutes.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:24,margin:'0 0 6px'}}>Investor access</h2>
            <p style={{fontSize:14,color:'var(--slate-600)',margin:'0 0 24px'}}>Catapult Capital LP portal</p>

            <div style={{display:'flex',borderBottom:'1px solid var(--border)',marginBottom:24}}>
              {([['magic','Email link'],['code','Access code']] as const).map(([t,l]) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex:1,padding:'10px 0',background:'none',border:'none',cursor:'pointer',
                  fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,
                  color: tab===t ? 'var(--navy-700)' : 'var(--slate-500)',
                  borderBottom: tab===t ? '2px solid var(--navy-600)' : '2px solid transparent',
                  marginBottom:-1,transition:'all .15s'
                }}>{l}</button>
              ))}
            </div>

            {tab === 'magic' ? (
              <form onSubmit={handleMagicLink}>
                <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Work email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="jane@institution.com" type="email" required
                  style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}} />
                {error && <p style={{color:'var(--loss)',fontSize:13,marginTop:8}}>{error}</p>}
                <button type="submit" disabled={loading}
                  style={{marginTop:16,width:'100%',padding:'13px',background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,fontFamily:'var(--font-sans)',fontWeight:600,fontSize:15,cursor:'pointer'}}>
                  {loading ? 'Sending…' : 'Send login link'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAccessCode}>
                <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Access code</label>
                <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="ABC123" required
                  style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-mono)',letterSpacing:'.1em',outline:'none',textTransform:'uppercase'}} />
                {error && <p style={{color:'var(--loss)',fontSize:13,marginTop:8}}>{error}</p>}
                <button type="submit" disabled={loading}
                  style={{marginTop:16,width:'100%',padding:'13px',background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,fontFamily:'var(--font-sans)',fontWeight:600,fontSize:15,cursor:'pointer'}}>
                  {loading ? 'Verifying…' : 'Access portal'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
