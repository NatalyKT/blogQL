import { useEffect, useState } from 'react'
// Apollo hooks
import { useMutation } from '@apollo/client'
import { Button, Label, Icon } from 'semantic-ui-react'
import { MyPopup } from '../utils'
// GraphQL mutation
import { LIKE_POST_MUTATION } from '../graphql'

export const LikeButton = ({ user, post }) => {
  const { id, likeCount, likes } = post
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false)
  }, [user, likes])

  // Getting a function to like a post from the server
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    // Passing the post id to the server
    variables: { postId: id }
  })

  const likeButton = liked ? (
    <Button color='teal'>
      <Icon name='heart' />
    </Button>
  ) : (
    <Button color='teal' basic>
      <Icon name='heart' />
    </Button>
  )

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <MyPopup content={liked ? 'Dislike' : 'Like'}>
        {likeButton}
      </MyPopup>
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  )
}
