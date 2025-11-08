import Navbar from './Navbar'
import Footer from './Footer'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container-px mx-auto w-full max-w-7xl">{children}</main>
      <Footer />
    </div>
  )
}
