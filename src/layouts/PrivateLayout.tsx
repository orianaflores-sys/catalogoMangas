import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getUser, removeUser } from '../utils/auth'

function PrivateLayout() {
  const navigate = useNavigate()
  const user = getUser()

  function handleLogout() {
    removeUser()
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-spaced">
        <Link className="brand" to="/catalogo">MangaVerse</Link>

        <div className="nav-links">
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/favoritos">Favoritos</Link>

          {user?.role === 'Administrador' && (
            <Link to="/gestion-mangas">Gestión</Link>
          )}

          <Link to="/perfil">Perfil</Link>

          <button onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <Outlet />

      <footer className="footer">
        <p>MangaVerse - Usuario: {user?.username}</p>
      </footer>
    </>
  )
}

export default PrivateLayout