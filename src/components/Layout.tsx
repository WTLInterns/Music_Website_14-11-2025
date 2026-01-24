import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-4 h-4 text-white/10 animate-float text-2xl">♪</div>
        <div className="absolute top-40 right-20 w-4 h-4 text-white/10 animate-bounceIcon text-3xl">♫</div>
        <div className="absolute bottom-40 left-20 w-4 h-4 text-white/10 animate-musicPulse text-2xl">♪</div>
        <div className="absolute bottom-20 right-10 w-4 h-4 text-white/10 animate-wave text-3xl">♫</div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 text-white/10 animate-float text-xl" style={{animationDelay: '1s'}}>♪</div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 text-white/10 animate-bounceIcon text-xl" style={{animationDelay: '2s'}}>♫</div>
      </div>
      
      <Navbar />
      <main className="flex-1 w-full notes-bg relative z-10">{children}</main>
      <Footer />
    </div>
  )
}
