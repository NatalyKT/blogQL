import { useState } from 'react'
// Apollo Hook
import { useMutation } from '@apollo/client'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { MyPopup } from '../utils'
// GraphQL query & mutation
import {
  FETCH_POSTS_QUERY,
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION
} from '../graphql'

export const DeleteButton = ({ postId, commentId, cb }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  // Determination of a mutation by the presence of a comment id
  // If there is one, then we delete the comment, otherwise we delete the post 
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  // Getting the appropriate function from the server
  const [deletePostOrComment] = useMutation(mutation, {
    // Passing the post id and the comment id to the server
    variables: {
      postId,
      commentId
    },
    // If the mutation is successful
    update(proxy) {
      // Close the modal window
      setConfirmOpen(false)

      // If a post is being deleted 
      if (!commentId) {
        // Getting a post
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        // Update posts
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((post) => post.id !== postId)
          }
        })
      }
      // Callback execution: 
      // redirect to the main page when the displayed post is deleted 
      if (cb) cb()
    }
  })

  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        content='Are you sure?'
        cancelButton='Cancel'
        confirmButton='Delete'
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
        style={{ maxWidth: '480px' }}
      />
    </>
  )
}
