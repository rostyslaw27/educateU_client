import { FC, FormEvent, useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import { authAPI } from '../api/auth/auth.api'

import styles from '../styles/common/common-form.module.scss'

type FormikSubmitEvent = FormEvent<HTMLFormElement> & {
  nativeEvent: { submitter?: HTMLButtonElement }
}

const AuthForm: FC = () => {
  const [formEvent, setFormEvent] = useState<FormikSubmitEvent>()

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const btnName = formEvent?.nativeEvent.submitter?.name
      if (btnName === 'register') {
        await authAPI.registration(values)
        signIn('credentials', {
          ...values,
          callbackUrl: `${window.location.origin}`,
        })
      } else {
        signIn('credentials', {
          ...values,
          callbackUrl: `${window.location.origin}`,
        })
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        setFormEvent(e)
        handleSubmit(e)
      }}
      className={styles.form}
    >
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
          sx={{ mt: 2 }}
        />
      </div>
      <div className={styles.btnContainer}>
        <Button
          name="login"
          variant="contained"
          fullWidth
          type="submit"
        >
          Login
        </Button>
        <Button
          name="register"
          variant="outlined"
          fullWidth
          type="submit"
        >
          Register
        </Button>
      </div>
    </form>
  )
}

export default AuthForm
