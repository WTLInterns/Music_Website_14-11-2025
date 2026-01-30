import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
import { addPurchase } from '@/lib/auth'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCreditCard, FaLock } from 'react-icons/fa'

declare global {
  interface Window {
    Razorpay?: any
  }
}

const RAZORPAY_KEY_ID = 'rzp_live_SA1BO5eO5IVyuT' // Test key; secret must stay on backend

export default function PaymentPage() {
  const router = useRouter()
  const { course } = router.query
  const [isProcessing, setIsProcessing] = useState(false)
  const [isRazorpayReady, setIsRazorpayReady] = useState(false)
  const [hasAutoOpened, setHasAutoOpened] = useState(false)
  const [amountInRupees, setAmountInRupees] = useState<number | null>(null)

  useEffect(() => {
    if (!course || typeof course !== 'string') return

    const fetchPrice = async () => {
      try {
        const res = await fetch(`https://api.ddhavalmulay.com/course/get-course/${course}`)
        if (!res.ok) return
        const data = (await res.json()) as { price?: string | number }
        const raw = typeof data.price === 'number' ? data.price : Number(data.price)
        if (Number.isFinite(raw) && raw > 0) {
          setAmountInRupees(raw)
        }
      } catch {
        // ignore
      }
    }

    void fetchPrice()
  }, [course])

  // Load Razorpay checkout script once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.Razorpay) {
      setIsRazorpayReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => {
      setIsRazorpayReady(true)
    }
    script.onerror = () => {
      setIsRazorpayReady(false)
    }
    document.body.appendChild(script)
  }, [])

  const handlePayWithRazorpay = useCallback(() => {
    if (!course || typeof course !== 'string') return

    if (!isRazorpayReady || typeof window === 'undefined' || !window.Razorpay) {
      return
    }

    if (!amountInRupees || !Number.isFinite(amountInRupees) || amountInRupees <= 0) {
      return
    }

    setIsProcessing(true)

    const amountInPaise = Math.round(amountInRupees * 100)

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise.toString(),
      currency: 'INR',
      name: 'Muziik Katta',
      description: 'Course Purchase',
      // order_id can be passed from backend for real payments
      handler: function (response: any) {
        try {
          addPurchase(course)
        } catch {
          // ignore local purchase storage errors
        }

        router.push('/my-courses')
      },
      prefill: {
        name: '',
        email: '',
      },
      theme: {
        color: '#2563eb',
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false)
        },
      },
    }

    const rzp = new window.Razorpay(options)

    rzp.on('payment.failed', () => {
      setIsProcessing(false)
    })

    rzp.open()
  }, [course, isRazorpayReady, amountInRupees, router])

  // Automatically open Razorpay when arriving on this page from Buy Now
  useEffect(() => {
    if (
      !hasAutoOpened &&
      isRazorpayReady &&
      !isProcessing &&
      course &&
      typeof course === 'string' &&
      amountInRupees != null
    ) {
      setHasAutoOpened(true)
      handlePayWithRazorpay()
    }
  }, [hasAutoOpened, isRazorpayReady, isProcessing, course, amountInRupees, handlePayWithRazorpay])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 font-oswald">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white mr-2">
            <FaLock className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Secure Razorpay Checkout</h1>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Click the button below to complete your course purchase using Razorpay test mode.
        </p>

        <motion.button
          type="button"
          onClick={handlePayWithRazorpay}
          disabled={isProcessing || !isRazorpayReady}
          className={`w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 ${
            isProcessing || !isRazorpayReady
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          whileHover={!isProcessing && isRazorpayReady ? { scale: 1.02 } : {}}
          whileTap={!isProcessing && isRazorpayReady ? { scale: 0.98 } : {}}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <FaCreditCard className="w-4 h-4" />
              Pay with Razorpay
            </div>
          )}
        </motion.button>

        <p className="mt-4 text-gray-500 text-xs">Powered by Razorpay Test Mode</p>
      </div>
    </div>
  )
}