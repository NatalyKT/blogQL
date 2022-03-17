// Main Application Component
import { App } from './App'
// Utilities for creating a provider
import { HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// Generating Server URL
const httpLink = new HttpLink({
  uri: 'http://localhost:3000'
})

// Including the Authorization Header in the Request
const authLink = setContext((_, { headers }) => {
  // Getting a token from local storage
  const token = JSON.parse(window.localStorage.getItem('jwtToken'))

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
