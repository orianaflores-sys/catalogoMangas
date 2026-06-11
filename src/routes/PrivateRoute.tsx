import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { isAuthenticated } from '../utils/auth'

interface Props {
  children: ReactNode
}

function PrivateRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute