import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// Apollo hook
import { useQuery, useMutation } from '@apollo/client'
import { Card, Form, Grid, Image } from 'semantic-ui-react'
import { LikeButton, DeleteButton, CommentButton } from '../components'
import { Loader, formatDate } from '../utils'
// GraphQL query and mutation
import { FETCH_POST_QUERY, CREATE_COMMENT_MUTATION } from '../graphql'
import { useAuthContext } from '../context/auth'

export const SinglePost = () => {
  const { user } = useAuthContext()
  const [comment, setComment] = useState('')
  const commentInputRef = useRef(null)

  const { postId } = useParams()

  // Receive post from server
  const { data } = useQuery(FETCH_POST_QUERY, {
    // Passing the post id to the server
    variables: {
      postId
    }
  })

  // Getting a function to create a comment from the server
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    // Passing the post id and comment text to the server
    variables: {
      postId,
      body: comment
    },
    // If the mutation is successful
    update() {
      // Clearing the field for the comment text
      setComment('')
      // Remove focus from this field
      commentInputRef.current.blur()
    }
  })

  const history = useNavigate()
  // Deleting a displayed post redirects to the main page
   // In this case, return <Redirect to="/" /> doesn't work
  const deletePost = () => {
    history.push('/')
  }

  if (!data) return <Loader />

  // Extracting values from data received from the server
  const {
    id,
    body,
    username,
    avatar,
    createdAt,
    comments,
    likes,
    likeCount,
    commentCount
  } = data.getPost

  // As an avatar, set either the user's avatar or the default image
  const imgSrc =
    avatar || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image src={imgSrc} size='small' float='right' />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{formatDate(createdAt)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            {/* Like and comment buttons are available only to registered users */}
            {user && (
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <CommentButton
                  commentCount={commentCount}
                  onClick={() => commentInputRef.current.focus()}
                />
                {/* Posts can only be deleted by the user who added them */}
                {user.username === username && (
                  <DeleteButton postId={id} cb={deletePost} />
                )}
              </Card.Content>
            )}
          </Card>
          {/* Only registered users can add comments */}
          {user && (
            <Card fluid>
              <Card.Content>
                <p>Leave comment</p>
                <Form>
                  <div className='ui action input fluid'>
                    <input
                      type='text'
                      placeholder='Comment...'
                      name='comment'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type='submit'
                      className='ui button teal'
                      disabled={comment.trim() === ''}
                      onClick={createComment}
                    >
                      Отправить
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {/* Comments */}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {/* Only the user who added the comment can delete it */}
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{formatDate(comment.createdAt)}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
