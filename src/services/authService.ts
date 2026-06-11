import type { LoginData, User } from '../types/auth'
import { saveUser } from '../utils/auth'

const USERS_KEY = 'mangaverse_users'

const defaultUsers: User[] = [
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

export function getUsers(): User[] {
  const usersStorage = localStorage.getItem(USERS_KEY)

  if (!usersStorage) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return defaultUsers
  }

  return JSON.parse(usersStorage)
}

export function registerUser(name: string, username: string, password: string) {
  const users = getUsers()

  const exists = users.some(user => user.username === username)

  if (exists) {
    return false
  }

  const newUser: User = {
    id: Date.now(),
    name,
    username,
    password,
    role: 'Usuario'
  }

  const updatedUsers = [...users, newUser]
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))

  return true
}

export function login(data: LoginData) {
  const users = getUsers()

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