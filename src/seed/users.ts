import type { Payload } from 'payload'

export async function seedUsers(payload: Payload) {
  await payload.delete({ collection: 'users', where: {} })

  const user = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@sosai.tech',
      password: 'admin123',
      role: 'admin',
    },
  })

  return { count: 1, adminId: user.id as number }
}
