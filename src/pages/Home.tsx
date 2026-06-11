import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

function Home() {
  return (
    <main>
      <Helmet>
        <title>MangaVerse | Catálogo de mangas y cómics</title>
        <meta
          name="description"
          content="Aplicación web para consultar y administrar mangas y cómics."
        />
        <meta
          property="og:title"
          content="MangaVerse | Catálogo de mangas y cómics"
        />
        <meta
          property="og:description"
          content="Explora mangas desde una API pública y gestiona tu propio catálogo."
        />
      </Helmet>

      <section className="hero">
        <h1>MangaVerse</h1>

        <p>
          Explora mangas reales desde una API pública y administra
          tu propio catálogo de mangas y cómics.
        </p>

        <div className="actions">
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </section>
    </main>
  )
}

export default Home