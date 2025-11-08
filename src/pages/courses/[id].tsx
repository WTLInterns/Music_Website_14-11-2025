import { useRouter } from 'next/router'
import { courses } from '@data/courses'
import Accordion from '@components/Accordion'
import Link from 'next/link'
import Image from 'next/image'

export default function CourseDetail() {
  const router = useRouter()
  const { id } = router.query
  const course = courses.find(c => c.id === id)

  if (!course) return <div className="py-12">Course not found.</div>

  return (
    <div className="pb-12">
      <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mt-6">
        <Image src={course.image} alt={course.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-5 left-6">
          <h1 className="section-title text-3xl md:text-4xl">{course.title}</h1>
          <p className="section-subtitle">By {course.instructor}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-6">
          <div className="card p-5">
            <h2 className="font-bold mb-2">About this course</h2>
            <p className="text-white/80">This course will take you from basics to confident playing with practical exercises and engaging lessons.</p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Syllabus</h3>
            <Accordion items={[
              { title: 'Module 1: Foundations', content: 'Getting started, tuning, posture, first chords.' },
              { title: 'Module 2: Rhythm & Strumming', content: 'Strumming patterns, timing, metronome practice.' },
              { title: 'Module 3: Songs & Performance', content: 'Play-alongs, performance tips, polishing.' },
            ]} />
          </div>
        </div>
        <aside className="space-y-4 md:sticky md:top-20 h-max">
          <div className="card p-5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gradient">₹{course.discountPrice ?? course.price}</span>
              {course.discountPrice && (
                <span className="text-white/40 line-through">₹{course.price}</span>
              )}
            </div>
            <Link href={`/enroll?course=${course.id}`} className="btn w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold mt-4">Enroll Now</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
