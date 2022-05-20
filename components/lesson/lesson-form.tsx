import { FC, useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import FileUpload from '../file-upload'
import { lessonsAPI } from '../../api/lessons/lessons.api'
import { ILesson } from '../../api/lessons/lessons.types'

import styles from '../../styles/common/common-form.module.scss'

type LessonFormProps = {
  courseId: string
  setLessons: Function
}

const LessonForm: FC<LessonFormProps> = ({ courseId, setLessons }) => {
  const [video, setVideo] = useState<Blob | null>(null)

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('courseId', courseId)
      formData.append('video', video!)

      const res = await lessonsAPI.createLesson(formData)
      setLessons((prevState: ILesson[]) => [...prevState, res.data])
      resetForm()
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
        <FileUpload setFile={setVideo} accept="video/*">
          <Button>Upload video</Button>
        </FileUpload>
      </div>
      <div className={styles.btnContainer}>
        <Button name="create" variant="contained" fullWidth type="submit">
          Create lesson
        </Button>
      </div>
    </form>
  )
}

export default LessonForm
