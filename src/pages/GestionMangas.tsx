import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  createManga,
  deleteManga,
  getLocalMangas,
  updateManga
} from '../services/mangaService'
import type { Manga, MangaFormData } from '../types/manga'

const initialForm: MangaFormData = {
  title: '',
  author: '',
  genre: '',
  status: '',
  chapters: '',
  image: '',
  description: ''
}

function GestionMangas() {
  const [mangas, setMangas] = useState<Manga[]>([])
  const [form, setForm] = useState<MangaFormData>(initialForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMangas(getLocalMangas())
  }, [])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  function validateForm() {
    if (
      form.title.trim() === '' ||
      form.author.trim() === '' ||
      form.genre.trim() === '' ||
      form.status.trim() === '' ||
      form.chapters.trim() === '' ||
      form.image.trim() === '' ||
      form.description.trim() === ''
    ) {
      return 'Todos los campos son obligatorios'
    }

    if (form.title.length < 3) {
      return 'El título debe tener mínimo 3 caracteres'
    }

    if (form.author.length < 3) {
      return 'El autor debe tener mínimo 3 caracteres'
    }

    if (Number(form.chapters) < 0) {
      return 'El número de capítulos no puede ser negativo'
    }

    if (!form.image.startsWith('http')) {
      return 'La imagen debe ser una URL válida'
    }

    return ''
  }

  function resetForm() {
    setForm(initialForm)
    setEditingId(null)
  }

  function refreshMangas() {
    setMangas(getLocalMangas())
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setMessage('')

    const validationError = validateForm()

    if (validationError !== '') {
      setError(validationError)
      return
    }

    if (editingId) {
      updateManga(editingId, form)
      setMessage('Manga actualizado correctamente')
      resetForm()
      refreshMangas()
      return
    }

    createManga(form)
    setMessage('Manga registrado correctamente')
    resetForm()
    refreshMangas()
  }

  function handleEdit(manga: Manga) {
    setEditingId(manga.id)

    setForm({
      title: manga.title,
      author: manga.author,
      genre: manga.genre,
      status: manga.status,
      chapters: String(manga.chapters),
      image: manga.image,
      description: manga.description
    })
  }

  function handleDelete(id: number) {
    const confirmDelete = window.confirm('¿Está seguro de eliminar este manga?')

    if (!confirmDelete) {
      return
    }

    deleteManga(id)
    setMessage('Manga eliminado correctamente')
    refreshMangas()
  }

  return (
    <main>
      <Helmet>
        <title>Gestión de mangas | MangaVerse</title>
        <meta
          name="description"
          content="Panel de administración para crear, editar y eliminar mangas."
        />
        <meta
          property="og:title"
          content="Gestión de mangas | MangaVerse"
        />
        <meta
          property="og:description"
          content="CRUD principal de mangas para usuarios administradores."
        />
      </Helmet>

      <section className="page-header">
        <h1>Gestión de mangas</h1>

        <p>
          Registra, actualiza y elimina mangas del catálogo local.
        </p>
      </section>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {message && (
        <p className="success">
          {message}
        </p>
      )}

      <section className="form-card">
        <h2>
          {editingId ? 'Editar manga' : 'Registrar manga'}
        </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Título
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
          />

          <label htmlFor="author">
            Autor
          </label>

          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
          />

          <label htmlFor="genre">
            Género
          </label>

          <input
            id="genre"
            name="genre"
            type="text"
            value={form.genre}
            onChange={handleChange}
          />

          <label htmlFor="status">
            Estado
          </label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Seleccione un estado</option>
            <option value="En emisión">En emisión</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Pausado">Pausado</option>
          </select>

          <label htmlFor="chapters">
            Capítulos
          </label>

          <input
            id="chapters"
            name="chapters"
            type="number"
            value={form.chapters}
            onChange={handleChange}
          />

          <label htmlFor="image">
            URL de imagen
          </label>

          <input
            id="image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
          />

          <label htmlFor="description">
            Descripción
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit">
              {editingId ? 'Actualizar' : 'Registrar'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="table-container">
        <h2>Mangas registrados</h2>

        {mangas.length === 0 && (
          <p>
            No hay mangas registrados todavía.
          </p>
        )}

        {mangas.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Género</th>
                <th>Estado</th>
                <th>Capítulos</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {mangas.map(manga => (
                <tr key={manga.id}>
                  <td>{manga.title}</td>
                  <td>{manga.author}</td>
                  <td>{manga.genre}</td>
                  <td>{manga.status}</td>
                  <td>{manga.chapters}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(manga)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(manga.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  )
}

export default GestionMangas