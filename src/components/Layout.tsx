import { ReactNode } from 'react'
import BottomNav from './BottomNav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
