import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getMangasFromApi } from '../services/mangaService'
import type { Manga } from '../types/manga'

function Home() {
  const [featuredMangas, setFeaturedMangas] = useState<Manga[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedMangas()
  }, [])

  async function loadFeaturedMangas() {
    try {
      const mangas = await getMangasFromApi()
      setFeaturedMangas(mangas.slice(0, 4))
    } catch {
      setFeaturedMangas([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Helmet>
        <title>MangaVerse | Catálogo de mangas y cómics</title>
        <meta
          name="description"
          content="Sistema web para consultar y administrar mangas y cómics."
        />
        <meta
          property="og:title"
          content="MangaVerse | Catálogo de mangas y cómics"
        />
        <meta
          property="og:description"
          content="Explora mangas desde una API pública y administra tu propio catálogo."
        />
      </Helmet>

      <section className="home-hero">
        <div className="home-hero-text">
          <span className="badge">Catálogo digital</span>

          <h1>MangaVerse</h1>

          <p>
            Un sistema sencillo para explorar mangas y cómics, revisar información
            de distintos títulos y gestionar un catálogo propio.
          </p>

          <div className="actions">
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>

        <div className="home-hero-images">
          {loading && <p>Cargando portadas...</p>}

          {!loading &&
            featuredMangas.map(manga => (
              <div key={manga.id} className="hero-manga-card">
                <img
                  src={manga.image}
                  alt={`Portada de ${manga.title}`}
                  loading="lazy"
                />
              </div>
            ))}
        </div>
      </section>

      <section className="home-section">
        <h2>¿Qué puedes hacer en el sistema?</h2>

        <div className="home-features">
          <div className="feature-box">
            <h3>Explorar mangas</h3>
            <p>
              Consulta títulos obtenidos desde una API pública con información
              como autor, género, capítulos y estado.
            </p>
          </div>

          <div className="feature-box">
            <h3>Gestionar registros</h3>
            <p>
              El administrador puede registrar, editar y eliminar mangas dentro
              del catálogo local.
            </p>
          </div>

          <div className="feature-box">
            <h3>Guardar favoritos</h3>
            <p>
              Cada usuario puede revisar detalles de un manga y agregarlo a su
              lista de favoritos.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Algunos títulos destacados</h2>

        <div className="manga-grid">
          {featuredMangas.map(manga => (
            <article key={manga.id} className="manga-card">
              <div className="manga-image-box">
                <img
                  src={manga.image}
                  alt={`Portada de ${manga.title}`}
                  loading="lazy"
                />
              </div>

              <div className="manga-card-content">
                <h3>{manga.title}</h3>
                <p>
                  <strong>Autor:</strong> {manga.author}
                </p>
                <p>
                  <strong>Género:</strong> {manga.genre}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home