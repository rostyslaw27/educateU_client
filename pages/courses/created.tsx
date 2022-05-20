import { FC, useState } from 'react'
import MainLayout from '../../components/main-layout'
import { coursesAPI } from '../../api/courses/course.api'
import { getSession } from 'next-auth/react'
import { ICourse } from '../../api/courses/course.types'
import { GetServerSideProps } from 'next'
import CourseItem from '../../components/course/course-item'

type CreatedCoursesPageProps = {
  serverCourses: ICourse[]
}

const CreatedCoursesPage: FC<CreatedCoursesPageProps> = ({ serverCourses }) => {
  const [courses] = useState<ICourse[]>(serverCourses)

  const coursesList = courses.map((course: ICourse) => (
    <CourseItem isOwner key={course.title} course={course} />
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
          No created courses
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Created Courses page">
      <div style={{ padding: '10px 10px' }}>{coursesList}</div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const res = await coursesAPI.getCreatedCourses(session?.user._id)
  return {
    props: {
      serverCourses: res.data,
    },
  }
}

export default CreatedCoursesPage
