import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function Unauthorized() {
  return (
    <main>
      <Helmet>
        <title>Acceso denegado | MangaVerse</title>
        <meta
          name="description"
          content="Página de acceso denegado del sistema MangaVerse."
        />
      </Helmet>

      <section className="hero">
        <h1>Acceso denegado</h1>

        <p>
          No tienes permisos para ingresar a esta sección.
        </p>

        <Link to="/catalogo">
          Volver al catálogo
        </Link>
      </section>
    </main>
  )
}

export default Unauthorized