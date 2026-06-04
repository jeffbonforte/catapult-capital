'use client'
import { useState } from 'react'

export default function InvestorDetail({ investor, deals }: { investor: any, deals: any[] }) {
  const [linkSent, setLinkSent] = useState(false)
  const [magicLink, setMagicLink] = useState('')
  const [addingDeal, setAddingDeal] = useState(false)
  const [dealForm, setDealForm] = useState({ dealId: '', amountInvested: '', currentValue: '', investDate: '', isRestricted: false, docusignStatus: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function sendMagicLink() {
    const res = await fetch(`/api/admin/investors/${investor.id}/magic-link`, { method: 'POST' })
    const data = await res.json()
    setMagicLink(data.link || '')
    setLinkSent(true)
  }

  async function addAccess(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/admin/investors/${investor.id}/access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...dealForm,
        amountInvested: dealForm.amountInvested ? parseFloat(dealForm.amountInvested) : null,
        currentValue: dealForm.currentValue ? parseFloat(dealForm.currentValue) : null,
      })
    })
    setSaving(false)
    setAddingDeal(false)
    setMsg('Deal access saved. Reload to see changes.')
    setTimeout(() => window.location.reload(), 1000)
  }

  async function updateAccess(dealId: string, updates: any) {
    await fetch(`/api/admin/investors/${investor.id}/access`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dealId, ...updates })
    })
    setMsg('Updated.')
    setTimeout(() => setMsg(''), 2000)
  }

  const existingDealIds = investor.dealAccess.map((a: any) => a.dealId)
  const availableDeals = deals.filter((d: any) => !existingDealIds.includes(d.id))

  return (
    <div style={{padding:32,maxWidth:1000,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <a href="/admin/investors" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to investors</a>
      </div>

      {/* Profile header */}
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:28,marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:8}}>
            <div style={{width:44,height:44,borderRadius:'50%',background:'var(--navy-100)',color:'var(--navy-700)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16}}>
              {investor.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2)}
            </div>
            <div>
              <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:24,margin:0}}>{investor.name}</h1>
              <div style={{fontSize:14,color:'var(--slate-600)',marginTop:2}}>{investor.email}</div>
            </div>
          </div>
          <div style={{fontSize:13,color:'var(--slate-500)'}}>
            Last login: {investor.lastLoginAt ? new Date(investor.lastLoginAt).toLocaleString() : 'Never'} ·
            Member since {new Date(investor.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div style={{display:'flex',gap:10,flexDirection:'column',alignItems:'flex-end'}}>
          <button
            onClick={sendMagicLink}
            style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'10px 18px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13}}
          >
            Send magic link
          </button>
          {linkSent && magicLink && (
            <div style={{background:'var(--navy-50)',border:'1px solid var(--navy-200)',borderRadius:6,padding:'8px 12px',maxWidth:360}}>
              <div style={{fontSize:11,fontWeight:600,color:'var(--navy-700)',marginBottom:4}}>Magic link (dev mode — logged to console):</div>
              <div style={{fontSize:11,fontFamily:'var(--font-mono)',color:'var(--slate-600)',wordBreak:'break-all'}}>{magicLink}</div>
            </div>
          )}
        </div>
      </div>

      {msg && <div style={{background:'var(--gain-bg)',border:'1px solid var(--gain)',borderRadius:6,padding:'10px 14px',marginBottom:16,fontSize:13,color:'var(--gain)'}}>{msg}</div>}

      {/* Deal access */}
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden',marginBottom:20}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Deal access</h3>
          {availableDeals.length > 0 && (
            <button onClick={() => setAddingDeal(!addingDeal)} style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'8px 14px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13}}>
              {addingDeal ? 'Cancel' : '+ Add deal'}
            </button>
          )}
        </div>

        {addingDeal && (
          <form onSubmit={addAccess} style={{padding:'20px',background:'var(--paper)',borderBottom:'1px solid var(--border)'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:16}}>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:4}}>Deal</label>
                <select value={dealForm.dealId} onChange={e => setDealForm({...dealForm, dealId: e.target.value})} required
                  style={{width:'100%',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}}>
                  <option value="">Select deal…</option>
                  {availableDeals.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:4}}>Amount invested ($)</label>
                <input type="number" value={dealForm.amountInvested} onChange={e => setDealForm({...dealForm, amountInvested: e.target.value})} placeholder="2500000"
                  style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}} />
              </div>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:4}}>Current value ($)</label>
                <input type="number" value={dealForm.currentValue} onChange={e => setDealForm({...dealForm, currentValue: e.target.value})} placeholder="4100000"
                  style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}} />
              </div>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:4}}>Invest date</label>
                <input type="date" value={dealForm.investDate} onChange={e => setDealForm({...dealForm, investDate: e.target.value})}
                  style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}} />
              </div>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:4}}>DocuSign status</label>
                <select value={dealForm.docusignStatus} onChange={e => setDealForm({...dealForm, docusignStatus: e.target.value})}
                  style={{width:'100%',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}}>
                  <option value="">Not started</option>
                  <option value="pending">Pending signature</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div style={{display:'flex',alignItems:'flex-end'}}>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,cursor:'pointer'}}>
                  <input type="checkbox" checked={dealForm.isRestricted} onChange={e => setDealForm({...dealForm, isRestricted: e.target.checked})} />
                  Restricted access
                </label>
              </div>
            </div>
            <button type="submit" disabled={saving}
              style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'10px 20px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14}}>
              {saving ? 'Saving…' : 'Grant access'}
            </button>
          </form>
        )}

        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Deal','Invested','Current value','MOIC','DocuSign','Restricted','Access code'].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investor.dealAccess.length === 0 ? (
              <tr><td colSpan={7} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No deal access yet.</td></tr>
            ) : investor.dealAccess.map((a: any, i: number) => {
              const moic = a.amountInvested && a.currentValue ? (a.currentValue / a.amountInvested).toFixed(2) + '×' : '—'
              return (
                <tr key={a.id} style={{borderBottom: i < investor.dealAccess.length-1 ? '1px solid var(--border)' : 'none'}}>
                  <td style={{padding:'12px 16px',fontWeight:600,fontSize:14}}>{a.deal?.name}</td>
                  <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{a.amountInvested ? `$${(a.amountInvested/1e6).toFixed(1)}M` : '—'}</td>
                  <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{a.currentValue ? `$${(a.currentValue/1e6).toFixed(1)}M` : '—'}</td>
                  <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)',color:parseFloat(moic)>=1?'var(--gain)':'var(--loss)'}}>{moic}</td>
                  <td style={{padding:'12px 16px',fontSize:13}}>
                    <select value={a.docusignStatus || ''} onChange={e => updateAccess(a.dealId, {docusignStatus: e.target.value})}
                      style={{padding:'4px 8px',border:'1px solid var(--border)',borderRadius:4,fontSize:12,fontFamily:'var(--font-sans)'}}>
                      <option value="">Not started</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td style={{padding:'12px 16px'}}>
                    <input type="checkbox" checked={a.isRestricted} onChange={e => updateAccess(a.dealId, {isRestricted: e.target.checked})} />
                  </td>
                  <td style={{padding:'12px 16px',fontFamily:'var(--font-mono)',fontSize:12,color:'var(--slate-500)'}}>{a.accessCode || '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Document views */}
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Document view history</h3>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Document','Deal','Viewed at'].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investor.docViews.length === 0 ? (
              <tr><td colSpan={3} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No document views yet.</td></tr>
            ) : investor.docViews.map((v: any, i: number) => (
              <tr key={v.id} style={{borderBottom: i < investor.docViews.length-1 ? '1px solid var(--border)' : 'none'}}>
                <td style={{padding:'12px 16px',fontWeight:600,fontSize:14}}>{v.document?.title}</td>
                <td style={{padding:'12px 16px',fontSize:14,color:'var(--slate-600)'}}>{v.document?.deal?.name}</td>
                <td style={{padding:'12px 16px',fontSize:13,color:'var(--slate-500)',fontFamily:'var(--font-mono)'}}>{new Date(v.viewedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
