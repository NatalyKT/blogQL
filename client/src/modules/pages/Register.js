import { useState } from 'react'
import { Navigate } from 'react-router-dom'
// Apollo hook
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { useAuthContext } from '../context/auth'
import { useForm } from '../utils'
// GraphQL mutation
import { REGISTER_USER } from '../graphql'
import { Loader, convertImg } from '../utils'

export const Register = () => {
  const [errors, setErrors] = useState({})
  const context = useAuthContext()

  const { formData, handleChange, handleSubmit } = useForm(registerUser, {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: ''
  })

  // Getting a function for registration and download status from the server
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // Passing data from the form to the server
    variables: formData,
    // If the mutation is successful
    update(_, { data: { register: formData } }) {
      // Perform authorization
      context.login(formData)
      // and redirect to the main page
      return <Navigate to='/' />
    },
    // In case of an error
    onError(err) {
      // Update error status
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    }
  })

  function registerUser() {
    addUser()
  }

  // Function to convert avatar to string
  async function uploadAvatar({ target: { files, name } }) {
    const img = files[0]
    const str = await convertImg(img)
    handleChange({ target: { name, value: str } })
  }

  if (loading) return <Loader />

  return (
    <div className='form-box'>
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Registration</h1>
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
          label='Avatar'
          name='avatar'
          type='file'
          onChange={uploadAvatar}
        />
        <Form.Input
          label='Email'
          placeholder='Email...'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          error={errors.email ? true : false}
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
        <Form.Input
          label='Confirm your password'
          placeholder='Password...'
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button primary type='submit'>
        Register
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
