// Private routing utility

import { Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext()

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Navigate to='/' /> : <Component {...props} />
      }
    />
  )
}
