import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  addFavoriteManga,
  getLocalMangas,
  getMangaByIdFromApi,
  isFavoriteManga
} from '../services/mangaService'
import type { Manga } from '../types/manga'

function DetalleManga() {
  const { id } = useParams()
  const [manga, setManga] = useState<Manga | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadManga()
  }, [id])

  async function loadManga() {
    try {
      setLoading(true)
      setError('')

      const mangaId = Number(id)

      const localMangas = getLocalMangas()
      const localManga = localMangas.find(item => item.id === mangaId)

      if (localManga) {
        setManga(localManga)
        return
      }

      const apiManga = await getMangaByIdFromApi(mangaId)
      setManga(apiManga)
    } catch {
      setError('No se pudo cargar el detalle del manga')
    } finally {
      setLoading(false)
    }
  }

  function handleAddFavorite() {
    if (!manga) {
      return
    }

    const success = addFavoriteManga(manga)

    if (!success) {
      setMessage('Este manga ya está en favoritos')
      return
    }

    setMessage('Manga agregado a favoritos correctamente')
  }

  if (loading) {
    return (
      <main>
        <p className="info-message">
          Cargando detalle del manga...
        </p>
      </main>
    )
  }

  if (error || !manga) {
    return (
      <main>
        <p className="error">
          {error || 'No se encontró el manga'}
        </p>

        <Link className="back-link" to="/catalogo">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main>
      <Helmet>
        <title>{manga.title} | MangaVerse</title>
        <meta
          name="description"
          content={`Detalle del manga ${manga.title} dentro del sistema MangaVerse.`}
        />
        <meta
          property="og:title"
          content={`${manga.title} | MangaVerse`}
        />
        <meta
          property="og:description"
          content={manga.description}
        />
      </Helmet>

      <section className="detail-card">
        <div className="detail-image">
          <img
            src={manga.image}
            alt={`Portada de ${manga.title}`}
          />
        </div>

        <div className="detail-content">
          <span className="badge">
            {manga.genre}
          </span>

          <h1>
            {manga.title}
          </h1>

          <p>
            <strong>Autor:</strong> {manga.author}
          </p>

          <p>
            <strong>Estado:</strong> {manga.status}
          </p>

          <p>
            <strong>Capítulos:</strong> {manga.chapters}
          </p>

          <p>
            <strong>Descripción:</strong>
          </p>

          <p>
            {manga.description}
          </p>

          {message && (
            <p className="success">
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={handleAddFavorite}
            disabled={isFavoriteManga(manga.id)}
          >
            {isFavoriteManga(manga.id)
              ? 'Ya está en favoritos'
              : 'Agregar a favoritos'}
          </button>

          <br />

          <Link className="back-link" to="/catalogo">
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  )
}

export default DetalleManga