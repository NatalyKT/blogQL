// Context with authentication information

import { createContext, useReducer, useContext } from 'react'
// Token decryption utility
import jwtDecode from 'jwt-decode'

// Constants
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// Initial state
const initialState = {
  user: null
}

// The token is stored in local storage
if (window.localStorage.getItem('jwtToken')) {
  // Decoding the token;
  // Get user id, name and password
  const decodedToken = jwtDecode(
    JSON.parse(window.localStorage.getItem('jwtToken'))
  )

  // If the token (expiresIn, exp) has expired, remove it from storage, 
  if (decodedToken.exp * 1000 < Date.now()) {
    window.localStorage.removeItem('jwtToken')
  } else {
    // otherwise add the decrypted token to the initial state
    initialState.user = decodedToken
  }
}

// Creating a Context
const AuthContext = createContext()

// Create a reducer
const authReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        user: payload
      }
    }
    case LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    default:
      return state
  }
}

// Creating and Exporting an Authentication Provider
export const AuthProvider = ({ children }) => {
  // Get the state and dispatcher
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Authorization function
  const login = (userData) => {
    // Write the token to the local storage
    window.localStorage.setItem('jwtToken', JSON.stringify(userData.token))

    dispatch({
      type: LOGIN,
      payload: userData
    })
  }

  // Logout function
  const logout = () => {
    // Delete token from local storage
    window.localStorage.removeItem('jwtToken')
    dispatch({ type: LOGOUT })
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
