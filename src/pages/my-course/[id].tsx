import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface CourseVideo {
  id: string
  title: string
  description?: string
  videoUrl?: string
}

export default function MyCoursePage() {
  const router = useRouter()
  const { id } = router.query
  const [videos, setVideos] = useState<CourseVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.ddhavalmulay.com/api/videos/by-course/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch course videos')
        }

        const data = await response.json() as {
          vedios?: { title: string; description?: string; videoUrl?: string; videoId?: string }[]
        }

        if (data.vedios && Array.isArray(data.vedios)) {
          const mapped = data.vedios.map((v, index) => ({
            id: v.videoId || String(index),
            title: v.title || `Lesson ${index + 1}`,
            description: v.description || 'No description available for this lesson.',
            videoUrl: v.videoUrl,
          }))
          setVideos(mapped)
        } else {
          setVideos([])
        }
      } catch (err) {
        setError('Failed to load course videos. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading your course videos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4 text-center">
          <p className="text-red-200 mb-4">{error}</p>
          <button
            onClick={() => router.push('/courses')}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  if (!videos.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4 text-center">
          <p className="text-white mb-4">No videos found for this course yet.</p>
          <button
            onClick={() => router.push('/courses')}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Your Course Videos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => {
                if (typeof id === 'string') {
                  router.push(`/watch?course=${id}&index=${index}`)
                }
              }}
              className="cursor-pointer bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="relative aspect-video bg-black/60 flex items-center justify-center">
                {/* Thumbnail-style area; could be enhanced with real poster frames */}
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white ml-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h2>
                <p className="text-white/70 text-sm line-clamp-3">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
