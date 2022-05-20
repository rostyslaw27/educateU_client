import { FC, useCallback, useEffect, useState } from 'react'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AnswerForm from '../answer/answer-form'
import AnswerItem from '../answer/answer-item'
import { answersAPI } from '../../api/answers/answers.api'
import { IAnswer } from '../../api/answers/answers.types'
import { IQuestion } from '../../api/questions/questions.types'
import { dateToLocale } from '../../utils/utils'

import styles from '../../styles/question/question-item.module.scss'

type QuestionItemProps = {
  questionId: string
  questionItem: IQuestion
}

const QuestionItem: FC<QuestionItemProps> = ({ questionId, questionItem }) => {
  const [isAnswerFormShown, toggleAnswerForm] = useState<boolean>(false)
  const [isAnswersListShown, toggleAnswersList] = useState<boolean>(false)
  const [answers, setAnswers] = useState<IAnswer[]>()

  const { text, date, createdBy } = questionItem

  const answersCount = answers?.length

  const fetchAnswers = useCallback(async () => {
    const res = await answersAPI.getAnswersByQuestionId(questionId)
    setAnswers(res.data)
  }, [questionId])

  useEffect(() => {
    fetchAnswers()
  }, [fetchAnswers])

  const reloadAnswersData = async () => {
    fetchAnswers()
    toggleAnswersList(true)
  }

  const handleAnswerOpen = () => {
    toggleAnswerForm(true)
  }

  const handleAnswerClose = () => {
    toggleAnswerForm(false)
  }

  const showAnswersList = async () => {
    toggleAnswersList((prevIsAnswersListShown) => !prevIsAnswersListShown)
  }

  const questionDate = dateToLocale(date)

  const answersList = answers?.map((answer) => (
    <AnswerItem key={answer._id} answerItem={answer} />
  ))

  return (
    <div className={styles.root}>
      <div className={styles.questionInfo}>
        <div className={styles.email}>{createdBy.email}</div>
        <div>{questionDate}</div>
      </div>
      <div className={styles.textContent}>
        <div>{text}</div>
      </div>

      <div className={styles.replyContainer}>
        <ReplyOutlinedIcon className={styles.replyIcon} />
        <p className={styles.replyBtn} onClick={handleAnswerOpen}>
          Reply
        </p>

        {answersCount ? (
          <div className={styles.answersCount} onClick={showAnswersList}>
            <ChatBubbleOutlineOutlinedIcon className={styles.answersIcon} />
            <span className={styles.answerText}>
              {answersCount}
              {'\u00A0'}
              Answers
            </span>
          </div>
        ) : null}
      </div>

      {isAnswerFormShown && (
        <div className={styles.answerForm}>
          <AnswerForm
            replyTo={questionItem.createdBy.email}
            cancel={handleAnswerClose}
            refetchAnswers={reloadAnswersData}
            questionId={questionId}
          />
        </div>
      )}

      {isAnswersListShown && answersList}
    </div>
  )
}

export default QuestionItem
