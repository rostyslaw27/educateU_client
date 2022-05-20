import { FC, useState } from 'react'
import MainLayout from '../../../components/main-layout'
import { coursesAPI } from '../../../api/courses/course.api'
import { GetServerSideProps } from 'next'
import { ICourse } from '../../../api/courses/course.types'
import { ILesson } from '../../../api/lessons/lessons.types'
import LessonForm from '../../../components/lesson/lesson-form'
import LessonItem from '../../../components/lesson/lesson-item'
import { getSession, useSession } from 'next-auth/react'
import EditCourseForm from '../../../components/course/edit-course-form'

import styles from '../../../styles/course/course-edit-page.module.scss'

type CoursePropsType = {
  serverCourse: ICourse
}

const EditCourse: FC<CoursePropsType> = ({ serverCourse }) => {
  const [course] = useState<ICourse>(serverCourse)
  const [lessons, setLessons] = useState(serverCourse.lessons)

  const { data: session } = useSession()

  const isCreator = course.createdBy._id === session?.user._id

  const refetchLessons = async () => {
    const res = await coursesAPI.getCourse(course._id)
    setLessons(res.data.lessons)
  }

  const lessonsList = lessons.map((lesson: ILesson) => (
    <LessonItem
      refetchLessons={refetchLessons}
      isEditable
      isCreator={isCreator}
      key={lesson._id}
      lesson={lesson}
    />
  ))

  return (
    <MainLayout title="Edit Course page">
      <div className={styles.root}>
        <div className={styles.formContainer}>
          <EditCourseForm course={course} />
          <LessonForm courseId={course._id} setLessons={setLessons} />
        </div>
        <div className={styles.lessonsContainer}>{lessonsList}</div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=http://localhost:3000/courses/${params?.id}/edit`,
        permanent: false,
      },
    }
  }

  const res = await coursesAPI.getCourse(params?.id)
  return {
    props: {
      serverCourse: res.data,
      session,
    },
  }
}

export default EditCourse
