export const dynamic = 'force-dynamic'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    redirect('/portal/login')
  }
  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden',fontFamily:'var(--font-sans)'}}>
      <AdminSidebar user={user} />
      <main style={{flex:1,overflow:'auto',background:'var(--paper)'}}>
        {children}
      </main>
    </div>
  )
}
