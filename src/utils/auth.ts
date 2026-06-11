import type { User } from '../types/auth'

const USER_KEY = 'mangaverse_user'

export function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser(): User | null {
  const userStorage = localStorage.getItem(USER_KEY)

  if (!userStorage) {
    return null
  }

  return JSON.parse(userStorage)
}

export function removeUser() {
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
  return getUser() !== null
}

export function isAdmin() {
  const user = getUser()

  if (!user) {
    return false
  }

  return user.role === 'Administrador'
}