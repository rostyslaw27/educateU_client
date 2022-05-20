import { FC, useState } from 'react'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import { ILesson } from '../../api/lessons/lessons.types'
import { useSession } from 'next-auth/react'
import { lessonsAPI } from '../../api/lessons/lessons.api'

import styles from '../../styles/lesson/lesson-item.module.scss'

type LessonItemProps = {
  lesson: ILesson
  isCreator: boolean
  isPurchased?: boolean
  isEditable: boolean
  refetchLessons?: Function
}

const LessonItem: FC<LessonItemProps> = ({
  lesson,
  isCreator,
  isPurchased,
  isEditable,
  refetchLessons,
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isClicked, setClicked] = useState<boolean>(false)

  const showDiv = async () => {
    if (session && (isPurchased || isCreator)) {
      router.push(`/lessons/${lesson._id}`)
    } else {
      setClicked((prevIsReplyListShown) => !prevIsReplyListShown)
    }
  }

  const onDelete = async () => {
    await lessonsAPI.deleteLesson(lesson._id)
    refetchLessons?.()
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.title} onClick={showDiv}>
          {lesson.title}
        </div>
        {isCreator && isEditable && (
          <div className={styles.iconsContainer}>
            <IconButton
              onClick={() => router.push(`/lessons/${lesson._id}/edit`)}
            >
              <EditIcon sx={{ pt: 0.5 }} />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon sx={{ pt: 0.5 }} />
            </IconButton>
          </div>
        )}
      </div>
      {isClicked &&
        (!session
          ? 'Log in to see the lesson'
          : isCreator
          ? null
          : isPurchased
          ? null
          : 'Buy this course to see the lesson')}
    </>
  )
}

export default LessonItem
