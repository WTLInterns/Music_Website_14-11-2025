import Image from 'next/image'
import Link from 'next/link'

export type Course = {
  id: string
  title: string
  instructor: string
  price: number
  discountPrice?: number
  image: string
}

export default function CourseCard({ course }: { course: Course }) {
  const price = course.discountPrice ?? course.price
  const hasDiscount = course.discountPrice && course.discountPrice < course.price

  return (
    <div className="card card-hover overflow-hidden group">
      <div className="relative h-48 w-full">
        <Image src={course.image} alt={course.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold drop-shadow">{course.title}</h3>
          <p className="text-white/70 text-sm">By {course.instructor}</p>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-gradient">₹{price}</span>
          {hasDiscount && (
            <span className="text-white/40 line-through text-sm">₹{course.price}</span>
          )}
        </div>
        <Link href={`/courses/${course.id}`} className="btn w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold">Enroll</Link>
      </div>
    </div>
  )
}
