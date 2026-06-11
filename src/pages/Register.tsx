import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { registerUser } from '../services/authService'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setMessage('')

    if (
      name.trim() === '' ||
      username.trim() === '' ||
      password.trim() === ''
    ) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (name.length < 3) {
      setError('El nombre debe tener mínimo 3 caracteres')
      return
    }

    if (username.length < 4) {
      setError('El usuario debe tener mínimo 4 caracteres')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres')
      return
    }

    const success = registerUser(name, username, password)

    if (!success) {
      setError('El usuario ya existe')
      return
    }

    setMessage('Usuario registrado correctamente')

    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <main>
      <Helmet>
        <title>Registro | MangaVerse</title>
        <meta
          name="description"
          content="Registro de nuevos usuarios en MangaVerse."
        />
        <meta
          property="og:title"
          content="Registro | MangaVerse"
        />
        <meta
          property="og:description"
          content="Crea una cuenta para ingresar al catálogo de mangas y cómics."
        />
      </Helmet>

      <section className="form-card">
        <h1>Crear cuenta</h1>

        <p>
          Registra una cuenta para ingresar al catálogo y guardar mangas en favoritos.
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {message && (
          <p className="success">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Nombre
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />

          <label htmlFor="username">
            Usuario
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />

          <label htmlFor="password">
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <button type="submit">
            Registrarse
          </button>
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  )
}

export default Register