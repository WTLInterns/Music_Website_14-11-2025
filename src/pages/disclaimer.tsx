
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function Disclaimer() {
  return (
    <div className="font-oswald min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
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
                <FaExclamationTriangle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="font-oswald text-4xl md:text-5xl font-black text-white mb-4">Disclaimer</h1>
            <p className="font-oswald text-xl text-white/80 mb-2">Muziik Katta</p>
            <p className="font-oswald text-white/60">Last Updated: January 14, 2025</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg leading-relaxed">
              Muziik Katta provides online guitar education for learning purposes only. Individual progress may vary based on practice and dedication. We do not guarantee specific results. All content is provided “as is” without any warranties.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
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
