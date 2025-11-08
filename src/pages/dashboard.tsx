import Tabs from '@components/Tabs'
import { useEffect, useMemo, useState } from 'react'
import { getCurrentUser, getUserPurchases } from '@lib/auth'
import { courses } from '@data/courses'
import { FaFilePdf, FaRegStickyNote, FaPlayCircle } from 'react-icons/fa'

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null)
  const [owned, setOwned] = useState<string[]>([])

  useEffect(() => {
    const u = getCurrentUser()
    if (u) {
      setUserId(u.id)
      setOwned(getUserPurchases(u.id))
    }
  }, [])

  const ownedCourses = useMemo(() => courses.filter(c => owned.includes(c.id)), [owned])

  if (!userId) {
    return (
      <div className="py-12">
        <h1 className="section-title">Student Dashboard</h1>
        <p className="section-subtitle mt-2">Please login/register first to view your courses.</p>
        <a href="/enroll" className="btn btn-primary mt-6 inline-flex">Go to Student Login</a>
      </div>
    )
  }

  return (
    <div className="py-12">
      <h1 className="section-title">Your Courses</h1>
      <p className="section-subtitle mt-2">Access your purchased learning materials anytime.</p>

      {ownedCourses.length === 0 && (
        <div className="card p-6 mt-6">No courses yet. Explore our <a className="text-brand-400 underline" href="/courses">catalog</a>.</div>
      )}

      <div className="mt-6 space-y-8">
        {ownedCourses.map(course => (
          <div key={course.id} className="space-y-3">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <Tabs
              tabs={[
                {
                  key: 'videos',
                  label: 'Videos',
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="card p-3 flex items-center gap-3">
                          <FaPlayCircle className="text-neon-blue text-2xl" />
                          <div>
                            <div className="font-semibold">Lesson {i}</div>
                            <div className="text-white/60 text-sm">HD • 10:0{i}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  key: 'pdfs',
                  label: 'PDFs',
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['Chord Charts.pdf', 'Strumming Patterns.pdf', 'Practice Plan.pdf'].map((name, i) => (
                        <div key={i} className="card p-3 flex items-center gap-3">
                          <FaFilePdf className="text-neon-pink text-2xl" />
                          <div className="font-semibold">{name}</div>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  key: 'notes',
                  label: 'Notes',
                  content: (
                    <div className="card p-3 flex items-start gap-3">
                      <FaRegStickyNote className="text-neon-yellow text-2xl" />
                      <div className="text-white/80">Tips: Practice 15 minutes daily using a metronome. Focus on clean chord transitions.</div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
