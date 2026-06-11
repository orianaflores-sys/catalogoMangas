import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function NotFound() {
  return (
    <main>
      <Helmet>
        <title>Página no encontrada | MangaVerse</title>
        <meta
          name="description"
          content="Página 404 del sistema MangaVerse."
        />
      </Helmet>

      <section className="not-found-card">
        <div className="not-found-number">
          404
        </div>

        <h1>Página no encontrada</h1>

        <p>
          La ruta que intentaste abrir no existe o fue escrita incorrectamente.
        </p>

        <p>
          Puedes volver al inicio o ingresar al catálogo si ya iniciaste sesión.
        </p>

        <div className="not-found-actions">
          <Link to="/">
            Volver al inicio
          </Link>

          <Link to="/login">
            Ir al login
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFound