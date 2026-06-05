export const dynamic = 'force-dynamic'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [lpCount, dealCount, docCount, recentViews] = await Promise.all([
    prisma.user.count({ where: { role: 'LP' } }),
    prisma.deal.count(),
    prisma.document.count(),
    prisma.documentView.findMany({ include: { user: true, document: { include: { deal: true } } }, orderBy: { viewedAt: 'desc' }, take: 10 })
  ])

  return (
    <div style={{padding:32,maxWidth:1000,margin:'0 auto'}}>
      <h1 style={{fontFamily:'var(--font-serif)',fontWeight:500,fontSize:30,margin:'0 0 28px'}}>Admin overview</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:32}}>
        {[
          { label: 'Limited partners', value: lpCount, href: '/admin/investors' },
          { label: 'Active deals', value: dealCount, href: '/admin/deals' },
          { label: 'Documents', value: docCount, href: '/admin/deals' },
        ].map(s => (
          <Link key={s.label} href={s.href} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,padding:'20px 24px',textDecoration:'none',display:'block'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:36,fontWeight:500,color:'var(--navy-600)'}}>{s.value}</div>
            <div style={{fontSize:13,color:'var(--slate-600)',marginTop:4}}>{s.label}</div>
          </Link>
        ))}
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <h3 style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:17,margin:0}}>Recent document views</h3>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:'var(--paper)'}}>
              {['Investor','Document','Deal','When'].map(h => (
                <th key={h} style={{fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.1em',fontSize:10,color:'var(--slate-500)',textAlign:'left',padding:'10px 18px',borderBottom:'1px solid var(--border)'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentViews.map((v, i) => (
              <tr key={v.id} style={{borderBottom: i < recentViews.length-1 ? '1px solid var(--border)' : 'none'}}>
                <td style={{padding:'12px 18px',fontWeight:600,fontSize:14}}>{v.user.name}</td>
                <td style={{padding:'12px 18px',fontSize:14,color:'var(--slate-700)'}}>{v.document.title}</td>
                <td style={{padding:'12px 18px',fontSize:14,color:'var(--slate-600)'}}>{v.document.deal.name}</td>
                <td style={{padding:'12px 18px',fontSize:13,color:'var(--slate-500)',fontFamily:'var(--font-mono)'}}>
                  {new Date(v.viewedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {recentViews.length === 0 && (
              <tr><td colSpan={4} style={{padding:'24px 18px',textAlign:'center',color:'var(--slate-500)',fontSize:14}}>No views yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
