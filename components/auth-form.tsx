import React, { FC, FormEvent, useState } from 'react'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { AppDispatch, AppStateType } from '../redux/reduxStore'
import { login, register } from '../redux/auth/auth.thunks'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material'
import styles from '../styles/auth.module.scss'

type FormikSubmitEvent = FormEvent<HTMLFormElement> & {
  nativeEvent: { submitter?: HTMLButtonElement }
}

const AuthForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [formEvent, setFormEvent] = useState<FormikSubmitEvent>()
  const isLoading = useSelector((state: AppStateType) => state.auth.isLoading)
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const btnName = formEvent?.nativeEvent.submitter?.name
      if (btnName === 'register') {
        dispatch(register(values))
      } else {
        dispatch(login(values))
      }
    },
  })

  return (
    <form onSubmit={(e) => {
      setFormEvent(e)
      handleSubmit(e)
    }}>
      <div className={styles.form}>
        <div className={styles.inputs}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            sx={
              { mt: 2 }
            }
          />
        </div>
        <div className={styles.btns}>
          <Button name='login' disabled={isLoading} variant="contained" fullWidth type="submit">
            Login
          </Button>
          <Button name='register' disabled={isLoading} variant="outlined" fullWidth type="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  )
}

export default AuthForm
