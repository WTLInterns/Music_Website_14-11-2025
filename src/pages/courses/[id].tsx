import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Accordion from '@components/Accordion'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { isLoggedIn } from '@lib/auth'

import { 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaMusic, 
  FaPlay, 
  FaCheck, 
  FaCertificate, 
  FaChalkboardTeacher,
  FaTag,
  FaShoppingCart,
  FaCalendarAlt,
  FaRupeeSign
} from 'react-icons/fa'

// Define the course type to match the backend response
type BackendCourse = {
  courseId: string
  courseName: string
  details: string
  postDate: string
  postTime: string
  price: string // Discounted price
  originalPrice?: string
  discountPercentage?: string
  status: string
  courseImageUrl: string
  courseDuration?: string
  keywords?: string | string[]
}

export default function CourseDetail() {
  const router = useRouter()
  const { id } = router.query
  const [course, setCourse] = useState<BackendCourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [syllabusItems, setSyllabusItems] = useState<{ title: string; content: string }[]>([])

  // Fetch course data from backend
  useEffect(() => {
    if (!id) return

    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8085/course/get-course/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch course details')
        }
        const data = await response.json()
        setCourse(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load course details. Please try again later.')
        setLoading(false)
        console.error('Error fetching course:', err)
      }
    }

    fetchCourse()
  }, [id])

  // Fetch videos for this course and map them to syllabus items
  useEffect(() => {
    if (!id) return

    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8085/api/videos/by-course/${id}`)
        if (!response.ok) {
          return
        }

        const data = await response.json() as { vedios?: { title: string; description?: string }[] }
        if (data.vedios && Array.isArray(data.vedios)) {
          const mapped = data.vedios.map((v, index) => ({
            title: v.title || `Lesson ${index + 1}`,
            content: v.description || 'No description available for this lesson.',
          }))
          setSyllabusItems(mapped)
        }
      } catch (err) {
        // Silently fail; syllabus will simply not show video data
      }
    }

    fetchVideos()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/courses')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg font-bold hover:from-yellow-300 hover:to-orange-400 transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <p className="text-white/80 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/courses')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-lg font-bold hover:from-yellow-300 hover:to-orange-400 transition-all"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  // Calculate pricing information
  const currentPrice = parseFloat(course.price)
  const originalPrice = course.originalPrice ? parseFloat(course.originalPrice) : currentPrice
  const hasDiscount = course.originalPrice && currentPrice < originalPrice
  const discountAmount = hasDiscount ? originalPrice - currentPrice : 0
  const discountPercentage = course.discountPercentage 
    ? parseFloat(course.discountPercentage) 
    : (hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0)

  // Course stats data
  const courseStats = [
    { icon: FaClock, label: 'Duration', value: course.courseDuration || '8 weeks' },
    { icon: FaUsers, label: 'Students', value: '250+' },
    { icon: FaStar, label: 'Rating', value: '4.8' },
    { icon: FaMusic, label: 'Level', value: 'Beginner' }
  ]

  let keywordTags: string[] = ['Beginner Level', 'Music']
  if (Array.isArray(course.keywords)) {
    if (course.keywords.length > 0) {
      keywordTags = course.keywords
    }
  } else if (typeof course.keywords === 'string' && course.keywords.trim().length > 0) {
    keywordTags = course.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
  }

  // Features list
  const features = [
    'Lifetime access to course materials',
    'Certificate of completion',
    'Personalized feedback',
    'Community access',
    'Downloadable resources',
    'Mobile and TV access'
  ]

  // What you'll learn
  const learningPoints = [
    'Master fundamental techniques and theory',
    'Play popular songs and melodies',
    'Develop proper practice habits',
    'Build confidence in performance',
    'Understand musical notation',
    'Improvise and create your own music'
  ]

  const handleBuyNow = () => {
    if (!course) return

    const courseId = course.courseId
    if (!courseId) return

    if (!isLoggedIn()) {
      router.push(`/enroll?course=${courseId}`)
    } else {
      router.push(`/payment?course=${courseId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pb-12">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 rounded-b-3xl overflow-hidden">
        <Image 
          src={course.courseImageUrl || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60'} 
          alt={course.courseName} 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {keywordTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
              {hasDiscount && (
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold animate-pulse">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {course.courseName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher className="w-4 h-4" />
                <span>By Music Katta Instructor</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span>4.8</span>
                <span className="text-white/60">(250+ students)</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="w-4 h-4 text-blue-400" />
                <span>Posted on {course.postDate}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {courseStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>

            {/* About Course */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaMusic className="w-6 h-6 text-yellow-400" />
                About This Course
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                {course.details || 'This comprehensive course will take you from absolute basics to confident playing with practical exercises, engaging lessons, and real-world musical applications.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {learningPoints.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/80">
                        <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-3">Course Features</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-white/80">
                        <FaPlay className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pricing Details Section */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaRupeeSign className="w-6 h-6 text-yellow-400" />
                Course Pricing Details
              </h2>
              <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-xl p-6 border border-yellow-400/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-white/70 mb-1">Original Price</div>
                    <div className="text-2xl font-bold text-white">₹{originalPrice.toFixed(2)}</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-white/70 mb-1">Discounted Price</div>
                    <div className="text-2xl font-bold text-white">₹{currentPrice.toFixed(2)}</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-lg">
                    <div className="text-white/70 mb-1">You Save</div>
                    <div className="text-2xl font-bold text-green-400">₹{discountAmount.toFixed(2)} ({discountPercentage}%)</div>
                  </div>
                </div>
                
                {hasDiscount && (
                  <div className="mt-4 text-center">
                    <div className="inline-block px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm font-semibold border border-red-500/30">
                      Limited Time Offer! Save ₹{discountAmount.toFixed(2)} Today!
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Syllabus */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCertificate className="w-6 h-6 text-yellow-400" />
                Course Syllabus
              </h3>
              {syllabusItems.length > 0 ? (
                <Accordion items={syllabusItems} />
              ) : (
                <p className="text-white/70">
                  Video lessons for this course are coming soon.
                </p>
              )}
            </motion.div>

            {/* Instructor Info */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">About the Instructor</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <FaChalkboardTeacher className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Music Katta Instructor</h4>
                  <p className="text-yellow-400 mb-2">Professional Musician & Educator</p>
                  <p className="text-white/80">
                    With over 10 years of teaching experience and 15+ years of professional performance, 
                    our instructors have helped thousands of students start their musical journey. 
                    Specializing in making complex concepts accessible to beginners.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Fixed Position */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Enrollment Card */}
              <motion.div 
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center mb-6">
                  <div className="flex flex-col items-center justify-center gap-2 mb-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-extrabold text-gray-900">₹{currentPrice.toFixed(2)}</span>
                      {hasDiscount && (
                        <span className="text-gray-700 line-through text-xl">₹{originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block animate-pulse">
                        Save ₹{discountAmount.toFixed(2)} ({discountPercentage}% off)
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleBuyNow}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg mb-4"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>

                  <div className="text-center text-gray-700 text-sm mb-4">
                    <p>30-day money-back guarantee</p>
                    <p>Lifetime access</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Course level:</span>
                      <span className="font-semibold">Beginner</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Duration:</span>
                      <span className="font-semibold">{course.courseDuration || '8 weeks'}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Lessons:</span>
                      <span className="font-semibold">40+</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Certificate:</span>
                      <span className="font-semibold">Included</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Course Includes Card */}
              <motion.div 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FaTag className="w-4 h-4" />
                  This Course Includes
                </h4>
                <ul className="space-y-3">
                  {[
                    '40+ on-demand video lessons',
                    'Downloadable practice materials',
                    'Certificate of completion',
                    'Full lifetime access',
                    'Access on mobile and TV',
                    'Community support'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80 text-sm">
                      <FaCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}