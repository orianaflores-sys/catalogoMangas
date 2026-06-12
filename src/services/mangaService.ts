import axios from 'axios'
import type { Manga, MangaFormData } from '../types/manga'

const API_URL = 'https://api.jikan.moe/v4/manga'
const STORAGE_KEY = 'mangaverse_mangas'
const FAVORITES_KEY = 'mangaverse_favorites'

export async function getMangasFromApi(): Promise<Manga[]> {
  const response = await axios.get(`${API_URL}?limit=24&order_by=popularity`)

  const mangas: Manga[] = response.data.data.map((item: any) => ({
    id: item.mal_id,
    title: item.title,
    author: item.authors[0]?.name || 'Autor desconocido',
    genre: item.genres[0]?.name || 'Sin género',
    status: item.status || 'Sin estado',
    chapters: item.chapters || 'No especificado',
    image: item.images.jpg.large_image_url || item.images.jpg.image_url,
    description: item.synopsis || 'Sin descripción disponible'
  }))

  return mangas
}

export async function searchMangasFromApi(query: string): Promise<Manga[]> {
  const response = await axios.get(`${API_URL}?q=${query}&limit=12`)

  const mangas: Manga[] = response.data.data.map((item: any) => ({
    id: item.mal_id,
    title: item.title,
    author: item.authors[0]?.name || 'Autor desconocido',
    genre: item.genres[0]?.name || 'Sin género',
    status: item.status || 'Sin estado',
    chapters: item.chapters || 'No especificado',
    image: item.images.jpg.large_image_url || item.images.jpg.image_url,
    description: item.synopsis || 'Sin descripción disponible'
  }))

  return mangas
}

export async function getMangaByIdFromApi(id: number): Promise<Manga> {
  const response = await axios.get(`${API_URL}/${id}`)

  const item = response.data.data

  const manga: Manga = {
    id: item.mal_id,
    title: item.title,
    author: item.authors[0]?.name || 'Autor desconocido',
    genre: item.genres[0]?.name || 'Sin género',
    status: item.status || 'Sin estado',
    chapters: item.chapters || 'No especificado',
    image: item.images.jpg.large_image_url || item.images.jpg.image_url,
    description: item.synopsis || 'Sin descripción disponible'
  }

  return manga
}

export function getLocalMangas(): Manga[] {
  const mangasStorage = localStorage.getItem(STORAGE_KEY)

  if (!mangasStorage) {
    return []
  }

  return JSON.parse(mangasStorage)
}

export function saveLocalMangas(mangas: Manga[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mangas))
}

export function createManga(data: MangaFormData) {
  const mangas = getLocalMangas()

  const newManga: Manga = {
    id: Date.now(),
    title: data.title,
    author: data.author,
    genre: data.genre,
    status: data.status,
    chapters: data.chapters ? Number(data.chapters) : 'No especificado',
    image: data.image,
    description: data.description
  }

  const updatedMangas = [...mangas, newManga]
  saveLocalMangas(updatedMangas)

  return newManga
}

export function updateManga(id: number, data: MangaFormData) {
  const mangas = getLocalMangas()

  const updatedMangas: Manga[] = mangas.map(manga => {
    if (manga.id === id) {
      return {
        id,
        title: data.title,
        author: data.author,
        genre: data.genre,
        status: data.status,
        chapters: data.chapters ? Number(data.chapters) : 'No especificado',
        image: data.image,
        description: data.description
      }
    }

    return manga
  })

  saveLocalMangas(updatedMangas)
}

export function deleteManga(id: number) {
  const mangas = getLocalMangas()
  const updatedMangas = mangas.filter(manga => manga.id !== id)

  saveLocalMangas(updatedMangas)
}

export function getFavoriteMangas(): Manga[] {
  const favoritesStorage = localStorage.getItem(FAVORITES_KEY)

  if (!favoritesStorage) {
    return []
  }

  return JSON.parse(favoritesStorage)
}

export function addFavoriteManga(manga: Manga) {
  const favorites = getFavoriteMangas()

  const exists = favorites.some(item => item.id === manga.id)

  if (exists) {
    return false
  }

  const updatedFavorites = [...favorites, manga]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))

  return true
}

export function removeFavoriteManga(id: number) {
  const favorites = getFavoriteMangas()
  const updatedFavorites = favorites.filter(manga => manga.id !== id)

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
}

export function isFavoriteManga(id: number) {
  const favorites = getFavoriteMangas()

  return favorites.some(manga => manga.id === id)
}