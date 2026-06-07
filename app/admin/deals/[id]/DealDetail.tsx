'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DOC_TYPES = ['RESEARCH_MEMO','INVESTMENT_DECK','LEGAL_DOC','UPDATE_REPORT','OTHER']

function fmtSize(bytes: number): string {
  if (!bytes) return '—'
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  return `${(bytes / 1_000).toFixed(0)} KB`
}

export default function DealDetail({ deal }: { deal: any }) {
  const router = useRouter()
  const [tab, setTab] = useState<'overview'|'documents'|'updates'|'settings'>('overview')
  const [msg, setMsg] = useState('')

  // Document upload
  const [uploading, setUploading] = useState(false)
  const [docTitle, setDocTitle] = useState('')
  const [docType, setDocType] = useState('RESEARCH_MEMO')
  const [docFile, setDocFile] = useState<File|null>(null)

  // Update
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateBody, setUpdateBody] = useState('')
  const [postingUpdate, setPostingUpdate] = useState(false)
  const [editingUpdateId, setEditingUpdateId] = useState<string|null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [savingUpdate, setSavingUpdate] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string|null>(null)

  // Settings
  const [settingsForm, setSettingsForm] = useState({ name: deal.name, company: deal.company, description: deal.description || '', sector: deal.sector || '', status: deal.status })
  const [savingSettings, setSavingSettings] = useState(false)

  async function uploadDoc(e: React.FormEvent) {
    e.preventDefault()
    if (!docFile) return
    setUploading(true)

    // Step 1: get a presigned URL from our API
    const presignRes = await fetch(`/api/admin/deals/${deal.id}/documents/presign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: docFile.name, contentType: docFile.type || 'application/octet-stream' })
    })
    const { url, key, fileUrl } = await presignRes.json()

    // Step 2: upload directly to R2 (bypasses Vercel's 4.5MB limit)
    await fetch(url, { method: 'PUT', body: docFile, headers: { 'Content-Type': docFile.type || 'application/octet-stream' } })

    // Step 3: record the document in the database
    await fetch(`/api/admin/deals/${deal.id}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: docTitle, type: docType, fileUrl, fileKey: key, fileSize: docFile.size })
    })

    setUploading(false); setDocTitle(''); setDocFile(null)
    setMsg('Document uploaded.'); router.refresh(); setTimeout(() => setMsg(''), 2000)
  }

  async function postUpdate(e: React.FormEvent) {
    e.preventDefault()
    setPostingUpdate(true)
    await fetch(`/api/admin/deals/${deal.id}/updates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: updateTitle, body: updateBody })
    })
    setPostingUpdate(false); setUpdateTitle(''); setUpdateBody('')
    setMsg('Update posted.'); router.refresh(); setTimeout(() => setMsg(''), 2000)
  }

  async function saveUpdate(updateId: string) {
    setSavingUpdate(true)
    await fetch(`/api/admin/deals/${deal.id}/updates`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updateId, title: editTitle, body: editBody })
    })
    setSavingUpdate(false); setEditingUpdateId(null)
    setMsg('Update saved.'); router.refresh(); setTimeout(() => setMsg(''), 2000)
  }

  async function deleteUpdate(updateId: string) {
    await fetch(`/api/admin/deals/${deal.id}/updates`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updateId })
    })
    setConfirmDeleteId(null)
    setMsg('Update deleted.'); router.refresh(); setTimeout(() => setMsg(''), 2000)
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault()
    setSavingSettings(true)
    await fetch(`/api/admin/deals/${deal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingsForm)
    })
    setSavingSettings(false)
    setMsg('Settings saved.'); setTimeout(() => setMsg(''), 2000)
  }

  return (
    <div style={{padding:32,maxWidth:1000,margin:'0 auto'}}>
      <div style={{marginBottom:24}}>
        <a href="/admin/deals" style={{fontSize:13,color:'var(--slate-600)',textDecoration:'none'}}>← Back to deals</a>
      </div>

      <div style={{marginBottom:24}}>
        <span style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.14em',fontSize:11,color:'var(--slate-500)'}}>{deal.sector}</span>
        <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:28,margin:'4px 0 4px'}}>{deal.name}</h1>
        <p style={{fontSize:14,color:'var(--slate-600)',margin:0}}>{deal.company}</p>
      </div>

      {msg && <div style={{background:'var(--gain-bg)',border:'1px solid var(--gain)',borderRadius:6,padding:'10px 14px',marginBottom:16,fontSize:13,color:'var(--gain)'}}>{msg}</div>}

      {/* Tabs */}
      <div style={{display:'flex',borderBottom:'1px solid var(--border)',marginBottom:24}}>
        {(['overview','documents','updates','settings'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'10px 20px',background:'none',border:'none',cursor:'pointer',
            fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14,
            color: tab===t ? 'var(--navy-700)' : 'var(--slate-500)',
            borderBottom: tab===t ? '2px solid var(--navy-600)' : '2px solid transparent',
            marginBottom:-1,textTransform:'capitalize',transition:'all .15s'
          }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:24}}>
            {[
              { label: 'Investors', value: deal.access.length },
              { label: 'Documents', value: deal.documents.length },
              { label: 'Updates', value: deal.updates.length },
            ].map(s => (
              <div key={s.label} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:'20px 24px'}}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:36,fontWeight:500,color:'var(--navy-600)'}}>{s.value}</div>
                <div style={{fontSize:13,color:'var(--slate-600)',marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
              <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Investors in this deal</h3>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'var(--paper)'}}>
                  {['Investor','Invested','Current value','MOIC','DocuSign','Restricted'].map(h => (
                    <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deal.access.length === 0 ? (
                  <tr><td colSpan={6} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No investors yet.</td></tr>
                ) : deal.access.map((a: any, i: number) => {
                  const moic = a.amountInvested && a.currentValue ? (a.currentValue/a.amountInvested).toFixed(2)+'×' : '—'
                  return (
                    <tr key={a.id} style={{borderBottom: i < deal.access.length-1 ? '1px solid var(--border)' : 'none'}}>
                      <td style={{padding:'12px 16px'}}>
                        <div style={{fontWeight:600,fontSize:14}}>{a.user?.name}</div>
                        <div style={{fontSize:11,color:'var(--slate-500)'}}>{a.user?.email}</div>
                      </td>
                      <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{a.amountInvested ? `$${(a.amountInvested/1e6).toFixed(1)}M` : '—'}</td>
                      <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{a.currentValue ? `$${(a.currentValue/1e6).toFixed(1)}M` : '—'}</td>
                      <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{moic}</td>
                      <td style={{padding:'12px 16px',fontSize:13}}>{a.docusignStatus || 'Not started'}</td>
                      <td style={{padding:'12px 16px',fontSize:13}}>{a.isRestricted ? 'Yes' : 'No'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div>
          {/* Upload form */}
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:24,marginBottom:20}}>
            <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:'0 0 20px'}}>Upload document</h3>
            <form onSubmit={uploadDoc}>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>File</label>
                <input type="file" required onChange={e => {
                  const f = e.target.files?.[0] || null
                  setDocFile(f)
                  if (f && !docTitle) setDocTitle(f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '))
                }} style={{fontSize:14,fontFamily:'var(--font-sans)'}} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Title</label>
                  <input value={docTitle} onChange={e => setDocTitle(e.target.value)} required placeholder="Q1 2026 LP Letter"
                    style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}} />
                </div>
                <div>
                  <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Type</label>
                  <select value={docType} onChange={e => setDocType(e.target.value)}
                    style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}}>
                    {DOC_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g,' ')}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={uploading}
                style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'10px 20px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14}}>
                {uploading ? 'Uploading…' : 'Upload'}
              </button>
            </form>
          </div>

          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'var(--paper)'}}>
                  {['Title','Type','Size','Views','Uploaded'].map(h => (
                    <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deal.documents.length === 0 ? (
                  <tr><td colSpan={5} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No documents yet.</td></tr>
                ) : deal.documents.map((d: any, i: number) => (
                  <tr key={d.id} style={{borderBottom: i < deal.documents.length-1 ? '1px solid var(--border)' : 'none'}}>
                    <td style={{padding:'12px 16px',fontWeight:600,fontSize:14}}>
                      <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" style={{color:'var(--navy-600)'}}>{d.title}</a>
                    </td>
                    <td style={{padding:'12px 16px'}}>
                      <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'var(--navy-100)',color:'var(--navy-700)'}}>
                        {d.type.replace(/_/g,' ')}
                      </span>
                    </td>
                    <td style={{padding:'12px 16px',fontSize:13,color:'var(--slate-500)',fontFamily:'var(--font-mono)'}}>{fmtSize(d.fileSize)}</td>
                    <td style={{padding:'12px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{d._count.views}</td>
                    <td style={{padding:'12px 16px',fontSize:13,color:'var(--slate-500)'}}>{new Date(d.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'updates' && (
        <div>
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:24,marginBottom:20}}>
            <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:'0 0 16px'}}>Post an update</h3>
            <form onSubmit={postUpdate}>
              <div style={{marginBottom:12}}>
                <input value={updateTitle} onChange={e => setUpdateTitle(e.target.value)} required placeholder="Update title…"
                  style={{width:'100%',boxSizing:'border-box',padding:'10px 12px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none'}} />
              </div>
              <div style={{marginBottom:16}}>
                <textarea value={updateBody} onChange={e => setUpdateBody(e.target.value)} required rows={5} placeholder="Write your update here…"
                  style={{width:'100%',boxSizing:'border-box',padding:'10px 12px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',outline:'none',resize:'vertical'}} />
              </div>
              <button type="submit" disabled={postingUpdate}
                style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'10px 20px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:14}}>
                {postingUpdate ? 'Posting…' : 'Post update'}
              </button>
            </form>
          </div>

          <div style={{display:'grid',gap:16}}>
            {deal.updates.map((u: any) => (
              <div key={u.id} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:'20px 24px'}}>
                {editingUpdateId === u.id ? (
                  <div>
                    <input value={editTitle} onChange={e => setEditTitle(e.target.value)}
                      style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:15,fontFamily:'var(--font-sans)',marginBottom:10,outline:'none'}} />
                    <textarea value={editBody} onChange={e => setEditBody(e.target.value)} rows={5}
                      style={{width:'100%',boxSizing:'border-box',padding:'9px 11px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)',resize:'vertical',outline:'none',marginBottom:12}} />
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={() => saveUpdate(u.id)} disabled={savingUpdate}
                        style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'8px 16px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13}}>
                        {savingUpdate ? 'Saving…' : 'Save'}
                      </button>
                      <button onClick={() => setEditingUpdateId(null)}
                        style={{background:'none',border:'1px solid var(--border-strong)',borderRadius:6,padding:'8px 16px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:13}}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : confirmDeleteId === u.id ? (
                  <div>
                    <p style={{fontSize:14,color:'var(--slate-700)',marginBottom:14}}>Delete this update? This cannot be undone.</p>
                    <div style={{display:'flex',gap:8}}>
                      <button onClick={() => deleteUpdate(u.id)}
                        style={{background:'#dc2626',color:'#fff',border:'none',borderRadius:6,padding:'8px 16px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:13}}>
                        Delete
                      </button>
                      <button onClick={() => setConfirmDeleteId(null)}
                        style={{background:'none',border:'1px solid var(--border-strong)',borderRadius:6,padding:'8px 16px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:13}}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                      <div style={{fontSize:12,color:'var(--slate-500)'}}>{new Date(u.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
                      <div style={{display:'flex',gap:6}}>
                        <button onClick={() => { setEditingUpdateId(u.id); setEditTitle(u.title); setEditBody(u.body) }}
                          style={{background:'none',border:'1px solid var(--border-strong)',borderRadius:5,padding:'4px 11px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12,color:'var(--slate-600)'}}>
                          Edit
                        </button>
                        <button onClick={() => setConfirmDeleteId(u.id)}
                          style={{background:'none',border:'1px solid #fca5a5',borderRadius:5,padding:'4px 11px',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:12,color:'#dc2626'}}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:18,margin:'0 0 10px'}}>{u.title}</h3>
                    <div style={{fontSize:14,color:'var(--slate-700)',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{u.body}</div>
                  </div>
                )}
              </div>
            ))}
            {deal.updates.length === 0 && <p style={{color:'var(--slate-500)',fontSize:14}}>No updates yet.</p>}
          </div>
        </div>
      )}

      {tab === 'settings' && (
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:32,maxWidth:560}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:'0 0 20px'}}>Deal settings</h3>
          <form onSubmit={saveSettings}>
            {[
              { field: 'name', label: 'Deal name', placeholder: 'JibJab Media' },
              { field: 'company', label: 'Company', placeholder: 'JibJab Bros. Studios' },
              { field: 'sector', label: 'Sector', placeholder: 'Consumer / Media' },
            ].map(({ field, label, placeholder }) => (
              <div key={field} style={{marginBottom:16}}>
                <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>{label}</label>
                <input
                  value={(settingsForm as any)[field]}
                  onChange={e => setSettingsForm(f => ({ ...f, [field]: e.target.value }))}
                  placeholder={placeholder}
                  style={{width:'100%',boxSizing:'border-box',padding:'10px 12px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)',outline:'none'}}
                />
              </div>
            ))}
            <div style={{marginBottom:16}}>
              <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Description</label>
              <textarea
                value={settingsForm.description}
                onChange={e => setSettingsForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
                style={{width:'100%',boxSizing:'border-box',padding:'10px 12px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)',outline:'none',resize:'vertical'}}
              />
            </div>
            <div style={{marginBottom:24}}>
              <label style={{fontSize:12,fontWeight:600,color:'var(--slate-600)',display:'block',marginBottom:6}}>Status</label>
              <select value={settingsForm.status} onChange={e => setSettingsForm(f => ({ ...f, status: e.target.value }))}
                style={{width:'100%',padding:'10px 12px',border:'1px solid var(--border-strong)',borderRadius:6,fontSize:14,fontFamily:'var(--font-sans)'}}>
                <option value="ACTIVE">Active</option>
                <option value="REALIZED">Realized</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <button type="submit" disabled={savingSettings}
              style={{background:'var(--navy-600)',color:'#fff',border:'none',borderRadius:6,padding:'11px 22px',cursor:'pointer',fontFamily:'var(--font-sans)',fontWeight:600,fontSize:15}}>
              {savingSettings ? 'Saving…' : 'Save settings'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
