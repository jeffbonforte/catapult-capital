'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ROLES = [
  { value: 'LP', label: 'LP — investor with full financial visibility' },
  { value: 'CONTACT', label: 'Contact — deal access without financial data (advisors, associates)' },
  { value: 'ADMIN', label: 'Admin — can manage deals and contacts' },
]

const inputStyle = {width:'100%',boxSizing:'border-box' as const,padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}

export default function NewContactPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', company: '', role: 'LP' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to create contact'); setLoading(false); return }
    router.push(`/admin/contacts/${data.id}`)
  }

  return (
    <div style={{padding:32,maxWidth:600,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <a href="/admin/contacts" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to contacts</a>
      </div>
      <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:28,margin:'0 0 28px'}}>Add contact</h1>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:32}}>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Full name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Jane Harrington" required style={inputStyle} />
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Email address</label>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jane@institution.com" type="email" required style={inputStyle} />
          </div>
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Company / firm <span style={{fontWeight:400,color:'var(--slate-500)'}}>optional</span></label>
            <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Meridian Family Office" style={inputStyle} />
          </div>
          <div style={{marginBottom:28}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Role</label>
            <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
              style={{...inputStyle, fontSize:14}}>
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          {error && <p style={{color:'var(--loss)',fontSize:13,marginBottom:16}}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'12px 24px',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:15,cursor:'pointer'}}>
            {loading ? 'Creating…' : 'Create contact'}
          </button>
        </form>
      </div>
    </div>
  )
}
