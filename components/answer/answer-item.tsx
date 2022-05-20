import { dateToLocale } from '../../utils/utils'
import { FC } from 'react'
import { IAnswer } from '../../api/answers/answers.types'

import styles from '../../styles/answer/answer-item.module.scss'

type AnswerItemProps = {
  answerItem: IAnswer
}

const AnswerItem: FC<AnswerItemProps> = ({ answerItem }) => {
  const { createdBy, text, date } = answerItem

  const answerDate = dateToLocale(date)

  return (
    <div className={styles.root}>
      <div className={styles.answerInfo}>
        <div className={styles.user}>{createdBy.email}</div>
        <div>{answerDate}</div>
      </div>
      <div className={styles.textContent}>{text}</div>
    </div>
  )
}

export default AnswerItem
