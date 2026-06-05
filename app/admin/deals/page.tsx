export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function DealsPage() {
  const deals = await prisma.deal.findMany({
    include: { _count: { select: { access: true, documents: true, updates: true } } },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div style={{padding:32,maxWidth:1100,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:28}}>
        <div>
          <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:30,margin:'0 0 4px'}}>Deals</h1>
          <p style={{fontSize:14,color:'var(--slate-600)',margin:0}}>{deals.length} deal{deals.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/deals/new" style={{background:'var(--navy-600)',color:'#fff',padding:'11px 20px',borderRadius:7,textDecoration:'none',fontWeight:600,fontSize:14}}>
          + New deal
        </Link>
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Deal name','Company','Sector','Status','Investors','Docs','Updates',''].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'12px 16px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deals.map((deal: (typeof deals)[0], i: number) => (
              <tr key={deal.id} style={{borderBottom: i < deals.length-1 ? '1px solid var(--border)' : 'none'}}>
                <td style={{padding:'14px 16px'}}>
                  <div style={{fontWeight:600,fontSize:14}}>{deal.name}</div>
                </td>
                <td style={{padding:'14px 16px',fontSize:14,color:'var(--slate-600)'}}>{deal.company}</td>
                <td style={{padding:'14px 16px',fontSize:13,color:'var(--slate-500)'}}>{deal.sector || '—'}</td>
                <td style={{padding:'14px 16px'}}>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,
                    background:deal.status==='ACTIVE'?'var(--navy-100)':deal.status==='REALIZED'?'var(--gain-bg)':'var(--slate-100)',
                    color:deal.status==='ACTIVE'?'var(--navy-700)':deal.status==='REALIZED'?'var(--gain)':'var(--slate-600)'}}>
                    {deal.status}
                  </span>
                </td>
                <td style={{padding:'14px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{deal._count.access}</td>
                <td style={{padding:'14px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{deal._count.documents}</td>
                <td style={{padding:'14px 16px',fontSize:13,fontFamily:'var(--font-mono)'}}>{deal._count.updates}</td>
                <td style={{padding:'14px 16px',textAlign:'right'}}>
                  <Link href={`/admin/deals/${deal.id}`} style={{fontSize:13,color:'var(--navy-600)',fontWeight:600,textDecoration:'none'}}>Manage →</Link>
                </td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr><td colSpan={8} style={{padding:'32px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No deals yet. <Link href="/admin/deals/new" style={{color:'var(--navy-600)',fontWeight:600}}>Create one</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
