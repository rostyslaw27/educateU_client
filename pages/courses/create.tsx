import React, { FC } from 'react'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../redux/reduxStore'
import { Button, TextField } from '@mui/material'
import styles from '../../styles/auth.module.scss'
import MainLayout from '../../components/main-layout'
import { coursesAPI } from '../../api/courses/course.api'

const CreateCourse: FC = () => {
  const userId = useSelector((state: AppStateType) => state.auth.id)
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0
    },
    onSubmit: (values) => {
      coursesAPI.createCourse({ ...values, createdBy: userId! })
    },
  })

  return (
    <MainLayout title='Create course page'>
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
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
              sx={
                { mt: 2 }
              }
            />
            <TextField
              id="price"
              name="price"
              type="number"
              label="Price"
              variant="outlined"
              value={values.price}
              onChange={handleChange}
              sx={
                { mt: 2 }
              }
            />
          </div>
          <div className={styles.btns}>
            <Button name='create' variant="contained" fullWidth type="submit">
              Create
            </Button>
          </div>
        </div>
      </form>
    </MainLayout>
  )
}

export default CreateCourse