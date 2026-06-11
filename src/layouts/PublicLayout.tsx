import { Link, Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <>
      <nav className="navbar navbar-spaced">
        <Link className="brand" to="/">MangaVerse</Link>

        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </div>
      </nav>

      <Outlet />

      <footer className="footer">
        <p>MangaVerse - Proyecto Final Tecnologías Web II</p>
      </footer>
    </>
  )
}

export default PublicLayout