import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { login } from '../services/authService'

function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (username.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres')
      return
    }

    const success = login({
      username,
      password
    })

    if (!success) {
      setError('Usuario o contraseña incorrectos')
      return
    }

    navigate('/catalogo')
  }

  return (
    <main>
      <Helmet>
        <title>Login | MangaVerse</title>
        <meta
          name="description"
          content="Inicio de sesión del sistema MangaVerse."
        />
        <meta
          property="og:title"
          content="Login | MangaVerse"
        />
        <meta
          property="og:description"
          content="Acceso al sistema de catálogo y gestión de mangas y cómics."
        />
      </Helmet>

      <section className="form-card">
        <h1>Iniciar sesión</h1>

        <p>
          Admin: admin / admin123
        </p>

        <p>
          Usuario: user / user123
        </p>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
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
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login