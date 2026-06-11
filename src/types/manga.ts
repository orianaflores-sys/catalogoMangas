export interface Manga {
  id: number
  title: string
  author: string
  genre: string
  status: string
  chapters: number | string
  image: string
  description: string
}

export interface MangaFormData {
  title: string
  author: string
  genre: string
  status: string
  chapters: string
  image: string
  description: string
}