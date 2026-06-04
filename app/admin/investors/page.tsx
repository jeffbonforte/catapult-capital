import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function InvestorsPage() {
  const investors = await prisma.user.findMany({
    where: { role: 'LP' },
    include: {
      dealAccess: { include: { deal: true } },
      _count: { select: { docViews: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{padding:32,maxWidth:1100,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:28}}>
        <div>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:30,margin:'0 0 4px'}}>Investors</h1>
          <p style={{fontSize:14,color:'var(--slate-600)',margin:0}}>{investors.length} limited partner{investors.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/investors/new" style={{background:'var(--navy-600)',color:'#fff',padding:'11px 20px',borderRadius:7,textDecoration:'none',fontWeight:600,fontSize:14}}>
          + Add investor
        </Link>
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Name','Email','Deals','Doc views','Last login','Access',''].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {investors.map((inv, i) => (
              <tr key={inv.id} style={{borderBottom: i < investors.length-1 ? '1px solid var(--border)' : 'none'}}>
                <td style={{padding:'14px 16px'}}>
                  <div style={{fontWeight:600,fontSize:14}}>{inv.name}</div>
                </td>
                <td style={{padding:'14px 16px',fontSize:14,color:'var(--slate-600)'}}>{inv.email}</td>
                <td style={{padding:'14px 16px',fontSize:14}}>{inv.dealAccess.length}</td>
                <td style={{padding:'14px 16px',fontFamily:'var(--font-mono)',fontSize:13}}>{inv._count.docViews}</td>
                <td style={{padding:'14px 16px',fontSize:13,color:'var(--slate-500)'}}>{inv.lastLoginAt ? new Date(inv.lastLoginAt).toLocaleDateString() : 'Never'}</td>
                <td style={{padding:'14px 16px'}}>
                  {inv.dealAccess.every(a => a.isRestricted) && inv.dealAccess.length > 0
                    ? <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'#FEE2E2',color:'#991B1B'}}>Restricted</span>
                    : <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:'var(--navy-100)',color:'var(--navy-700)'}}>Active</span>}
                </td>
                <td style={{padding:'14px 16px',textAlign:'right'}}>
                  <Link href={`/admin/investors/${inv.id}`} style={{fontSize:13,color:'var(--navy-600)',fontWeight:600,textDecoration:'none'}}>Manage →</Link>
                </td>
              </tr>
            ))}
            {investors.length === 0 && (
              <tr><td colSpan={7} style={{padding:'32px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No investors yet. <Link href="/admin/investors/new" style={{color:'var(--navy-600)',fontWeight:600}}>Add one</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
