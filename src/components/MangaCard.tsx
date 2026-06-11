import { Link } from 'react-router-dom'
import type { Manga } from '../types/manga'

interface Props {
  manga: Manga
}

function MangaCard({ manga }: Props) {
  return (
    <article className="manga-card">
      <div className="manga-image-box">
        <img
          src={manga.image}
          alt={`Portada de ${manga.title}`}
          loading="lazy"
          decoding="async"
          width="225"
          height="320"
        />
      </div>

      <div className="manga-card-content">
        <div className="genre-list">
          {manga.genre.split(',').map(genre => (
            <span
              key={genre.trim()}
              className="genre-pill"
            >
              {genre.trim()}
            </span>
          ))}
        </div>

        <h2>{manga.title}</h2>

        <p>
          <strong>Autor:</strong> {manga.author}
        </p>

        <p>
          <strong>Estado:</strong> {manga.status}
        </p>

        <p>
          <strong>Capítulos:</strong> {manga.chapters}
        </p>

        <p className="description">
          {manga.description.length > 100
            ? `${manga.description.substring(0, 100)}...`
            : manga.description}
        </p>

        <Link
          className="detail-link"
          to={`/manga/${manga.id}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default MangaCard