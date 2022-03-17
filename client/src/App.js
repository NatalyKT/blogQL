// Main Application Component

import { Router, Routes, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { MenuBar } from 'modules/components'
import { Home, Login, Register, SinglePost } from 'modules/pages'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { AuthProvider } from 'modules/context/auth'
import { AuthRoute } from 'modules/utils/authRoute'

export const App = () => (
  <Container>
    <AuthProvider>
      <Router>
        <MenuBar />
        <Routes>
          <Route path='/' component={Home} exact />
          <AuthRoute path='/login' component={Login} exact />
          <AuthRoute path='/register' component={Register} exact />
          <Route path='/posts/:postId' component={SinglePost} exact />
        </Routes>
      </Router>
    </AuthProvider>
  </Container>)
