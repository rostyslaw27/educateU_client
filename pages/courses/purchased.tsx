import React, { FC, useState } from 'react'
import MainLayout from '../../components/main-layout'
import { coursesAPI } from '../../api/courses/course.api'
import { getSession } from 'next-auth/react'
import { ICourse } from '../../api/courses/course.types'
import { GetServerSideProps } from 'next'
import CourseItem from '../../components/course/course-item'

type PurchasedCoursesPageProps = {
  serverCourses: ICourse[]
}

const PurchasedCoursesPage: FC<PurchasedCoursesPageProps> = ({
  serverCourses,
}) => {
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
          No purchased courses
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Purchased Courses page">
      <div style={{ padding: '10px 10px' }}>{coursesList}</div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const res = await coursesAPI.getPurchasedCourses(session?.user._id)
  return {
    props: {
      serverCourses: res.data,
    },
  }
}

export default PurchasedCoursesPage
