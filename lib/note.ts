import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const notesDirectory = join(process.cwd(), '_notes')

export function getNoteBySlug(slug: string, fields: Array<string> = []): any {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(notesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: any = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}
