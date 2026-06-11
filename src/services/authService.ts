import type { LoginData, User } from '../types/auth'
import { saveUser } from '../utils/auth'

const users: User[] = [
  {
    id: 1,
    name: 'Administrador',
    username: 'admin',
    password: 'admin123',
    role: 'Administrador'
  },
  {
    id: 2,
    name: 'Usuario',
    username: 'user',
    password: 'user123',
    role: 'Usuario'
  }
]

export function login(data: LoginData) {
  const userFound = users.find(
    user => user.username === data.username && user.password === data.password
  )

  if (!userFound) {
    return false
  }

  saveUser(userFound)
  return true
}

export function logout() {
  localStorage.removeItem('mangaverse_user')
}