'use client'
import { useState } from 'react'

const inputStyle = {width:'100%',boxSizing:'border-box' as const,padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}
const labelStyle = {fontSize:11,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:4}

export default function ContactDetail({ contact, deals }: { contact: any, deals: any[] }) {
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: contact.name, email: contact.email, company: contact.company || '', role: contact.role })
  const [linkSent, setLinkSent] = useState(false)
  const [magicLink, setMagicLink] = useState('')
  const [addingDeal, setAddingDeal] = useState(false)
  const [dealForm, setDealForm] = useState({ dealId: '', amountInvested: '', currentValue: '', investDate: '', isRestricted: false, docusignStatus: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [isLocked, setIsLocked] = useState(contact.isLocked)
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/admin/contacts/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, isLocked, role: editForm.role })
    })
    setSaving(false)
    setEditing(false)
    setMsg('Profile saved.')
    setTimeout(() => { setMsg(''); window.location.reload() }, 1000)
  }

  async function toggleLock() {
    const next = !isLocked
    await fetch(`/api/admin/contacts/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: contact.name, email: contact.email, company: contact.company, isLocked: next })
    })
    setIsLocked(next)
    setMsg(next ? 'User locked — they cannot log in.' : 'User unlocked.')
    setTimeout(() => setMsg(''), 3000)
  }

  async function deleteUser() {
    await fetch(`/api/admin/contacts/${contact.id}`, { method: 'DELETE' })
    window.location.href = '/admin/contacts'
  }

  async function sendMagicLink() {
    const res = await fetch(`/api/admin/contacts/${contact.id}/magic-link`, { method: 'POST' })
    const data = await res.json()
    setMagicLink(data.link || '')
    setLinkSent(true)
  }

  async function addAccess(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/admin/contacts/${contact.id}/access`, {
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
    setMsg('Deal access granted.')
    setTimeout(() => { setMsg(''); window.location.reload() }, 1000)
  }

  async function updateAccess(dealId: string, updates: any) {
    await fetch(`/api/admin/contacts/${contact.id}/access`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dealId, ...updates })
    })
    setMsg('Updated.')
    setTimeout(() => setMsg(''), 2000)
  }

  const existingDealIds = contact.dealAccess.map((a: any) => a.dealId)
  const availableDeals = deals.filter((d: any) => !existingDealIds.includes(d.id))

  return (
    <div style={{padding:32,maxWidth:1000,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <a href="/admin/contacts" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to investors</a>
      </div>

      {msg && <div style={{background:'var(--gain-bg)',border:'1px solid var(--gain)',borderRadius:6,padding:'10px 14px',marginBottom:16,fontSize:13,color:'var(--gain)'}}>{msg}</div>}

      {/* Profile header */}
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:28,marginBottom:20}}>
        {editing ? (
          <form onSubmit={saveProfile}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:16,marginBottom:16}}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input style={inputStyle} value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} required />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} required />
              </div>
              <div>
                <label style={labelStyle}>Company / firm</label>
                <input style={inputStyle} value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} placeholder="e.g. Meridian Family Office" />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <select style={inputStyle} value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
                  <option value="LP">LP</option>
                  <option value="CONTACT">Contact</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
            </div>
            <div style={{display:'flex',gap:10}}>
              <button type="submit" disabled={saving} style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'9px 18px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13}}>
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button type="button" onClick={() => setEditing(false)} style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'9px 18px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:13}}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:8}}>
                <div style={{width:44,height:44,borderRadius:'50%',background: isLocked ? 'var(--slate-200)' : 'var(--navy-100)',color: isLocked ? 'var(--slate-500)' : 'var(--navy-700)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16}}>
                  {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2)}
                </div>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:24,margin:0}}>{contact.name}</h1>
                    {isLocked && <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'#FEE2E2',color:'#991B1B'}}>LOCKED</span>}
                  </div>
                  <div style={{fontSize:14,color:'var(--slate-600)',marginTop:2}}>{contact.email}</div>
                  {contact.company && <div style={{fontSize:13,color:'var(--slate-500)',marginTop:2}}>{contact.company}</div>}
                </div>
              </div>
              <div style={{fontSize:13,color:'var(--slate-500)'}}>
                Last login: {contact.lastLoginAt ? new Date(contact.lastLoginAt).toLocaleString() : 'Never'} · Member since {new Date(contact.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
              <div style={{display:'flex',gap:8}}>
                <button onClick={() => setEditing(true)} style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'8px 14px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:600}}>
                  Edit profile
                </button>
                <button onClick={sendMagicLink} disabled={isLocked} style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'8px 14px',cursor: isLocked ? 'not-allowed' : 'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13,opacity: isLocked ? .5 : 1}}>
                  Send magic link
                </button>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button onClick={toggleLock} style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'7px 14px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12,fontWeight:600,color: isLocked ? 'var(--gain)' : 'var(--loss)'}}>
                  {isLocked ? '🔓 Unlock access' : '🔒 Lock access'}
                </button>
                {!confirmDelete ? (
                  <button onClick={() => setConfirmDelete(true)} style={{background:'none',border:'1px solid #FCA5A5',borderRadius:6,padding:'7px 14px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12,fontWeight:600,color:'#DC2626'}}>
                    Delete user
                  </button>
                ) : (
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{fontSize:12,color:'var(--slate-600)'}}>Sure?</span>
                    <button onClick={deleteUser} style={{background:'#DC2626',color:'#fff',border:'none',borderRadius:6,padding:'7px 12px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12,fontWeight:600}}>Yes, delete</button>
                    <button onClick={() => setConfirmDelete(false)} style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'7px 12px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12}}>Cancel</button>
                  </div>
                )}
              </div>
              {linkSent && magicLink && (
                <div style={{background:'var(--navy-50)',border:'1px solid var(--navy-200)',borderRadius:6,padding:'8px 12px',maxWidth:360}}>
                  <div style={{fontSize:11,fontWeight:600,color:'var(--navy-700)',marginBottom:4}}>Magic link:</div>
                  <div style={{fontSize:11,fontFamily:'var(--font-mono)',color:'var(--slate-600)',wordBreak:'break-all'}}>{magicLink}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

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
                <label style={labelStyle}>Deal</label>
                <select value={dealForm.dealId} onChange={e => setDealForm({...dealForm, dealId: e.target.value})} required style={{...inputStyle}}>
                  <option value="">Select deal…</option>
                  {availableDeals.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Amount invested ($)</label>
                <input type="number" style={inputStyle} value={dealForm.amountInvested} onChange={e => setDealForm({...dealForm, amountInvested: e.target.value})} placeholder="2500000" />
              </div>
              <div>
                <label style={labelStyle}>Current value ($)</label>
                <input type="number" style={inputStyle} value={dealForm.currentValue} onChange={e => setDealForm({...dealForm, currentValue: e.target.value})} placeholder="4100000" />
              </div>
              <div>
                <label style={labelStyle}>Invest date</label>
                <input type="date" style={inputStyle} value={dealForm.investDate} onChange={e => setDealForm({...dealForm, investDate: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>DocuSign status</label>
                <select value={dealForm.docusignStatus} onChange={e => setDealForm({...dealForm, docusignStatus: e.target.value})} style={{...inputStyle}}>
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
            <button type="submit" disabled={saving} style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'10px 20px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14}}>
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
            {contact.dealAccess.length === 0 ? (
              <tr><td colSpan={7} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No deal access yet.</td></tr>
            ) : contact.dealAccess.map((a: any, i: number) => {
              const moic = a.amountInvested && a.currentValue ? (a.currentValue / a.amountInvested).toFixed(2) + '×' : '—'
              return (
                <tr key={a.id} style={{borderBottom: i < contact.dealAccess.length-1 ? '1px solid var(--border)' : 'none'}}>
                  <td style={{padding:'12px 16px',fontWeight:600,fontSize:14}}>{a.deal?.name}</td>
                  <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{a.amountInvested ? `$${(a.amountInvested/1e6).toFixed(1)}M` : '—'}</td>
                  <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{a.currentValue ? `$${(a.currentValue/1e6).toFixed(1)}M` : '—'}</td>
                  <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)',color:parseFloat(moic)>=1?'var(--gain)':'var(--loss)'}}>{moic}</td>
                  <td style={{padding:'12px 16px',fontSize:13}}>
                    <select value={a.docusignStatus || ''} onChange={e => updateAccess(a.dealId, {docusignStatus: e.target.value})} style={{padding:'4px 8px',border:'1px solid var(--border)',borderRadius:4,fontSize:12,fontFamily:'var(--font-sans)'}}>
                      <option value="">Not started</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td style={{padding:'12px 16px'}}>
                    <input type="checkbox" checked={a.isRestricted} onChange={e => updateAccess(a.dealId, {isRestricted: e.target.checked})} title="Toggle restricted" />
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
            {contact.docViews.length === 0 ? (
              <tr><td colSpan={3} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No document views yet.</td></tr>
            ) : contact.docViews.map((v: any, i: number) => (
              <tr key={v.id} style={{borderBottom: i < contact.docViews.length-1 ? '1px solid var(--border)' : 'none'}}>
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
