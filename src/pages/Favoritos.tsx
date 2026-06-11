import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import MangaCard from '../components/MangaCard'
import {
  getFavoriteMangas,
  removeFavoriteManga
} from '../services/mangaService'
import type { Manga } from '../types/manga'

function Favoritos() {
  const [favorites, setFavorites] = useState<Manga[]>([])

  useEffect(() => {
    setFavorites(getFavoriteMangas())
  }, [])

  function handleRemove(id: number) {
    const confirmRemove = window.confirm('¿Deseas quitar este manga de favoritos?')

    if (!confirmRemove) {
      return
    }

    removeFavoriteManga(id)
    setFavorites(getFavoriteMangas())
  }

  return (
    <main>
      <Helmet>
        <title>Favoritos | MangaVerse</title>
        <meta
          name="description"
          content="Lista de mangas favoritos guardados por el usuario."
        />
        <meta
          property="og:title"
          content="Favoritos | MangaVerse"
        />
        <meta
          property="og:description"
          content="Mangas y cómics guardados por el usuario como favoritos."
        />
      </Helmet>

      <section className="page-header">
        <h1>Mis favoritos</h1>

        <p>
          Aquí puedes revisar los mangas o cómics que agregaste a tu lista
          para consultarlos después.
        </p>
      </section>

      {favorites.length === 0 && (
        <section className="empty-favorites">
          <h2>No tienes favoritos todavía</h2>

          <p>
            Explora el catálogo y guarda los títulos que quieras revisar más adelante.
          </p>

          <Link to="/catalogo">
            Ir al catálogo
          </Link>
        </section>
      )}

      {favorites.length > 0 && (
        <>
          <p className="results-count">
            Favoritos guardados: {favorites.length}
          </p>

          <section className="manga-grid">
            {favorites.map(manga => (
              <div
                key={manga.id}
                className="favorite-item"
              >
                <MangaCard manga={manga} />

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => handleRemove(manga.id)}
                >
                  Quitar de favoritos
                </button>
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  )
}

export default Favoritos