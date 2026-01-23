import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { 
  FaClock, 
  FaStar, 
  FaMusic, 
  FaPlay, 
  FaCheck, 
  FaCertificate, 
  FaTag,
  FaShoppingCart,
  FaCalendarAlt,
  FaLock
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
  const [syllabusItems, setSyllabusItems] = useState<{ title: string; content: string; videoUrl?: string }[]>([])
  const [openPreviewIndex, setOpenPreviewIndex] = useState<number | null>(null)
  const [totalVideoSeconds, setTotalVideoSeconds] = useState<number | null>(null)
  const [isDurationCalculating, setIsDurationCalculating] = useState(false)

  // Fetch course data from backend
  useEffect(() => {
    if (!id) return

    const fetchCourse = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.ddhavalmulay.com/course/get-course/${id}`)
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
        const response = await fetch(`https://api.ddhavalmulay.com/api/videos/by-course/${id}`)
        if (!response.ok) {
          return
        }

        const data = await response.json() as { vedios?: { title: string; description?: string; videoUrl?: string }[] }
        if (data.vedios && Array.isArray(data.vedios)) {
          const mapped = data.vedios.map((v, index) => ({
            title: v.title || `Lesson ${index + 1}`,
            content: v.description || 'No description available for this lesson.',
            videoUrl: v.videoUrl,
          }))
          setSyllabusItems(mapped)
        }
      } catch (err) {
        // Silently fail; syllabus will simply not show video data
      }
    }

    fetchVideos()
  }, [id])

  useEffect(() => {
    const urls = syllabusItems
      .map(v => v.videoUrl)
      .filter((u): u is string => typeof u === 'string' && u.trim().length > 0)

    if (!urls.length) {
      setTotalVideoSeconds(null)
      setIsDurationCalculating(false)
      return
    }

    let cancelled = false
    setTotalVideoSeconds(null)
    setIsDurationCalculating(true)

    const loadDuration = (url: string) => {
      return new Promise<number>((resolve) => {
        try {
          const video = document.createElement('video')
          video.preload = 'metadata'
          video.src = url

          const cleanup = () => {
            video.removeAttribute('src')
            video.load()
          }

          video.onloadedmetadata = () => {
            const d = Number.isFinite(video.duration) ? video.duration : 0
            cleanup()
            resolve(d)
          }

          video.onerror = () => {
            cleanup()
            resolve(0)
          }
        } catch {
          resolve(0)
        }
      })
    }

    const calc = async () => {
      const durations = await Promise.all(urls.map(loadDuration))
      const sum = durations.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0)
      if (cancelled) return
      const totalSeconds = Math.floor(sum)
      setTotalVideoSeconds(totalSeconds > 0 ? totalSeconds : null)
      setIsDurationCalculating(false)
    }

    calc()

    return () => {
      cancelled = true
    }
  }, [syllabusItems])

  const formatDuration = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    if (h > 0) return `${h}h ${m}m`
    return `${m}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center font-oswald">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="font-oswald min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
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
      <div className="font-oswald min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <p className="text-white/80 mb-6">The course you&#39;re looking for doesn&#39;t exist or has been removed.</p>
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
    'Certificate on completion of course',
    'Personalized feedback',
    'Community access',
   
    'Mobile and TV access'
  ]

  // What you'll learn
  const learningPoints = [
    'Understanding Guitar Parts , strings and frets',
    'Learning left and right hand exercises',
    'Learning chords and strumming patterns',
    'Learning cool songs',
    'Understanding how to sing with guitar',
    'Beginner friendly techniques',
    'How to plan your practice routine'
  ]

  const aboutCoursePoints = [
    'Lifetime access to videos',
    'Get Certified',
    'Play along video lessons',
    'Designed for absolute beginners with no prior music knowledge',
    'Introduction to parts of the guitar and proper handling.',
    'Correct posture, hand position, and finger exercises',
    'Understanding strings, frets, and basic music terms',
    'Learning basic open chords (major & minor)',
    'Simple strumming patterns and rhythm practice',
    'Basic chord transitions and timing',
    'Playing songs with chords and strumming pattern'
  ]

  const handleBuyNow = () => {
    if (!course) return

    const courseId = course.courseId
    if (!courseId) return

    let loggedIn = false

    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
                    
          if (userData && userData.isLoggedIn) {
            loggedIn = true
          }
        } catch {
          // ignore parse errors and treat as not logged in
        }
      }
    }

    if (!loggedIn) {
      router.push('/login')
    } else {
      router.push(`/payment?course=${courseId}`)
    }
  }

  return (
    <div className="font-oswald min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/courses" className="hover:text-gray-900 transition-colors">Courses</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold line-clamp-1">{course.courseName}</span>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="relative h-52 sm:h-64 md:h-72">
            <Image 
              src={course.courseImageUrl || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60'} 
              alt={course.courseName} 
              fill 
              className="object-cover" 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/10" />

            <div className="absolute bottom-5 left-5 right-5">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {keywordTags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/15">
                      {tag}
                    </span>
                  ))}
                  {hasDiscount && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/80 text-white border border-emerald-400/30">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                  {course.courseName}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    <span>
                      {isDurationCalculating
                        ? 'Calculating…'
                        : (typeof totalVideoSeconds === 'number'
                          ? formatDuration(totalVideoSeconds)
                          : (course.courseDuration || '—'))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>{course.postDate}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="p-5 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2">
                      <FaMusic className="text-purple-600" />
                      Course Overview
                    </h2>
                    <div className="hidden sm:flex items-center gap-3 text-sm text-gray-700">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                        <FaCertificate className="text-emerald-600" />
                        Certificate Included
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {course.details || 'This course will take you from basics to confident playing with structured lessons and practice.'}
                  </p>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                      <div className="text-sm font-black text-gray-900">What you’ll learn</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        {learningPoints.slice(0, 7).map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FaCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                      <div className="text-sm font-black text-gray-900">This course includes</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-700">
                        {features.slice(0, 6).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FaPlay className="w-3.5 h-3.5 text-indigo-600 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h3 className="text-lg md:text-xl font-black text-gray-900">About the course</h3>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {aboutCoursePoints.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-black text-gray-900">Curriculum</h3>
                    <div className="text-sm text-gray-600">Lessons: <span className="font-black text-gray-900">{syllabusItems.length || 0}</span></div>
                  </div>

                  <div className="mt-4">
                    {syllabusItems.length > 0 ? (
                      <div className="space-y-3">
                        {syllabusItems.map((it, idx) => {
                          const title = it.title && it.title.trim().length > 0 ? it.title : `Lesson ${idx + 1}`
                          const isPreview = idx === 0
                          const isOpen = openPreviewIndex === idx

                          if (isPreview) {
                            return (
                              <div key={idx} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                                <button
                                  className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                  onClick={() => setOpenPreviewIndex(isOpen ? null : idx)}
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-100">
                                        <FaPlay className="w-3 h-3" />
                                        Preview • 20 sec
                                      </span>
                                    </div>
                                    <div className="mt-2 font-black text-gray-900 truncate">{title}</div>
                                  </div>

                                  <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className="text-xs font-black text-gray-500">{isOpen ? '−' : '+'}</span>
                                  </div>
                                </button>

                                {isOpen && (
                                  <div className="px-5 pb-5">
                                    <div className="mt-1 rounded-xl overflow-hidden border border-gray-100 bg-black">
                                      <div className="aspect-video">
                                        {it.videoUrl ? (
                                          <video
                                            src={it.videoUrl}
                                            className="w-full h-full"
                                            controls
                                            muted
                                            playsInline
                                            preload="metadata"
                                            onTimeUpdate={(e) => {
                                              const el = e.currentTarget
                                              if (el.currentTime >= 20) {
                                                el.pause()
                                              }
                                            }}
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center bg-black">
                                            <p className="text-gray-300 text-sm font-semibold">Preview video URL not available.</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <p className="mt-3 text-sm text-gray-700 leading-relaxed">{it.content}</p>
                                  </div>
                                )}
                              </div>
                            )
                          }

                          return (
                            <div
                              key={idx}
                              className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 flex items-center justify-between"
                            >
                              <div className="min-w-0">
                                <div className="font-black text-gray-800 truncate">{title}</div>
                                <div className="mt-1 text-xs text-gray-500 font-semibold">Locked • Purchase to unlock</div>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-white border border-gray-200 text-gray-700">—</span>
                                <FaLock className="text-gray-500" />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="rounded-xl border font-black border-gray-100 bg-gray-50 p-4 text-gray-700">
                        Video lessons for this course are coming soon.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                    <div className="p-5 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-sm text-white/80">Price</div>
                          <div className="mt-1 flex items-baseline gap-2">
                            <div className="text-3xl font-black">₹{currentPrice.toFixed(2)}</div>
                            {hasDiscount && (
                              <div className="text-white/80 line-through">₹{originalPrice.toFixed(2)}</div>
                            )}
                          </div>
                        </div>
                        {hasDiscount && (
                          <div className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold">
                            Save ₹{discountAmount.toFixed(2)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleBuyNow}
                        className="mt-4 w-full bg-white text-gray-900 font-black py-3 rounded-xl transition-all duration-300 hover:bg-white/90 flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>

                      <div className="mt-3 text-xs text-white/80">
                        Secure payment • Instant access after purchase
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                          <div className="text-gray-500">Level</div>
                          <div className="font-black text-gray-900">Beginner</div>
                        </div>
                        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                          <div className="text-gray-500">Duration</div>
                          <div className="font-black text-gray-900">
                            {isDurationCalculating
                              ? 'Calculating…'
                              : (typeof totalVideoSeconds === 'number'
                                ? formatDuration(totalVideoSeconds)
                                : (course.courseDuration || '—'))}
                          </div>
                        </div>
                        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                          <div className="text-gray-500">Certificate</div>
                          <div className="font-black text-gray-900">Included</div>
                        </div>
                        <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                          <div className="text-gray-500">Lessons</div>
                          <div className="font-black text-gray-900">{syllabusItems.length || '40+'}</div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-sm font-black text-gray-900 flex items-center gap-2">
                          <FaTag className="text-purple-600" />
                          Included
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                          {[
                            'On-demand video lessons',
                      
                            'Certificate on completion of course',
                            'Full lifetime access',
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <FaCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}