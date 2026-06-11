import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import MangaCard from '../components/MangaCard'
import { getMangasFromApi, getLocalMangas } from '../services/mangaService'
import type { Manga } from '../types/manga'

type FilterType = 'Todos' | 'API' | 'Locales' | 'Acción' | 'Romance' | 'Terror' | 'Fantasía' | 'Comedia' | 'Drama'
function Catalogo() {
  const [apiMangas, setApiMangas] = useState<Manga[]>([])
  const [localMangas, setLocalMangas] = useState<Manga[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('Todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadMangas()
    setLocalMangas(getLocalMangas())
  }, [])

  async function loadMangas() {
    try {
      const data = await getMangasFromApi()
      setApiMangas(data)
    } catch {
      setError('No se pudo cargar la información de la API')
    } finally {
      setLoading(false)
    }
  }

  const allMangas = [...apiMangas, ...localMangas]
  function matchGenre(mangaGenre: string, selectedFilter: FilterType) {
  const genre = mangaGenre.toLowerCase()

  const genreMap = {
    'Acción': ['acción', 'action'],
    'Romance': ['romance'],
    'Terror': ['terror', 'horror'],
    'Fantasía': ['fantasía', 'fantasy'],
    'Comedia': ['comedia', 'comedy'],
    'Drama': ['drama']
  }

  if (selectedFilter === 'Todos' || selectedFilter === 'API' || selectedFilter === 'Locales') {
    return true
  }

  return genreMap[selectedFilter].some(item => genre.includes(item))
}

  const filteredMangas = allMangas.filter(manga => {
    const matchSearch =
      manga.title.toLowerCase().includes(search.toLowerCase()) ||
      manga.author.toLowerCase().includes(search.toLowerCase()) ||
      matchGenre(manga.genre, filter)

    if (filter === 'Todos') {
      return matchSearch
    }

    if (filter === 'API') {
      return matchSearch && apiMangas.some(item => item.id === manga.id)
    }

    if (filter === 'Locales') {
      return matchSearch && localMangas.some(item => item.id === manga.id)
    }

    return matchSearch && matchGenre(manga.genre, filter)
  })

  return (
    <main>
      <Helmet>
        <title>Catálogo | MangaVerse</title>
        <meta
          name="description"
          content="Catálogo de mangas y cómics consumido desde una API pública mediante Axios."
        />
        <meta
          property="og:title"
          content="Catálogo | MangaVerse"
        />
        <meta
          property="og:description"
          content="Explora mangas reales obtenidos desde una API pública y registros locales."
        />
      </Helmet>

      <section className="catalog-hero">
        <span className="badge">Catálogo digital</span>

        <h1>Explora mangas y cómics</h1>

        <p>
          Busca tus títulos favoritos, revisa autores, géneros, estados y capítulos
          desde una API pública y desde el catálogo local.
        </p>
      </section>

      <section className="catalog-tools">
        <div className="search-box">
          <label htmlFor="search">
            Buscar manga o cómic
          </label>

          <input
            id="search"
            type="text"
            placeholder="Buscar por título, autor o género"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button type="button" onClick={() => setFilter('Todos')}>Todos</button>
          <button type="button" onClick={() => setFilter('API')}>API</button>
          <button type="button" onClick={() => setFilter('Locales')}>Locales</button>
          <button type="button" onClick={() => setFilter('Acción')}>Acción</button>
          <button type="button" onClick={() => setFilter('Romance')}>Romance</button>
          <button type="button" onClick={() => setFilter('Terror')}>Terror</button>
          <button type="button" onClick={() => setFilter('Fantasía')}>Fantasía</button>
          <button type="button" onClick={() => setFilter('Comedia')}>Comedia</button>
          <button type="button" onClick={() => setFilter('Drama')}>Drama</button>
        </div>
      </section>

      {loading && (
        <p className="info-message">
          Cargando mangas...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!loading && !error && filteredMangas.length === 0 && (
        <p className="info-message">
          No se encontraron mangas o cómics.
        </p>
      )}

      {!loading && !error && filteredMangas.length > 0 && (
        <p className="results-count">
          Resultados encontrados: {filteredMangas.length}
        </p>
      )}

      <section className="manga-grid">
        {filteredMangas.map(manga => (
          <MangaCard
            key={manga.id}
            manga={manga}
          />
        ))}
      </section>
    </main>
  )
}

export default Catalogo