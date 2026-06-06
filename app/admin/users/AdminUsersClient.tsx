'use client'
import { useState } from 'react'

const ROLES = ['LP', 'ADMIN', 'SUPER_ADMIN']

export default function AdminUsersClient({ admins, lps, me }: { admins: any[], lps: any[], me: any }) {
  const [msg, setMsg] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  function flash(m: string) { setMsg(m); setTimeout(() => { setMsg(''); window.location.reload() }, 1500) }

  async function changeRole(userId: string, role: string) {
    await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, role }) })
    flash(`Role updated to ${role}.`)
  }

  async function toggleLock(userId: string, isLocked: boolean) {
    await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, isLocked }) })
    flash(isLocked ? 'User locked.' : 'User unlocked.')
  }

  async function deleteUser(userId: string) {
    await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId }) })
    flash('User deleted.')
  }

  const btn = (label: string, onClick: () => void, color = 'var(--navy-600)', danger = false) => (
    <button onClick={onClick} style={{background: danger ? 'none' : 'none', border: `1px solid ${danger ? '#FCA5A5' : 'var(--border)'}`, borderRadius:6, padding:'5px 10px', cursor:'pointer', fontSize:11, fontWeight:600, color: danger ? '#DC2626' : color, fontFamily:'var(--font-sans)'}}>
      {label}
    </button>
  )

  const renderRow = (u: any, i: number, total: number, isAdminTable: boolean) => (
    <tr key={u.id} style={{borderBottom: i < total-1 ? '1px solid var(--border)' : 'none'}}>
      <td style={{padding:'12px 16px'}}>
        <div style={{fontWeight:600,fontSize:14}}>{u.name}</div>
        {u.company && <div style={{fontSize:12,color:'var(--slate-500)'}}>{u.company}</div>}
      </td>
      <td style={{padding:'12px 16px',fontSize:14,color:'var(--slate-600)'}}>{u.email}</td>
      <td style={{padding:'12px 16px'}}>
        <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,
          background:u.role==='SUPER_ADMIN'?'#FEF3C7':u.role==='ADMIN'?'var(--navy-100)':'var(--slate-100)',
          color:u.role==='SUPER_ADMIN'?'#92400E':u.role==='ADMIN'?'var(--navy-700)':'var(--slate-600)'}}>
          {u.role}
        </span>
        {u.isLocked && <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'#FEE2E2',color:'#991B1B',marginLeft:6}}>LOCKED</span>}
      </td>
      <td style={{padding:'12px 16px',textAlign:'right'}}>
        {u.id !== me.id && (
          <div style={{display:'flex',gap:6,justifyContent:'flex-end',alignItems:'center'}}>
            {isAdminTable && (
              <select value={u.role} onChange={e => changeRole(u.id, e.target.value)}
                style={{padding:'4px 8px',border:'1px solid var(--border)',borderRadius:4,fontSize:12,fontFamily:'var(--font-sans)'}}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            )}
            {!isAdminTable && btn('Make admin', () => changeRole(u.id, 'ADMIN'))}
            {btn(u.isLocked ? '🔓 Unlock' : '🔒 Lock', () => toggleLock(u.id, !u.isLocked))}
            {confirmDelete === u.id ? (
              <>
                <button onClick={() => deleteUser(u.id)} style={{background:'#DC2626',color:'#fff',border:'none',borderRadius:6,padding:'5px 10px',cursor:'pointer',fontSize:11,fontWeight:600,fontFamily:'var(--font-sans)'}}>Confirm delete</button>
                <button onClick={() => setConfirmDelete(null)} style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'5px 10px',cursor:'pointer',fontSize:11,fontFamily:'var(--font-sans)'}}>Cancel</button>
              </>
            ) : btn('Delete', () => setConfirmDelete(u.id), '#DC2626', true)}
          </div>
        )}
      </td>
    </tr>
  )

  return (
    <div style={{padding:32,maxWidth:900,margin:'0 auto'}}>
      <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:30,margin:'0 0 28px'}}>Admin users</h1>

      {msg && <div style={{background:'var(--gain-bg)',border:'1px solid var(--gain)',borderRadius:6,padding:'10px 14px',marginBottom:16,fontSize:13,color:'var(--gain)'}}>{msg}</div>}

      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden',marginBottom:24}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Admin & Super Admin users</h3>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Name','Email','Role',''].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins.map((u, i) => renderRow(u, i, admins.length, true))}
          </tbody>
        </table>
      </div>

      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>LP users</h3>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Name','Email','Role',''].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lps.slice(0,50).map((u, i) => renderRow(u, i, Math.min(lps.length,50), false))}
            {lps.length === 0 && (
              <tr><td colSpan={4} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No LPs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
