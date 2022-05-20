import { FC } from 'react'
import { ICourse } from '../../api/courses/course.types'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import styles from '../../styles/course/course-item.module.scss'

type CourseItemProps = {
  course: ICourse
  isOwner?: boolean
}

const CourseItem: FC<CourseItemProps> = ({ course, isOwner }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const isCreator = course.createdBy._id === session?.user._id

  return (
    <div className={styles.root}>
      <div className={styles.courseData}>
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + course.picture}
          alt="img"
          width="30"
          height="30"
        />
        <div
          className={styles.title}
          onClick={() => router.push(`/courses/${course._id}`)}
        >
          {course.title}
        </div>
        <div>{course.price} $</div>
      </div>
      {(isCreator || isOwner) && (
        <IconButton onClick={() => router.push(`/courses/${course._id}/edit`)}>
          <EditIcon sx={{ pt: 0.5 }} />
        </IconButton>
      )}
    </div>
  )
}

export default CourseItem
