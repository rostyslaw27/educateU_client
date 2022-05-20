import { FC } from 'react'
import { Rating } from '@mui/material'
import { IResponse } from '../../api/responses/responses.types'
import { dateToLocale } from '../../utils/utils'

import styles from '../../styles/response/response-item.module.scss'

type ResponseItemProps = {
  responseItem: IResponse
}

const ResponseItem: FC<ResponseItemProps> = ({ responseItem }) => {
  const { description, date, rating, createdBy } = responseItem

  const responseDate = dateToLocale(date)

  return (
    <div className={styles.root}>
      <div className={styles.responseInfo}>
        <div className={styles.email}>
          {createdBy.email}
          <Rating sx={{ ml: 1 }} name="read-only" value={rating} readOnly />
        </div>
        <div>{responseDate}</div>
      </div>
      <div className={styles.textContent}>
        <div>{description}</div>
      </div>
    </div>
  )
}

export default ResponseItem
