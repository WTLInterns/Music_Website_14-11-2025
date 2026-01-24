// import Link from 'next/link'
// import { useEffect } from 'react'
// import confetti from 'canvas-confetti'
// import { motion } from 'framer-motion'

// export default function PaymentSuccess() {
//   useEffect(() => {
//     const end = Date.now() + 800
//     const frame = () => {
//       confetti({
//         particleCount: 40,
//         spread: 70,
//         origin: { y: 0.6 },
//         colors: ['#a78bfa', '#f472b6', '#facc15', '#60a5fa']
//       })
//       if (Date.now() < end) requestAnimationFrame(frame)
//     }
//     frame()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
//       <motion.div 
//         className="w-full max-w-md"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
//           {/* Animated Celebration Icon */}
//           <motion.div 
//             className="text-6xl mb-6"
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{ 
//               type: "spring",
//               stiffness: 200,
//               damping: 10,
//               delay: 0.2
//             }}
//           >
//             🎉
//           </motion.div>
          
//           {/* Success Title */}
//           <motion.h1 
//             className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//           >
//             Payment Successful!
//           </motion.h1>
          
//           {/* Welcome Message */}
//           <motion.p 
//             className="text-gray-600 text-lg mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.6 }}
//           >
//             Welcome to Muziik Katta! Your musical journey begins now.
//           </motion.p>
          
//           {/* Dashboard Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.6 }}
//           >
//             <Link 
//               href="/dashboard" 
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               <span>Go to Dashboard</span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </Link>
//           </motion.div>

//           {/* Additional Celebration Elements */}
//           <motion.div 
//             className="flex justify-center gap-4 mt-8 text-2xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1, duration: 0.6 }}
//           >
//             <motion.span
//               animate={{ 
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 10, -10, 0]
//               }}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }}
//             >
//               🎵
//             </motion.span>
//             <motion.span
//               animate={{ 
//                 scale: [1, 1.3, 1],
//                 rotate: [0, -15, 15, 0]
//               }}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 0.5
//               }}
//             >
//               🎸
//             </motion.span>
//             <motion.span
//               animate={{ 
//                 scale: [1, 1.4, 1],
//                 rotate: [0, 20, -20, 0]
//               }}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 1
//               }}
//             >
//               🥁
//             </motion.span>
//           </motion.div>
import Link from 'next/link'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function PaymentSuccess() {
  const router = useRouter()
  const { course } = router.query

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

    // Store enrolled course in localStorage
    if (course) {
      localStorage.setItem('enrolledCourse', course as string)
      console.log('Enrolled course stored:', course)
    }
  }, [course])

  useEffect(() => {
    const id = window.setTimeout(() => {
      router.replace('/my-courses')
    }, 1200)

    return () => window.clearTimeout(id)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
          {/* Animated Celebration Icon */}
          <motion.div 
            className="text-6xl mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2
            }}
          >
            🎉
          </motion.div>
          
          {/* Success Title */}
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Payment Successful!
          </motion.h1>
          
          {/* Welcome Message */}
          <motion.p 
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Welcome to Muziik Katta! Your musical journey begins now.
          </motion.p>
          
          {/* Dashboard Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link 
              href="/my-courses" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Go to My Courses</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>

          {/* Additional Celebration Elements */}
          <motion.div 
            className="flex justify-center gap-4 mt-8 text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎵
            </motion.span>
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -15, 15, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            >
              🎸
            </motion.span>
            <motion.span
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 20, -20, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            >
              🥁
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}