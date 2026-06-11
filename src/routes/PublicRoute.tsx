import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { isAuthenticated } from '../utils/auth'

interface Props {
  children: ReactNode
}

function PublicRoute({ children }: Props) {
  if (isAuthenticated()) {
    return <Navigate to="/catalogo" />
  }

  return children
}

export default PublicRoute