'use client'
import { useState } from 'react'

const ROLES = ['LP', 'ADMIN', 'SUPER_ADMIN']

export default function AdminUsersClient({ admins, lps, me }: { admins: any[], lps: any[], me: any }) {
  const [msg, setMsg] = useState('')

  async function changeRole(userId: string, role: string) {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role })
    })
    setMsg(`Role updated to ${role}.`)
    setTimeout(() => { setMsg(''); window.location.reload() }, 1000)
  }

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
            {admins.map((u, i) => (
              <tr key={u.id} style={{borderBottom: i < admins.length-1 ? '1px solid var(--border)' : 'none'}}>
                <td style={{padding:'12px 16px',fontWeight:600,fontSize:14}}>{u.name}</td>
                <td style={{padding:'12px 16px',fontSize:14,color:'var(--slate-600)'}}>{u.email}</td>
                <td style={{padding:'12px 16px'}}>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,
                    background:u.role==='SUPER_ADMIN'?'#FEF3C7':u.role==='ADMIN'?'var(--navy-100)':'var(--slate-100)',
                    color:u.role==='SUPER_ADMIN'?'#92400E':u.role==='ADMIN'?'var(--navy-700)':'var(--slate-600)'}}>
                    {u.role}
                  </span>
                </td>
                <td style={{padding:'12px 16px',textAlign:'right'}}>
                  {u.id !== me.id && (
                    <select value={u.role} onChange={e => changeRole(u.id, e.target.value)}
                      style={{padding:'4px 8px',border:'1px solid var(--border)',borderRadius:4,fontSize:12,fontFamily:'var(--font-sans)'}}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Promote LP to admin</h3>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Name','Email',''].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lps.slice(0,20).map((u, i) => (
              <tr key={u.id} style={{borderBottom: i < Math.min(lps.length,20)-1 ? '1px solid var(--border)' : 'none'}}>
                <td style={{padding:'12px 16px',fontWeight:600,fontSize:14}}>{u.name}</td>
                <td style={{padding:'12px 16px',fontSize:14,color:'var(--slate-600)'}}>{u.email}</td>
                <td style={{padding:'12px 16px',textAlign:'right'}}>
                  <button onClick={() => changeRole(u.id, 'ADMIN')}
                    style={{background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 12px',cursor:'pointer',fontSize:12,fontWeight:600,color:'var(--navy-600)',fontFamily:'var(--font-sans)'}}>
                    Make admin
                  </button>
                </td>
              </tr>
            ))}
            {lps.length === 0 && (
              <tr><td colSpan={3} style={{padding:'24px 16px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No LPs to promote.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
