import CourseCard from '@components/CourseCard'
import { courses } from '@data/courses'
import { motion } from 'framer-motion'
import { FaMusic } from 'react-icons/fa'

export default function CoursesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-gray-100 py-16 px-4 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-blob" style={{animationDelay: '4s'}}></div>
        
        {/* Additional floating musical elements */}
        <div className="absolute top-20 left-20 text-purple-300/40 animate-float text-4xl" style={{animationDelay: '1s'}}>♪</div>
        <div className="absolute top-32 right-32 text-blue-300/40 animate-bounceIcon text-3xl" style={{animationDelay: '2s'}}>♫</div>
        <div className="absolute bottom-32 left-32 text-pink-300/40 animate-swing text-2xl" style={{animationDelay: '3s'}}>♪</div>
        <div className="absolute bottom-20 right-20 text-yellow-300/40 animate-heartbeat text-3xl" style={{animationDelay: '4s'}}>♫</div>
        <div className="absolute top-1/3 left-10 text-green-300/40 animate-wiggle text-xl" style={{animationDelay: '5s'}}>♪</div>
        <div className="absolute bottom-1/3 right-10 text-red-300/40 animate-musicPulse text-2xl" style={{animationDelay: '6s'}}>♫</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 relative overflow-hidden"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
            <FaMusic className="text-white text-2xl" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            Master Your Music Journey <motion.span 
              className='text-red-500 inline-block'
              animate={{ 
                textShadow: [
                  '0 0 5px rgba(239,68,68,0.5)',
                  '0 0 20px rgba(239,68,68,0.8)',
                  '0 0 5px rgba(239,68,68,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >Courses</motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Transform your passion into skill with our expertly crafted courses. 
            From beginner to pro, we've got your musical growth covered.
          </motion.p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="relative group cursor-pointer"
            >
              {/* Enhanced Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl blur-sm group-hover:blur-lg transition-all duration-500 opacity-40 group-hover:opacity-80 animate-pulse group-hover:animate-none"></div>
              
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              
              {/* Course Card Container */}
              <div className="relative bg-white rounded-2xl p-1 h-full shadow-lg group-hover:shadow-2xl transition-all duration-500 hover-lift">
                <div className="relative overflow-hidden rounded-xl">
                  <CourseCard course={course} />
                  
                  {/* Floating music note on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-purple-500 text-xl"
                    >
                      ♫
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}