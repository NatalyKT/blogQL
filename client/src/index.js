// The "entry point" for Webpack - the main file of the application

import React from 'react'
import ReactDOM from 'react-dom'
// Apollo Provider with child component App
import ApolloProvider from './ApolloProvider'

const root$ = document.getElementById('root')
ReactDOM.render(<ApolloProvider />, root$)
