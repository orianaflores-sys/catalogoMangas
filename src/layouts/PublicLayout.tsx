import { Link, Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">MangaVerse</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Outlet />
    </>
  )
}

export default PublicLayout