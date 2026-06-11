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
      <nav className="navbar">
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/favoritos">Favoritos</Link>

        {user?.role === 'Administrador' && (
          <Link to="/gestion-mangas">Gestión de mangas</Link>
        )}

        <Link to="/perfil">Perfil</Link>

        <button onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>

      <Outlet />
    </>
  )
}

export default PrivateLayout