import { FC, useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import MainLayout from '../../../components/main-layout'
import { GetServerSideProps } from 'next'
import { ILesson } from '../../../api/lessons/lessons.types'
import { getSession } from 'next-auth/react'
import { lessonsAPI } from '../../../api/lessons/lessons.api'
import { useRouter } from 'next/router'

import styles from '../../../styles/common/common-form.module.scss'

type LessonPropsType = {
  serverLesson: ILesson
}

const EditLesson: FC<LessonPropsType> = ({ serverLesson }) => {
  const [lesson] = useState<ILesson>(serverLesson)
  const router = useRouter()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: lesson.title,
      description: lesson.description,
    },
    onSubmit: async (values) => {
      await lessonsAPI.updateLesson({ _id: lesson._id, ...values })
      router.push(`/lessons/${lesson._id}`)
    },
  })

  return (
    <MainLayout title="Edit Lesson page">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <TextField
            id="title"
            name="title"
            label="Title"
            variant="outlined"
            value={values.title}
            onChange={handleChange}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={values.description}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button name="create" variant="contained" fullWidth type="submit">
            Edit
          </Button>
        </div>
      </form>
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
        destination: `/api/auth/signin?callbackUrl=http://localhost:3000/lessons/${params?.id}/edit`,
        permanent: false,
      },
    }
  }

  const res = await lessonsAPI.getLesson(params?.id)
  return {
    props: {
      serverLesson: res.data,
    },
  }
}

export default EditLesson
