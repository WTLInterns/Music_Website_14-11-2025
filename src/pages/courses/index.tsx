import CourseCard from '@components/CourseCard'
import { courses } from '@data/courses'

export default function CoursesPage() {
  return (
    <div className="py-12">
      <h1 className="section-title">Courses</h1>
      <p className="section-subtitle mt-2">Choose your track and start learning.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  )
}
