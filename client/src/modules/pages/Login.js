// Authorization page

import { useState } from 'react'
import { Navigate } from 'react-router-dom'
// Apollo hook
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { useAuthContext } from '../context'
import { useForm } from '../utils'
// GraphQL mutation
import { LOGIN_USER } from '../graphql'
import { Loader } from '../utils'

export const Login = () => {
  const [errors, setErrors] = useState({})
  const context = useAuthContext()

  const { formData, handleChange, handleSubmit } = useForm(loginUserCb, {
    username: '',
    password: ''
  })

  // Getting a function for authorization and download status from the server
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // Passing data from the form to the server
    variables: formData,
    // After a successful mutation
    update(_, { data: { login: formData } }) {
      // Authorization is in progress
      context.login(formData)
      // and redirect to home page
      return <Navigate to='/' />
    },
    // In case of an error
    onError(err) {
      // Update the errors state
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    }
  })

  function loginUserCb() {
    loginUser()
  }

  if (loading) return <Loader />

  const isEmpty =
    formData.username.trim() === '' || formData.password.trim() === ''

  return (
    <div className='form-box'>
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Authorization</h1>
        <Form.Input
          label='Name'
          placeholder='Name...'
          name='username'
          type='text'
          value={formData.username}
          onChange={handleChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label='Password'
          placeholder='Password...'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={errors.password ? true : false}
        />
        <Button primary type='submit' disabled={isEmpty}>
        Login
        </Button>
      </Form>
      {/* Errors */}
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
