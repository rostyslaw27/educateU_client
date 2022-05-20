import { FC, useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import MainLayout from '../../components/main-layout'
import { coursesAPI } from '../../api/courses/course.api'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import FileUpload from '../../components/file-upload'
import useAuth from '../../hooks/useAuth'

import styles from '../../styles/common/common-form.module.scss'

const CreateCourse: FC = () => {
  const isAuth = useAuth(false)
  const [picture, setPicture] = useState<Blob | null>(null)

  const { data: session } = useSession()
  const router = useRouter()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('price', values.price)
      formData.append('createdBy', session!.user._id)
      formData.append('picture', picture!)

      await coursesAPI.createCourse(formData)
      router.push('/courses')
    },
  })

  return (
    <>
      {isAuth ? (
        <MainLayout title="Create Course page">
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
              <TextField
                id="price"
                name="price"
                type="number"
                label="Price"
                variant="outlined"
                value={values.price}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <FileUpload setFile={setPicture} accept="image/*">
                <Button>Upload picture</Button>
              </FileUpload>
            </div>
            <div className={styles.btnContainer}>
              <Button name="create" variant="contained" fullWidth type="submit">
                Create
              </Button>
            </div>
          </form>
        </MainLayout>
      ) : null}
    </>
  )
}

export default CreateCourse
