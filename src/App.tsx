
import './App.css'
import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/home'
import { Login } from './pages/login'
import { Admin } from './pages/admin'
import { Network } from './pages/network'
import { Private } from './routes/private'
import { Error } from './pages/error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin",
    element: <Private><Admin/></Private>
  },
  {
    path: "/admin/sociais",
    element: <Private> <Network/> </Private>
  },
  {
    path: "*",
    element: <Error/>
  }
])


export {router}