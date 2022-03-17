import { useState, useEffect } from 'react'
// Apollo hooks
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'
import { PostCard, PostForm } from '../components'
import { useAuthContext } from '../context/auth'
import { Loader } from '../utils'
// GraphQL Query
import { FETCH_POSTS_QUERY } from '../graphql'

export const Home = () => {
  // Status for posts
  const [posts, setPosts] = useState([])
  // Getting posts from the server
  const { data } = useQuery(FETCH_POSTS_QUERY)

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts)
    }
  })

  const { user } = useAuthContext()

  if (!data) return <Loader />

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {/* Only registered user can add posts */}
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        <Transition.Group>
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  )
}
