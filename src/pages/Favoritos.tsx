import { useEffect, useState } from 'react'
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
      </Helmet>

      <section className="page-header">
        <h1>Mis favoritos</h1>

        <p>
          Aquí se muestran los mangas que agregaste a tu lista de favoritos.
        </p>
      </section>

      {favorites.length === 0 && (
        <p className="info-message">
          Todavía no agregaste mangas a favoritos.
        </p>
      )}

      <section className="manga-grid">
        {favorites.map(manga => (
          <div key={manga.id}>
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
    </main>
  )
}

export default Favoritos