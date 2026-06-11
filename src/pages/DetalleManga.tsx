import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  addFavoriteManga,
  getLocalMangas,
  getMangasFromApi,
  isFavoriteManga
} from '../services/mangaService'
import type { Manga } from '../types/manga'

function DetalleManga() {
  const { id } = useParams()

  const [manga, setManga] = useState<Manga | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadManga()
  }, [id])

  async function loadManga() {
    try {
      const apiMangas = await getMangasFromApi()
      const localMangas = getLocalMangas()
      const allMangas = [...apiMangas, ...localMangas]

      const mangaFound = allMangas.find(item => item.id === Number(id))

      if (mangaFound) {
        setManga(mangaFound)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleAddFavorite() {
    if (!manga) {
      return
    }

    const added = addFavoriteManga(manga)

    if (!added) {
      setMessage('Este manga ya está en favoritos')
      return
    }

    setMessage('Manga agregado a favoritos')
  }

  if (loading) {
    return (
      <main>
        <p className="info-message">Cargando información...</p>
      </main>
    )
  }

  if (!manga) {
    return (
      <main>
        <section className="page-header">
          <h1>Manga no encontrado</h1>
          <p>No se encontró información para este manga.</p>
          <Link to="/catalogo">Volver al catálogo</Link>
        </section>
      </main>
    )
  }

  return (
    <main>
      <Helmet>
        <title>{manga.title} | MangaVerse</title>
        <meta
          name="description"
          content={`Detalle del manga ${manga.title} en MangaVerse.`}
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

        <div className="detail-info">
          <span className="genre-pill">
            {manga.genre}
          </span>

          <h1>{manga.title}</h1>

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

         <div className="form-actions">
                <button
                    type="button"
                    onClick={handleAddFavorite}
                    disabled={isFavoriteManga(manga.id)}
                >
                    {isFavoriteManga(manga.id) ? 'Ya está en favoritos' : 'Agregar a favoritos'}
                </button>

                <Link
                    className="back-link"
                    to="/catalogo"
                    >
                    Volver al catálogo
                </Link>
            </div>
        </div>
      </section>
    </main>
  )
}

export default DetalleManga