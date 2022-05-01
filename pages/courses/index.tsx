import React, { FC, useEffect, useState } from 'react'
import { coursesAPI } from '../../api/courses/course.api'
import { ICourseResponse } from '../../api/courses/course.types'
import MainLayout from '../../components/main-layout'

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<ICourseResponse[]>()

  useEffect(() => {
    const getAllCourses = async () => {
      const res = await coursesAPI.getAllCourses()
      setCourses(res.data)
    }
    getAllCourses()
  }, [])

  if (!courses?.length) {
    return <div>No courses</div>
  }

  return (
    <MainLayout title='Courses page'>
      {courses.map((e: ICourseResponse) => <div key={e.title}>{e.title}</div>)}
    </MainLayout>
  )
}

export default CoursesPage
