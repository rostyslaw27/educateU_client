import { Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import { FC, useCallback, useEffect, useState } from 'react'
import { questionsAPI } from '../../api/questions/questions.api'
import { IQuestion } from '../../api/questions/questions.types'
import QuestionItem from './question-item'

import styles from '../../styles/response/response-form.module.scss'

type QuestionsBlockProps = {
  lessonId: string
}

const QuestionsBlock: FC<QuestionsBlockProps> = ({ lessonId }) => {
  const [questions, setQuestions] = useState<IQuestion[]>()

  const { data: session } = useSession()

  const fetchQuestions = useCallback(async () => {
    const res = await questionsAPI.getQuestionsByLessonId(lessonId)
    setQuestions(res.data)
  }, [lessonId])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      questionText: '',
    },
    onSubmit: async (values) => {
      await questionsAPI.createQuestion({
        text: values.questionText,
        createdBy: session!.user._id,
        lessonId,
      })
      fetchQuestions()
      resetForm()
    },
  })

  const questionsList = questions?.map((question) => (
    <QuestionItem
      key={question._id}
      questionId={question._id}
      questionItem={question}
    />
  ))

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsContainer}>
          <TextField
            id="questionText"
            type="text"
            name="questionText"
            onChange={handleChange}
            value={values.questionText}
            label="Write your question"
            multiline={true}
            rows={5}
            variant="outlined"
          />
        </div>

        <div className={styles.btnsContainer}>
          <Button variant="outlined" onClick={() => resetForm()}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>

      {questions && questions.length > 0 && (
        <Typography sx={{ fontSize: 22, fontWeight: 500 }}>
          Questions:
        </Typography>
      )}
      {questionsList}
    </>
  )
}

export default QuestionsBlock
