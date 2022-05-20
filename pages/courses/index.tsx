import { FC, useState } from 'react'
import { coursesAPI } from '../../api/courses/course.api'
import { ICourse } from '../../api/courses/course.types'
import MainLayout from '../../components/main-layout'
import { GetServerSideProps } from 'next'
import CourseItem from '../../components/course/course-item'

type CoursesPageProps = {
  serverCourses: ICourse[]
}

const CoursesPage: FC<CoursesPageProps> = ({ serverCourses }) => {
  const [courses] = useState<ICourse[]>(serverCourses)

  const coursesList = courses.map((course: ICourse) => (
    <CourseItem key={course.title} course={course} />
  ))

  if (!coursesList.length) {
    return (
      <MainLayout title="Purchased Courses page">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 500,
            marginTop: '100px',
          }}
        >
          No courses
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Courses page">
      <div style={{ padding: '10px 10px' }}>{coursesList}</div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await coursesAPI.getAllCourses()

  return {
    props: {
      serverCourses: res.data,
    },
  }
}

export default CoursesPage
