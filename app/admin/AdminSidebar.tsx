'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/contacts', label: 'Contacts', icon: '👤' },
  { href: '/admin/deals', label: 'Deals', icon: '🏢' },
]

export default function AdminSidebar({ user }: { user: any }) {
  const path = usePathname()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/portal/login'
  }

  return (
    <aside style={{width:240,flexShrink:0,background:'var(--navy-900)',color:'var(--fg-on-brand-muted)',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'22px 22px 24px',borderBottom:'1px solid var(--border-on-brand)'}}>
        <img src="/assets/catapult-logo-horizontal-transparent.png" alt="Catapult Capital" style={{height:29,filter:'brightness(0) invert(1)'}} />
        <div style={{fontSize:10,color:'#5E78A0',fontFamily:'var(--font-brand)',textTransform:'uppercase',letterSpacing:'.16em',marginTop:12}}>Admin Portal</div>
      </div>
      <nav style={{padding:'12px 12px',flex:1}}>
        {nav.map(item => (
          <Link key={item.href} href={item.href} style={{
            display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:6,
            fontSize:14,fontWeight:500,textDecoration:'none',marginBottom:2,
            background: (item.href === '/admin' ? path === '/admin' : path.startsWith(item.href)) ? 'var(--navy-600)' : 'transparent',
            color: (item.href === '/admin' ? path === '/admin' : path.startsWith(item.href)) ? '#fff' : 'var(--fg-on-brand-muted)',
            transition:'all .15s'
          }}>
            <span>{item.icon}</span><span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div style={{padding:'14px 16px',borderTop:'1px solid var(--border-on-brand)',display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:32,height:32,borderRadius:'50%',background:'var(--navy-600)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12,color:'#fff',flexShrink:0}}>
          {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0,2)}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:600,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user.name}</div>
          <div style={{fontSize:11,color:'#5E78A0'}}>{user.role}</div>
        </div>
        <button onClick={logout} title="Sign out" style={{background:'none',border:'none',color:'#5E78A0',cursor:'pointer',padding:4,fontSize:16}}>↩</button>
      </div>
    </aside>
  )
}
