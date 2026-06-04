'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewDealPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', company: '', description: '', sector: '', investDate: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to create deal'); setLoading(false); return }
    router.push(`/admin/deals/${data.id}`)
  }

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  return (
    <div style={{padding:32,maxWidth:600,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <a href="/admin/deals" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to deals</a>
      </div>
      <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:28,margin:'0 0 28px'}}>New deal</h1>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:32}}>
        <form onSubmit={handleSubmit}>
          {[
            { field: 'name', label: 'Deal name', placeholder: 'JibJab Media', required: true },
            { field: 'company', label: 'Company', placeholder: 'JibJab Bros. Studios', required: true },
            { field: 'sector', label: 'Sector', placeholder: 'Consumer / Media', required: false },
          ].map(({ field, label, placeholder, required }) => (
            <div key={field} style={{marginBottom:20}}>
              <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>{label}</label>
              <input
                value={(form as any)[field]}
                onChange={e => update(field, e.target.value)}
                placeholder={placeholder}
                required={required}
                style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}}
              />
            </div>
          ))}
          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Description</label>
            <textarea
              value={form.description}
              onChange={e => update('description', e.target.value)}
              placeholder="Brief description of the company and investment thesis…"
              rows={3}
              style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none',resize:'vertical'}}
            />
          </div>
          <div style={{marginBottom:28}}>
            <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Investment date</label>
            <input
              type="date"
              value={form.investDate}
              onChange={e => update('investDate', e.target.value)}
              style={{width:'100%',boxSizing:'border-box',padding:'11px 13px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}}
            />
          </div>
          {error && <p style={{color:'var(--loss)',fontSize:13,marginBottom:16}}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'12px 24px',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:15,cursor:'pointer'}}
          >
            {loading ? 'Creating…' : 'Create deal'}
          </button>
        </form>
      </div>
    </div>
  )
}
