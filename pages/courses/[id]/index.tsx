import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'
import { coursesAPI } from '../../../api/courses/course.api'
import { ICourse } from '../../../api/courses/course.types'
import MainLayout from '../../../components/main-layout'
import { Button, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import ResponsesBlock from '../../../components/response/responses-block'
import LessonItem from '../../../components/lesson/lesson-item'
import { useSession } from 'next-auth/react'

import styles from '../../../styles/course/course-page.module.scss'

type CoursePropsType = {
  serverCourse: ICourse
}

const CoursePage: FC<CoursePropsType> = ({ serverCourse }) => {
  const [course, setCourse] = useState<ICourse>(serverCourse)

  const { data: session } = useSession()

  const isPurchased = course.purchasers.some(
    (purchaser) => purchaser._id === session?.user._id
  )

  const isCreator = course.createdBy._id === session?.user._id

  const lessonsList = course.lessons.map((lesson) => (
    <LessonItem
      key={lesson._id}
      isPurchased={isPurchased}
      isCreator={isCreator}
      lesson={lesson}
      isEditable={false}
    />
  ))

  const refetchCourse = async () => {
    const res = await coursesAPI.getCourse(course._id)
    setCourse(res.data)
  }

  const buyCourseHandler = async () => {
    await coursesAPI.buyCourse({
      userId: session!.user._id,
      courseId: course._id,
    })
    refetchCourse()
  }

  return (
    <MainLayout title="Course page">
      <div className={styles.root}>
        <div className={styles.courseInfo}>
          <Typography className={styles.mainTitle}>{course.title}</Typography>
          <Typography className={styles.description}>
            {course.description}
          </Typography>
          <Typography className={styles.rating} component="legend">
            Rating
          </Typography>
          <Rating value={course.rating} readOnly />
          <div className={styles.infoBlock}>
            <Typography className={styles.title}>Author: </Typography>
            <Typography className={styles.text}>
              {course.createdBy.email}
            </Typography>
          </div>
          <div className={styles.infoBlock}>
            <Typography className={styles.title}>Price:</Typography>
            <Typography className={styles.text}>{course.price} $</Typography>
          </div>
          <div className={styles.purchaseInfo}>
            {session ? (
              isCreator ? null : !isPurchased ? (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={buyCourseHandler}
                >
                  Buy a course
                </Button>
              ) : (
                <div>Course is purchased</div>
              )
            ) : (
              <div>Log in to buy this course</div>
            )}
          </div>

          <ResponsesBlock
            isPurchased={isPurchased}
            isCreator={isCreator}
            courseId={course._id}
            refetchCourse={refetchCourse}
          />
        </div>
        <div>
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + course.picture}
            alt="me"
            width="500"
            height="300"
          />
          {lessonsList}
        </div>
      </div>
    </MainLayout>
  )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await coursesAPI.getCourse(params?.id)
  return {
    props: {
      serverCourse: res.data,
    },
  }
}
