import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

interface CourseVideo {
  id: string
  title: string
  description?: string
  videoUrl?: string
}

type CertificateMeta = {
  fullName: string
  courseName: string
  issuedDate: string
}

export default function WatchPage() {
  const router = useRouter()
  const { course, index } = router.query
  const [videos, setVideos] = useState<CourseVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const pendingSeekSecondsRef = useRef<number | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const [pageReady, setPageReady] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [courseCompletionPercentage, setCourseCompletionPercentage] = useState<number>(0)
  const [courseCompleted, setCourseCompleted] = useState<boolean>(false)
  const [courseTotalSeconds, setCourseTotalSeconds] = useState<number>(0)
  const [courseWatchedSeconds, setCourseWatchedSeconds] = useState<number>(0)
  const [courseRemainingSeconds, setCourseRemainingSeconds] = useState<number>(0)
  const [computedCourseTotalSeconds, setComputedCourseTotalSeconds] = useState<number>(0)
  const [autoPlayNext, setAutoPlayNext] = useState<boolean>(true)

  const [courseName, setCourseName] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [certificateIssuedDate, setCertificateIssuedDate] = useState<string>('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  
  const shouldAutoPlayRef = useRef<boolean>(false)
  const lastTrackedTimeRef = useRef<number>(0)
  const lastUpdateAtRef = useRef<number>(0)

  // Security effects
  useEffect(() => {
    // Allow browser to settle after refresh
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pageReady) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") ||
        (e.ctrlKey && e.key.toLowerCase() === "s") ||
        e.key === "PrintScreen"
      ) {
        e.preventDefault();
        setIsBlocked(true);
        setShowWarning(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.pause();
        }
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setIsBlocked(true);
      setShowWarning(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    };

    const handleVisibilityChange = () => {
      if (!pageReady) return;
      if (document.hidden) {
        setIsBlocked(true);
        setShowWarning(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.pause();
        }
      }
    };

    const handleBlur = () => {
      if (!pageReady) return;
      setIsBlocked(true);
      setShowWarning(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [pageReady]);

  const selectedIndex = typeof index === 'string' ? Math.max(0, parseInt(index, 10) || 0) : 0

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    try {
      const parsed = JSON.parse(storedUser)
      const name = typeof parsed?.name === 'string' ? parsed.name : ''
      if (name) setFullName(name)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!course || typeof course !== 'string') return

    const fetchCourseName = async () => {
      try {
        const res = await fetch(`https://api.ddhavalmulay.com/course/get-course/${course}`)
        if (!res.ok) return
        const data = (await res.json()) as { courseName?: string }
        if (typeof data.courseName === 'string') {
          setCourseName(data.courseName)
        }
      } catch {
        // ignore
      }
    }

    fetchCourseName()
  }, [course])

  useEffect(() => {
    if (!course || typeof course !== 'string') return

    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.ddhavalmulay.com/api/videos/by-course/${course}`)
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
  }, [course])

  useEffect(() => {
    if (!videos.length) return

    if (typeof window === 'undefined') return

    const storedUser = localStorage.getItem('user')
    if (!storedUser) return

    let email: string | null = null
    try {
      const parsed = JSON.parse(storedUser)
      email = parsed.email || null
    } catch {
      return
    }

    if (!email) return
    setUserEmail(email)

    const currentIndex = Math.min(selectedIndex, videos.length - 1)
    const video = videos[currentIndex]
    if (!video || !video.id) return

    const fetchProgress = async () => {
      try {
        const res = await fetch(
          `https://api.ddhavalmulay.com/api/video-progress/get?email=${encodeURIComponent(
            email as string
          )}&videoId=${encodeURIComponent(video.id)}`
        )
        if (!res.ok) return
        const data = (await res.json()) as { lastPositionSeconds?: number | null }
        if (data.lastPositionSeconds != null) {
          pendingSeekSecondsRef.current = data.lastPositionSeconds
        }
      } catch (err) {
        console.error('Failed to load video progress', err)
      }
      
    }

    fetchProgress()
  }, [videos, selectedIndex])

  useEffect(() => {
    lastTrackedTimeRef.current = 0
    lastUpdateAtRef.current = 0
    pendingSeekSecondsRef.current = null
  }, [selectedIndex, videos])

  useEffect(() => {
    if (!videos.length) {
      setComputedCourseTotalSeconds(0)
      return
    }

    let cancelled = false

    const loadDurationSeconds = (url: string) =>
      new Promise<number>((resolve) => {
        const v = document.createElement('video')
        v.preload = 'metadata'
        v.src = url

        const cleanup = () => {
          v.removeEventListener('loadedmetadata', onLoaded)
          v.removeEventListener('error', onError)
          v.src = ''
        }

        const onLoaded = () => {
          const d = Number(v.duration)
          cleanup()
          resolve(Number.isFinite(d) && d > 0 ? d : 0)
        }

        const onError = () => {
          cleanup()
          resolve(0)
        }

        v.addEventListener('loadedmetadata', onLoaded)
        v.addEventListener('error', onError)
      })

    const compute = async () => {
      const urls = videos.map((x) => x.videoUrl).filter((u): u is string => typeof u === 'string' && u.length > 0)
      if (!urls.length) {
        setComputedCourseTotalSeconds(0)
        return
      }

      const durations = await Promise.all(urls.map(loadDurationSeconds))
      if (cancelled) return
      const total = durations.reduce((acc, s) => acc + (Number.isFinite(s) ? s : 0), 0)
      setComputedCourseTotalSeconds(Number.isFinite(total) ? total : 0)
    }

    void compute()

    return () => {
      cancelled = true
    }
  }, [videos])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = playbackRate
  }, [playbackRate])

  const fetchCourseCompletion = async (email: string, courseId: string) => {
    try {
      const res = await fetch(
        `https://api.ddhavalmulay.com/api/video-progress/course-time-completion?email=${encodeURIComponent(
          email
        )}&courseId=${encodeURIComponent(courseId)}`
      )

      if (!res.ok) return

      const data = (await res.json()) as {
        totalDurationSeconds?: number
        watchedSeconds?: number
        remainingSeconds?: number
        completionPercentage?: number
        completed?: boolean
      }

      const percentage = typeof data.completionPercentage === 'number' ? data.completionPercentage : 0
      setCourseCompletionPercentage(Number.isFinite(percentage) ? percentage : 0)
      setCourseCompleted(Boolean(data.completed))
      setCourseTotalSeconds(typeof data.totalDurationSeconds === 'number' ? data.totalDurationSeconds : 0)
      setCourseWatchedSeconds(typeof data.watchedSeconds === 'number' ? data.watchedSeconds : 0)
      setCourseRemainingSeconds(typeof data.remainingSeconds === 'number' ? data.remainingSeconds : 0)
    } catch (err) {
      console.error('Failed to load course completion', err)
    }
  }

  useEffect(() => {
    if (!courseCompleted) return
    if (!userEmail) return
    if (!course || typeof course !== 'string') return
    if (typeof window === 'undefined') return

    const storageKey = `certificateIssuedAt:${userEmail}:${course}`
    const existing = localStorage.getItem(storageKey)
    if (existing) {
      setCertificateIssuedDate(existing)
      return
    }

    const nowIso = new Date().toISOString()
    localStorage.setItem(storageKey, nowIso)
    setCertificateIssuedDate(nowIso)
  }, [courseCompleted, userEmail, course])

  const formatIssuedDate = (iso: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })

  const renderCertificateToCanvas = async (meta: CertificateMeta) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bg = await loadImage('/images/acheivement/certificateimage.jpg')
    const sign = await loadImage('/images/acheivement/sign.png')

    const w = bg.naturalWidth || 1200
    const h = bg.naturalHeight || 800

    canvas.width = w
    canvas.height = h

    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(bg, 0, 0, w, h)

    const setFont = (px: number, weight: 'normal' | 'bold' = 'normal') => {
      ctx.font = `${weight} ${Math.max(10, Math.round(px))}px Georgia, serif`
    }

    const drawFittedText = (opts: {
      text: string
      x: number
      y: number
      maxWidth: number
      baseFontPx: number
      minFontPx: number
      color: string
      align: CanvasTextAlign
      weight?: 'normal' | 'bold'
    }) => {
      const { text, x, y, maxWidth, baseFontPx, minFontPx, color, align, weight = 'normal' } = opts
      ctx.save()
      ctx.textAlign = align
      ctx.textBaseline = 'middle'
      ctx.fillStyle = color

      let fontPx = baseFontPx
      setFont(fontPx, weight)
      while (fontPx > minFontPx && ctx.measureText(text).width > maxWidth) {
        fontPx -= 1
        setFont(fontPx, weight)
      }

      ctx.fillText(text, x, y)
      ctx.restore()
    }

    // Template-aligned coordinates (relative to background)
    // 1) Name: centered on the first underline
    const nameX = w * 0.5
    const nameY = h * 0.360
    const nameMaxW = w * 0.20
    drawFittedText({
      text: meta.fullName || 'Student',
      x: nameX,
      y: nameY,
      maxWidth: nameMaxW,
      baseFontPx: w * 0.042,
      minFontPx: w * 0.018,
      color: '#111111',
      align: 'center',
      weight: 'bold',
    })

    // 2) Course: placed on the underline after "Basic Course of"
    const courseX = w * 0.510
    const courseY = h * 0.480
    const courseMaxW = w * 0.19
    drawFittedText({
      text: meta.courseName || 'Course',
      x: courseX,
      y: courseY,
      maxWidth: courseMaxW,
      baseFontPx: w * 0.026,
      minFontPx: w * 0.012,
      color: '#111111',
      align: 'left',
      weight: 'normal',
    })

    // 3) Date: on left signature line (after the "Date" label)
    const dateX = w * 0.255
    const dateY = h * 0.680
    const dateMaxW = w * 0.09
    drawFittedText({
      text: meta.issuedDate || '',
      x: dateX,
      y: dateY,
      maxWidth: dateMaxW,
      baseFontPx: w * 0.09,
      minFontPx: w * 0.012,
      color: '#111111',
      align: 'left',
      weight: 'normal',
    })

    // 4) Signature: on right signature line, remove black background pixels
    const signTargetW = w * 0.12
    const signTargetH = (signTargetW / (sign.naturalWidth || 1)) * (sign.naturalHeight || 1)
    const signX = w * 0.64
    const signY = h * 0.645

    const off = document.createElement('canvas')
    off.width = sign.naturalWidth || 1
    off.height = sign.naturalHeight || 1
    const offCtx = off.getContext('2d')
    if (offCtx) {
      offCtx.drawImage(sign, 0, 0)
      const imgData = offCtx.getImageData(0, 0, off.width, off.height)
      const data = imgData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        // Treat near-black as transparent
        if (r < 25 && g < 25 && b < 25) {
          data[i + 3] = 0
        }
      }
      offCtx.putImageData(imgData, 0, 0)
      ctx.drawImage(off, signX, signY, signTargetW, signTargetH)
    } else {
      ctx.drawImage(sign, signX, signY, signTargetW, signTargetH)
    }
  }

  const downloadCertificate = async () => {
    if (!courseCompleted) {
      alert('Certificate is locked. Complete the course 100% to unlock.')
      return
    }
    if (!canvasRef.current) return

    const meta: CertificateMeta = {
      fullName: fullName || 'Student',
      courseName: courseName || 'Music Course',
      issuedDate: formatIssuedDate(certificateIssuedDate) || formatIssuedDate(new Date().toISOString()),
    }

    try {
      await renderCertificateToCanvas(meta)
      const link = document.createElement('a')
      link.download = `${(fullName || 'certificate').replace(/\s+/g, '_')}_${Date.now()}.png`
      link.href = canvasRef.current.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch {
      alert('Failed to generate certificate. Please try again.')
    }
  }

  const trackWatchTime = async (currentTime: number, duration: number) => {
    if (!userEmail) return
    if (!videos.length) return

    const now = Date.now()
    if (now - lastUpdateAtRef.current < 1500) {
      return
    }

    const currentIndex = Math.min(selectedIndex, videos.length - 1)
    const video = videos[currentIndex]
    if (!video || !video.id) return

    const prev = lastTrackedTimeRef.current
    let delta = currentTime - prev

    if (!Number.isFinite(delta) || delta < 0) {
      delta = 0
    }

    if (delta > 5) {
      delta = 0
    }

    lastTrackedTimeRef.current = currentTime
    lastUpdateAtRef.current = now

    if (delta <= 0) return

    try {
      await fetch('https://api.ddhavalmulay.com/api/video-progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          videoId: video.id,
          currentTime,
          duration,
          watchedDeltaSeconds: delta,
          completed: false,
        }),
      })
    } catch (err) {
      console.error('Failed to track watched time', err)
    }
  }

  useEffect(() => {
    if (!userEmail) return
    if (!course || typeof course !== 'string') return
    fetchCourseCompletion(userEmail, course)
  }, [userEmail, course, videos.length])

  const goToVideoIndex = async (nextIndex: number, shouldAutoPlay: boolean) => {
    if (!course || typeof course !== 'string') return
    if (!videos.length) return
    const clamped = Math.max(0, Math.min(videos.length - 1, nextIndex))
    shouldAutoPlayRef.current = shouldAutoPlay
    await router.push(`/watch?course=${course}&index=${clamped}`)
  }

  const seekBySeconds = (deltaSeconds: number) => {
    const v = videoRef.current
    if (!v) return
    const nextTime = Math.max(0, Math.min(v.duration || Number.POSITIVE_INFINITY, v.currentTime + deltaSeconds))
    v.currentTime = nextTime
    lastTrackedTimeRef.current = nextTime
    lastUpdateAtRef.current = 0
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (!autoPlayNext) {
      shouldAutoPlayRef.current = false
      return
    }


    const currentIndex = Math.min(selectedIndex, videos.length - 1)
    const currentUrl = videos[currentIndex]?.videoUrl
    if (!currentUrl) {
      shouldAutoPlayRef.current = false
      return
    }

    if (!shouldAutoPlayRef.current) return

    const tryPlay = async () => {
      try {
        await v.play()
      } catch {
      } finally {
        shouldAutoPlayRef.current = false
      }
    }

    if (v.readyState >= 2) {
      void tryPlay()
      return
    }

    const onCanPlay = () => {
      v.removeEventListener('canplay', onCanPlay)
      void tryPlay()
    }
    v.addEventListener('canplay', onCanPlay)

    return () => {
      v.removeEventListener('canplay', onCanPlay)
    }
  }, [selectedIndex, videos, autoPlayNext])

  const saveProgress = async (currentTime: number, duration: number, completed: boolean) => {
    if (!userEmail) return
    if (!videos.length) return

    const currentIndex = Math.min(selectedIndex, videos.length - 1)
    const video = videos[currentIndex]
    if (!video || !video.id) return

    try {
      await fetch('https://api.ddhavalmulay.com/api/video-progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          videoId: video.id,
          currentTime,
          duration,
          watchedDeltaSeconds: 0,
          completed,
        }),
      })

      if (course && typeof course === 'string') {
        fetchCourseCompletion(userEmail, course)
      }
    } catch (err) {
      console.error('Failed to save video progress', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen font-oswald flex items-center justify-center bg-gray-900">
        <p className="text-white text-lg">Loading video...</p>
      </div>
    )
  }

  if (error || !videos.length) {
    return (
      <div className="font-oswald min-h-screen flex items-center justify-center bg-gray-900 font-oswald">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4 text-center">
          <p className="text-red-200 mb-4">{error || 'No videos found for this course.'}</p>
          <button
            onClick={() => router.push(course && typeof course === 'string' ? `/my-course/${course}` : '/courses')}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
          >
            Back to Course
          </button>
        </div>
      </div>
    )
  }

  const clampedIndex = Math.min(selectedIndex, videos.length - 1)
  const currentVideo = videos[clampedIndex]
  const roundedCompletion = Math.max(0, Math.min(100, Math.round(courseCompletionPercentage)))
  const displayCourseTotalSeconds = computedCourseTotalSeconds > 0 ? computedCourseTotalSeconds : courseTotalSeconds
  const displayCourseRemainingSeconds = Math.max(0, displayCourseTotalSeconds - courseWatchedSeconds)
  const hasPrev = clampedIndex > 0
  const hasNext = clampedIndex < videos.length - 1

  // Format time
  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds || 0))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}h ${m}m`
    if (m > 0) return `${m}m ${sec}s`
    return `${sec}s`
  }
  
  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const t = videoRef.current.currentTime
      const d = videoRef.current.duration
      setCurrentTime(t)
      setDuration(d)
      if (!videoRef.current.paused && !videoRef.current.seeking) {
        void trackWatchTime(t, d || 0)
      }
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout((window as any).controlsTimeout);
    (window as any).controlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  return (
    <>
      {/* Warning Message */}
      {showWarning && (
        <div 
          id="warning"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "red",
            color: "white",
            padding: "10px 18px",
            borderRadius: "5px",
            zIndex: 9999,
            fontWeight: "bold",
            display: "block"
          }}
        >
          ⚠ Screen recording or screenshot detected
        </div>
      )}
      
      <div className={`min-h-screen bg-gray-900 text-white ${isBlocked ? 'blur' : ''}`} id="content">
        {/* Top Navigation Bar */}
        <div className="font-oswald bg-gray-900 border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Back</span>
            </button>
            <h1 className="font-oswald text-xl font-bold truncate max-w-md">{currentVideo.title}</h1>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
        </div>
        
        <div className="font-oswald max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
          {/* Main video player */}
          <div className="lg:col-span-2">
            <div className="mb-4 rounded-xl bg-gray-800 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-300">Course completion</p>
                  <p className="text-lg font-bold">{roundedCompletion}%</p>
                  <p className="text-xs text-gray-300">
                    Watched {formatTime(courseWatchedSeconds)} / {formatTime(displayCourseTotalSeconds)}
                  </p>
                  <p className="text-xs text-gray-300">Remaining: {formatTime(displayCourseRemainingSeconds)}</p>
                </div>
                <div className="w-44">
                  <div className="h-2 w-full rounded-full bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{ width: `${roundedCompletion}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden relative" onMouseMove={handleMouseMove}>
                {currentVideo.videoUrl ? (
                  <video
                    ref={videoRef}
                    src={currentVideo.videoUrl}
                    className="w-full h-full bg-black"
                    onClick={togglePlayPause}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={(e) => {
                      const duration = e.currentTarget.duration || 0
                      e.currentTarget.playbackRate = playbackRate

                      const pending = pendingSeekSecondsRef.current
                      if (pending != null && Number.isFinite(pending) && pending > 0) {
                        const safe = Math.max(0, Math.min(duration || Number.POSITIVE_INFINITY, pending))
                        e.currentTarget.currentTime = safe
                        pendingSeekSecondsRef.current = null
                      }

                      lastTrackedTimeRef.current = e.currentTarget.currentTime || 0
                      void trackWatchTime(e.currentTarget.currentTime || 0, duration)
                    }}
                    onPlay={() => {
                      setIsPlaying(true)
                    }}
                    onPause={(e) => {
                      setIsPlaying(false)
                      saveProgress(
                        e.currentTarget.currentTime,
                        e.currentTarget.duration || 0,
                        false
                      )
                    }}
                    onSeeking={(e) => {
                      lastTrackedTimeRef.current = e.currentTarget.currentTime
                      lastUpdateAtRef.current = 0
                    }}
                    onEnded={(e) => {
                      const duration = e.currentTarget.duration || e.currentTarget.currentTime
                      saveProgress(duration, duration, true)

                      setIsPlaying(false)

                      if (autoPlayNext && clampedIndex < videos.length - 1) {
                        shouldAutoPlayRef.current = true
                        void goToVideoIndex(clampedIndex + 1, true)
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/80">
                    <p className="text-gray-400">Video URL not available.</p>
                  </div>
                )}
                
                {/* Custom video controls overlay */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 ${showControls ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  {/* Progress bar */}
                  <div className="h-1 bg-gray-600 rounded mb-3">
                    <div 
                      className="h-1 bg-yellow-500 rounded"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button onClick={togglePlayPause} className="text-white hover:text-gray-300">
                        {isPlaying ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          </svg>
                        )}
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button onClick={toggleMute} className="text-white hover:text-gray-300">
                          {isMuted || volume === 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                          ) : volume > 0.5 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 100 12 9 9 0 000-12zm0 0V3m0 18v-3" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 100 12 9 9 0 000-12zm0 0V3m0 18v-3" />
                            </svg>
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 accent-yellow-500"
                        />
                      </div>
                      
                      <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Time seek buttons */}
                      <button 
                        onClick={() => seekBySeconds(-10)}
                        className="text-white hover:text-gray-300"
                        title="Seek -10 seconds"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => seekBySeconds(10)}
                        className="text-white hover:text-gray-300"
                        title="Seek +10 seconds"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                        </svg>
                      </button>
                      
                      {/* Navigation buttons */}
                      <button
                        onClick={() => goToVideoIndex(clampedIndex - 1, true)}
                        disabled={!hasPrev}
                        className={`text-white ${hasPrev ? 'hover:text-gray-300' : 'opacity-40 cursor-not-allowed'}`}
                        title="Previous video"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => goToVideoIndex(clampedIndex + 1, true)}
                        disabled={!hasNext}
                        className={`text-white ${hasNext ? 'hover:text-gray-300' : 'opacity-40 cursor-not-allowed'}`}
                        title="Next video"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      {/* Autoplay toggle */}
                      <label className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={autoPlayNext}
                          onChange={(e) => setAutoPlayNext(e.target.checked)}
                          className="rounded"
                        />
                        <span>Autoplay</span>
                      </label>

                      <select
                        value={playbackRate}
                        onChange={(e) => {
                          const next = Number(e.target.value)
                          setPlaybackRate(Number.isFinite(next) && next > 0 ? next : 1)
                        }}
                        className="bg-gray-800 border border-gray-600 text-white text-sm rounded px-2 py-1"
                        title="Playback speed"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                      
                      {/* Fullscreen button */}
                      <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="mt-4">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  {currentVideo.title}
                </h1>
                
                <p className="text-gray-300 text-sm whitespace-pre-line">
                  {currentVideo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Playlist / other videos */}
          <div className="lg:col-span-1">
            <div className="sticky top-0 bg-gray-900 py-2 z-10 mb-3">
              <h2 className="text-lg font-semibold">Course Content</h2>
              <div className="mt-2 text-xs text-gray-400">
                {videos.length} lessons • {Math.ceil(courseTotalSeconds / 60)} min
              </div>
            </div>
            
            <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
              {videos.map((video, i) => {
                // Calculate progress for each video if possible
                const isCurrent = i === clampedIndex;
                const isCompleted = false; // Placeholder - would need actual progress data per video
                
                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      if (typeof course === 'string') {
                        router.push(`/watch?course=${course}&index=${i}`)
                      }
                    }}
                    className={`w-full group flex gap-3 rounded-xl p-3 text-left transition-all duration-200 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-yellow-500/50 shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-750 border border-transparent'
                    }`}
                  >
                    <div className="flex-shrink-0 relative">
                      <div className={`w-12 h-8 rounded flex items-center justify-center ${
                        isCurrent 
                          ? 'bg-yellow-500/20' 
                          : 'bg-black/70 group-hover:bg-black/50'
                      }`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-4 h-4 ${
                            isCurrent ? 'text-yellow-400' : 'text-white'
                          }`}
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center text-[8px]">
                        {i + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isCurrent ? 'text-yellow-400' : 'text-white'} line-clamp-1`}>
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                            {video.description || 'No description available'}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0 ml-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-green-500/20 text-green-400' 
                              : isCurrent
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-gray-700 text-gray-400'
                          }`}>
                            {isCompleted ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : isCurrent ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-xs">{i + 1}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="mt-2">
                        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                            style={{ width: '0%' }} // Would connect to actual progress
                          ></div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl bg-gray-800 p-4">
              <h3 className="text-base font-semibold mb-3">Course Completion</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{roundedCompletion}%</span>
                </div>
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300"
                    style={{ width: `${roundedCompletion}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatTime(courseWatchedSeconds)} / {formatTime(displayCourseTotalSeconds)}
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium mb-2">Certificate</h4>
                <p className="text-xs text-gray-300 mb-4">
                  Complete the course to unlock your certificate.
                </p>
                
                <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 p-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"></div>
                  <div className="relative text-center">
                    <div className="inline-block p-1 rounded-full bg-gray-700 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h5 className="font-bold text-gray-200">Certificate on completion of course</h5>
                    <p className="text-xs text-gray-400 mt-1">Muziik Katta</p>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    if (!courseCompleted) {
                      e.preventDefault()
                      alert('Certificate is locked. Complete the course 100% to download.')
                    } else {
                      downloadCertificate()
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    courseCompleted
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 hover:from-yellow-400 hover:to-yellow-500 shadow-lg shadow-yellow-500/20'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!courseCompleted}
                >
                  {courseCompleted ? 'Download Certificate' : 'Complete Course to Unlock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      <style jsx>{`
        .blur {
          filter: blur(12px);
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
