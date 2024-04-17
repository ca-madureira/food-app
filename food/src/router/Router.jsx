import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../layout/Main'
import Home from '../pages/home/Home'
import Menu from '../pages/shop/Menu'
import Signup from '../components/Signup'
import UpdateProfile from '../pages/dashboard/UpdateProfile'
import CartPage from '../pages/shop/CartPage'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const ProtectedRoute = ({ element, path }) => {
  const { user } = useContext(AuthContext)

  return user ? element : <Navigate to='/signup' replace />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/cart-page',
        element: <ProtectedRoute element={<CartPage />} />,
      },
      {
        path: '/update-profile',
        element: <ProtectedRoute element={<UpdateProfile />} />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
])

export default router
