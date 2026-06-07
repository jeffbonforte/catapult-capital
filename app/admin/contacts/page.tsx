export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

const ROLE_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  SUPER_ADMIN: { bg: '#FEF3C7', color: '#92400E', label: 'Super Admin' },
  ADMIN:       { bg: 'var(--navy-100)', color: 'var(--navy-700)', label: 'Admin' },
  LP:          { bg: '#DCFCE7', color: '#166534', label: 'LP' },
  CONTACT:     { bg: 'var(--slate-100)', color: 'var(--slate-700)', label: 'Contact' },
}

export default async function ContactsPage() {
  const contacts = await prisma.user.findMany({
    include: {
      dealAccess: true,
      _count: { select: { docViews: true } }
    },
    orderBy: [{ role: 'asc' }, { name: 'asc' }]
  })

  return (
    <div style={{padding:32,maxWidth:1100,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:28}}>
        <div>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:30,margin:'0 0 4px'}}>Contacts</h1>
          <p style={{fontSize:14,color:'var(--slate-600)',margin:0}}>{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/contacts/new" style={{background:'var(--navy-600)',color:'#fff',padding:'11px 20px',borderRadius:7,textDecoration:'none',fontWeight:600,fontSize:14}}>
          + Add contact
        </Link>
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Name','Email','Role','Deals','Doc views','Last login','Status',''].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => {
              const rs = ROLE_STYLE[c.role] || ROLE_STYLE.CONTACT
              return (
                <tr key={c.id} style={{borderBottom: i < contacts.length-1 ? '1px solid var(--border)' : 'none'}}>
                  <td style={{padding:'14px 16px'}}>
                    <div style={{fontWeight:600,fontSize:14}}>{c.name}</div>
                    {(c as any).company && <div style={{fontSize:11,color:'var(--slate-500)'}}>{(c as any).company}</div>}
                  </td>
                  <td style={{padding:'14px 16px',fontSize:14,color:'var(--slate-600)'}}>{c.email}</td>
                  <td style={{padding:'14px 16px'}}>
                    <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:rs.bg,color:rs.color}}>{rs.label}</span>
                  </td>
                  <td style={{padding:'14px 16px',fontSize:14}}>{c.dealAccess.length}</td>
                  <td style={{padding:'14px 16px',fontFamily:'var(--font-mono)',fontSize:13}}>{c._count.docViews}</td>
                  <td style={{padding:'14px 16px',fontSize:13,color:'var(--slate-500)'}}>{c.lastLoginAt ? new Date(c.lastLoginAt).toLocaleDateString() : 'Never'}</td>
                  <td style={{padding:'14px 16px'}}>
                    {(c as any).isLocked
                      ? <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'#FEE2E2',color:'#991B1B'}}>Locked</span>
                      : <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'var(--navy-50)',color:'var(--navy-600)'}}>Active</span>}
                  </td>
                  <td style={{padding:'14px 16px',textAlign:'right'}}>
                    <Link href={`/admin/contacts/${c.id}`} style={{fontSize:13,color:'var(--navy-600)',fontWeight:600,textDecoration:'none'}}>Manage →</Link>
                  </td>
                </tr>
              )
            })}
            {contacts.length === 0 && (
              <tr><td colSpan={8} style={{padding:'32px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No contacts yet. <Link href="/admin/contacts/new" style={{color:'var(--navy-600)',fontWeight:600}}>Add one</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
