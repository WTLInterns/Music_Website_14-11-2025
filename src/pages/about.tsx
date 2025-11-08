import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function About() {
  const [students, setStudents] = useState(0)
  const [classes, setClasses] = useState(0)
  const [courses, setCourses] = useState(0)

  useEffect(() => {
    const animate = (target: number, setter: (n: number) => void, duration = 1200) => {
      const start = Date.now()
      const tick = () => {
        const p = Math.min(1, (Date.now() - start) / duration)
        setter(Math.floor(p * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      tick()
    }
    animate(1000, setStudents)
    animate(50, setClasses, 1000)
    animate(12, setCourses, 900)
  }, [])

  return (
    <div className="py-12 md:py-16 bg-abstract-music bg-cover bg-center rounded-2xl mt-6">
      <div className="container-px mx-auto">
        <h1 className="section-title">About MusicKatta</h1>
        <p className="section-subtitle mt-2 max-w-2xl">Our mission is to make music education accessible, engaging, and fun.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-white/80">
            <p>MusicKatta is a modern music learning platform focused on guitar, ukulele, and core music theory. We believe in learning by doing with consistent feedback and a supportive community.</p>
            <p>Our mentor brings years of experience performing and teaching, shaping a curriculum that meets learners where they are.</p>
          </div>
          <div className="card overflow-hidden">
            <div className="relative h-64 w-full">
              <Image src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&w=1200&q=60" alt="Mentor" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="card p-6 text-center">
            <div className="text-4xl font-extrabold text-gradient">{students}+</div>
            <div className="text-white/70 mt-1">Students</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl font-extrabold text-gradient">{classes}+</div>
            <div className="text-white/70 mt-1">Live Classes</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl font-extrabold text-gradient">{courses}+</div>
            <div className="text-white/70 mt-1">Courses</div>
          </div>
        </div>
      </div>
    </div>
  )
}
