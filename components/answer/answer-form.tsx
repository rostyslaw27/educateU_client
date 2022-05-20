import { Button, TextField } from '@mui/material'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import { useFormik } from 'formik'
import { answersAPI } from '../../api/answers/answers.api'
import { FC } from 'react'
import { useSession } from 'next-auth/react'
import { dateToLocale } from '../../utils/utils'

import styles from '../../styles/answer/answer-form.module.scss'

type AnswerFormProps = {
  cancel: () => void
  replyTo: string
  refetchAnswers: Function
  questionId: string
}

const AnswerForm: FC<AnswerFormProps> = ({
  cancel,
  replyTo,
  refetchAnswers,
  questionId,
}) => {
  const { data: session } = useSession()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      answerText: '',
    },
    onSubmit: async (values) => {
      await answersAPI.createAnswer({
        text: values.answerText,
        questionId,
        createdBy: session!.user._id,
      })    
      await refetchAnswers()
      cancel()
    },
  })

  const answerDate = dateToLocale(new Date())

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <span>
          <span>{session!.user.email}</span>
          <ReplyOutlinedIcon className={styles.replyIcon} />
          <span>{replyTo}</span>
        </span>
        <span>{answerDate}</span>
      </div>
      <TextField
        className={styles.input}
        multiline
        rows={5}
        value={values.answerText}
        variant="outlined"
        onChange={handleChange}
        name="answerText"
        label="Answer"
      />
      <div className={styles.btnContainer}>
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Leave answer
        </Button>
      </div>
    </form>
  )
}

export default AnswerForm
