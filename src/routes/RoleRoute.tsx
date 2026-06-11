import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { getUser } from '../utils/auth'
import type { Role } from '../types/auth'

interface Props {
  children: ReactNode
  allowedRole: Role
}

function RoleRoute({ children, allowedRole }: Props) {
  const user = getUser()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

export default RoleRoute
