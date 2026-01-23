import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaShieldAlt } from 'react-icons/fa'

export default function PrivacyPolicy() {
  return (
    <div className="font-oswald min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <FaShieldAlt className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="font-oswald text-4xl md:text-5xl font-black text-white mb-4">
              Privacy Policy – Muziik Katta
            </h1>
            <p className="font-oswald text-xl text-white/80 mb-2">Muziik Katta</p>
            <p className="font-oswald text-white/60">Last Updated: January 14, 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg leading-relaxed mb-6">At Muziik Katta, we value your privacy.</p>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              When you enroll in our online guitar courses, we collect basic information such as your name, email address, phone number, and payment details.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              This information is used only to provide course access, process secure payments, communicate important updates, and improve our services.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              All payments are processed through trusted third-party payment gateways, and we do not store any card or banking details.
            </p>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              We do not sell, rent, or share your personal information with third parties except where required to operate our website or comply with legal obligations.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              By using our website, you agree to this Privacy Policy.
            </p>
          </div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Link href="/">
              <button className="font-oswald px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg font-black hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Back to Home
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
