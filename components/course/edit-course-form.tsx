import { FC } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { coursesAPI } from '../../api/courses/course.api'
import { ICourse } from '../../api/courses/course.types'

import styles from '../../styles/common/common-form.module.scss'

type EditCourseFormProps = {
  course: ICourse
}

const EditCourseForm: FC<EditCourseFormProps> = ({ course }) => {
  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      title: course.title,
      description: course.description,
      price: course.price,
    },
    onSubmit: async (values) => {
      await coursesAPI.updateCourse({ _id: course._id, ...values })
    },
  })

  return (
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
      </div>
      <div className={styles.btnContainer}>
        <Button name="create" variant="contained" fullWidth type="submit">
          Edit
        </Button>
      </div>
    </form>
  )
}

export default EditCourseForm
