'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewInvestorPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/investors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to create investor'); setLoading(false); return }
    router.push(`/admin/investors/${data.id}`)
  }

  return (
    <div style={{padding:32,maxWidth:600,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <a href="/admin/investors" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to investors</a>
      </div>
      <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:28,margin:'0 0 28px'}}>Add investor</h1>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:32}}>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Full name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Jane Harrington"
              required
              style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}}
            />
          </div>
          <div style={{marginBottom:28}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Email address</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jane@institution.com"
              type="email"
              required
              style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}}
            />
          </div>
          {error && <p style={{color:'var(--loss)',fontSize:13,marginBottom:16}}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'12px 24px',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:15,cursor:'pointer'}}
          >
            {loading ? 'Creating…' : 'Create investor'}
          </button>
        </form>
      </div>
    </div>
  )
}
