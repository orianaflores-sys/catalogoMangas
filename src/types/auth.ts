export type Role = 'Administrador' | 'Usuario'

export interface User {
  id: number
  name: string
  username: string
  password: string
  role: Role
}

export interface LoginData {
  username: string
  password: string
}