export function separateSlugFromId(slugWithId: string): { slug: string; id: string } {
  const slug = slugWithId.split('-').slice(0, -1).join('-')
  const id = slugWithId.split('-').at(-1) || ''
  return { slug, id }
}
