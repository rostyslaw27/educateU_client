import { Button, Rating, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import { FC, useCallback, useEffect, useState } from 'react'
import { responsesAPI } from '../../api/responses/responses.api'
import { IResponse } from '../../api/responses/responses.types'
import ResponseItem from './response-item'

import styles from '../../styles/response/response-form.module.scss'

type ResponsesBlockProps = {
  courseId: string
  refetchCourse: Function
  isCreator: boolean
  isPurchased: boolean
}

const ResponsesBlock: FC<ResponsesBlockProps> = ({
  courseId,
  refetchCourse,
  isCreator,
  isPurchased,
}) => {
  const [responses, setResponses] = useState<IResponse[]>()

  const { data: session } = useSession()

  const fetchResponses = useCallback(async () => {
    const res = await responsesAPI.getResponsesByCourseId(courseId)
    setResponses(res.data)
  }, [courseId])

  useEffect(() => {
    fetchResponses()
  }, [fetchResponses])

  const { handleSubmit, handleChange, values, resetForm } = useFormik({
    initialValues: {
      responseText: '',
      rating: 0,
    },
    onSubmit: async (values) => {
      if (values.responseText === '') {
        return
      }
      await responsesAPI.createResponse({
        rating: values.rating,
        description: values.responseText,
        createdBy: session!.user._id,
        courseId,
      })
      fetchResponses()
      refetchCourse()
      resetForm()
    },
  })

  const responsesList = responses?.map((response) => (
    <ResponseItem key={response._id} responseItem={response} />
  ))

  return (
    <>
      <Typography sx={{ mt: 2, fontSize: 24, fontWeight: 500 }}>
        Responses:{' '}
      </Typography>
      {!session ? (
        <div>Log in to leave a response</div>
      ) : isCreator ? null : isPurchased ? (
        <form onSubmit={handleSubmit}>
          <Rating name="rating" value={values.rating} onChange={handleChange} />
          <div className={styles.inputsContainer}>
            <TextField
              id="responseText"
              type="text"
              name="responseText"
              onChange={handleChange}
              value={values.responseText}
              label="Write your response"
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
      ) : (
        <div>Buy a course to leave a response</div>
      )}
      {responses && responses.length > 0 ? (
        responsesList
      ) : (
        <div>No responses</div>
      )}
    </>
  )
}

export default ResponsesBlock
