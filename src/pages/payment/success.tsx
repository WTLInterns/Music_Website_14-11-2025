import Link from 'next/link'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function PaymentSuccess() {
  useEffect(() => {
    const end = Date.now() + 800
    const frame = () => {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a78bfa', '#f472b6', '#facc15', '#60a5fa']
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])
  return (
    <div className="py-16 text-center notes-bg">
      <div className="mx-auto max-w-lg card p-8">
        <div className="text-5xl">🎉</div>
        <h1 className="section-title mt-2">Payment Successful</h1>
        <p className="section-subtitle">Welcome to MusicKatta!</p>
        <Link href="/dashboard" className="btn btn-primary mt-6">Go to Dashboard</Link>
      </div>
    </div>
  )
}
