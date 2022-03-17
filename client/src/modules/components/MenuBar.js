import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useAuthContext } from '../context/auth'

export const MenuBar = () => {
  const { user, logout } = useAuthContext()


  const { pathname } = useLocation()
  const path = pathname === '/' ? 'home' : pathname.slice(1)

  const [active, setActive] = useState(path)

   useEffect(() => {
    setActive(path)
  }, [pathname])

  const handleClick = (_, { name }) => {
    setActive(name)
  }

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name={user.username} active as={Link} to='/' />

      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout}>
          Exit
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={active === 'home'}
        onClick={handleClick}
        as={Link}
        to='/'
      >
        Main
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={active === 'login'}
          onClick={handleClick}
          as={Link}
          to='/login'
        >
          Sign In
        </Menu.Item>
        <Menu.Item
          name='register'
          active={active === 'register'}
          onClick={handleClick}
          as={Link}
          to='/register'
        >
          Registration 
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}
