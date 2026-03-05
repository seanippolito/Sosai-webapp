import type { Payload } from 'payload'

// 1x1 transparent PNG (68 bytes)
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
)

const mediaItems = [
  { alt: 'CorVia platform dashboard', caption: 'CorVia leadership assessment dashboard' },
  { alt: 'Banksy financial platform', caption: 'Banksy financial software interface' },
  { alt: 'Multi-tenant CMS architecture', caption: 'CMS platform architecture diagram' },
  { alt: 'Systems integration diagram', caption: 'Enterprise systems integration flow' },
  { alt: 'Cloud architecture overview', caption: 'Cloud infrastructure architecture' },
]

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function seedMedia(payload: Payload) {
  await payload.delete({ collection: 'media', where: {} })

  const created = []
  for (const item of mediaItems) {
    const doc = await payload.create({
      collection: 'media',
      data: item,
      file: {
        data: PLACEHOLDER_PNG,
        mimetype: 'image/png',
        name: `${slugify(item.alt)}.png`,
        size: PLACEHOLDER_PNG.length,
      },
    })
    created.push(doc)
  }

  return { count: created.length, ids: created.map((d) => d.id as number) }
}
