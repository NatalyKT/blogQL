import { useNavigate } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import { useAuthContext } from '../context/auth'
import { LikeButton } from './LikeButton'
import { DeleteButton } from './DeleteButton'
import { CommentButton } from './CommentButton'
import { formatDate } from '../utils'

// The function accepts a post
export const PostCard = ({ post }) => {
  // Extracting values from a post
  const {
    id,
    body,
    username,
    avatar,
    createdAt,
    likeCount,
    likes,
    commentCount
  } = post

  const { user } = useAuthContext()

  const history = useNavigate()
  const showPost = () => {
    history.push(`/posts/${id}`)
  }

  // As an avatar, 
  // set either the user's avatar or the default image
  const imgSrc =
    avatar || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

  return (
    <Card fluid>
      <Card.Content>
        <div className='avatar-box'>
          <Image floated='right' size='mini' src={imgSrc} />
        </div>
        <Card.Header>{username}</Card.Header>
        <Card.Meta onClick={showPost} style={{ cursor: 'pointer' }}>
          {formatDate(createdAt)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      {/* Like and comment buttons are only available to registered users */}
      {user && (
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <CommentButton commentCount={commentCount} onClick={showPost} />
          {/* Posts can only be deleted by the user who added them */}
          {user.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      )}
    </Card>
  )
}
