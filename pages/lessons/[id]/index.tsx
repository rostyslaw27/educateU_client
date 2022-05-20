import { GetServerSideProps } from 'next'
import { FC, useState } from 'react'
import MainLayout from '../../../components/main-layout'
import { lessonsAPI } from '../../../api/lessons/lessons.api'
import { ILesson } from '../../../api/lessons/lessons.types'
import { Typography } from '@mui/material'
import QuestionsBlock from '../../../components/question/questions-block'

import styles from '../../../styles/lesson/lesson-page.module.scss'

type LessonPageProps = {
  serverLesson: ILesson
}

const LessonPage: FC<LessonPageProps> = ({ serverLesson }) => {
  const [lesson] = useState<ILesson>(serverLesson)

  return (
    <MainLayout title="Lesson page">
      <div className={styles.root}>
        <div>
          <video className={styles.video} controls>
            <source
              src={process.env.NEXT_PUBLIC_API_URL + lesson.video}
              type="video/mp4"
            />
            No video
          </video>
          <div>
            <Typography className={styles.title}>{lesson.title}</Typography>
            <Typography className={styles.description}>
              {lesson.description}
            </Typography>
          </div>
        </div>
        <div>
          <QuestionsBlock lessonId={lesson._id} />
        </div>
      </div>
    </MainLayout>
  )
}

export default LessonPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await lessonsAPI.getLesson(params?.id)
  return {
    props: {
      serverLesson: res.data,
    },
  }
}
