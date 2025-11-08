import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addPurchase } from '@/lib/auth'

export default function PaymentPage() {
  const router = useRouter()
  const { course } = router.query

  const handleMockPay = () => {
    // Store purchase locally (demo) and simulate payment success
    if (typeof course === 'string') {
      try { addPurchase(course) } catch {}
    }
    router.push(`/payment/success?course=${course ?? ''}`)
  }

  useEffect(() => {
    // would initialize Stripe/Razorpay here
  }, [])

  return (
    <div className="py-12 max-w-xl">
      <h1 className="section-title">Checkout</h1>
      <p className="section-subtitle mt-2">This is a demo payment screen. Integrate Stripe/Razorpay later.</p>

      <div className="card p-5 mt-6 space-y-4">
        <div>
          <label className="text-sm text-white/70">Name on Card</label>
          <input className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 focus:outline-none" placeholder="John Doe" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="text-sm text-white/70">Card Number</label>
            <input className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" placeholder="4242 4242 4242 4242" />
          </div>
          <div>
            <label className="text-sm text-white/70">CVV</label>
            <input className="mt-1 w-full bg-white/5 border border-white/10 rounded-md px-3 py-2" placeholder="123" />
          </div>
        </div>
        <button onClick={handleMockPay} className="btn btn-primary w-full">Pay Now</button>
      </div>
    </div>
  )
}
