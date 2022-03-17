// Apollo Hook
import { useMutation } from '@apollo/client'
import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../utils'
// GraphQL query and mutation
import { FETCH_POSTS_QUERY, CREATE_POST_MUTATION } from '../graphql'

export const PostForm = () => {
  const { formData, handleChange, handleSubmit } = useForm(createPostCb, {
    body: ''
  })

  // Getting a function to create a post and an error from the server 
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    // Passing data from the form to the server
    variables: formData,
    // If the mutation is successful 
    update(proxy, result) {
      // getting posts
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      // and update them
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts]
        }
      })
      formData.body = ''
    }
  })

  function createPostCb() {
    createPost()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Post...'
            name='body'
            value={formData.body}
            onChange={handleChange}
            error={error}
          />
        </Form.Field>
        <Button
          type='submit'
          color='teal'
          disabled={formData.body.trim() === ''}
        >
          Add
        </Button>
      </Form>
      {/* Errors */}
      {error && (
        <div className='ui error message' style={{ marginBottom: 20 }}>
          <ul className='list'>{error.message}</ul>
        </div>
      )}
    </>
  )
}
