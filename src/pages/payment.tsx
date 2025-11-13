import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { addPurchase } from '@/lib/auth'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCreditCard, FaLock } from 'react-icons/fa'

export default function PaymentPage() {
  const router = useRouter()
  const { course } = router.query
  const [isProcessing, setIsProcessing] = useState(false)

  const handleMockPay = () => {
    setIsProcessing(true)
    // Store purchase locally (demo) and simulate payment success
    if (typeof course === 'string') {
      try { addPurchase(course) } catch {}
    }
    
    // Simulate payment processing delay
    setTimeout(() => {
      router.push(`/payment/success?course=${course ?? ''}`)
    }, 1500)
  }

  useEffect(() => {
    // would initialize Stripe/Razorpay here
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white min-h-[500px]">
          
          {/* Left Side - Checkout Image */}
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-8">
            <div className="relative z-10 h-full flex flex-col justify-center text-white">
              {/* Security Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FaLock className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Secure Checkout</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Complete Your Purchase
              </h1>
              
              {/* Security Message */}
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Your payment information is encrypted and secure. We use industry-standard security to protect your data.
              </p>

              {/* Checkout Image */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <Image 
                  src="/images/secure_payment.png" 
                  alt="Secure Payment"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
              </div>

              {/* Security Features */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-3 text-blue-100">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">Secure Payment Gateway</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-white p-8 flex flex-col justify-center relative">
            <div className="max-w-md w-full mx-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
                <p className="text-gray-600 text-sm">
                  This is a demo payment screen. No real transaction will occur.
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {/* Name on Card */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="4242 4242 4242 4242"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <div className="w-6 h-4 bg-blue-500 rounded-sm"></div>
                      <div className="w-6 h-4 bg-yellow-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="123"
                    />
                  </div>
                </div>

                {/* Pay Button */}
                <motion.button
                  type="button"
                  onClick={handleMockPay}
                  disabled={isProcessing}
                  className={`w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 ${
                    isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                  whileHover={!isProcessing ? { scale: 1.02 } : {}}
                  whileTap={!isProcessing ? { scale: 0.98 } : {}}
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
                      Pay Now
                    </div>
                  )}
                </motion.button>

                {/* Demo Notice */}
                <div className="text-center">
                  <p className="text-gray-500 text-xs">
                    🔒 Demo payment - No real transaction
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}