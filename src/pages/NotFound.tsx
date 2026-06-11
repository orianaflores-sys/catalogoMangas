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

      <section className="hero">
        <h1>404</h1>

        <p>
          La página que buscas no existe.
        </p>

        <Link to="/">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}

export default NotFound