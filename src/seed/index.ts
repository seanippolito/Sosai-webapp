import type { Payload } from 'payload'
import { seedUsers } from './users'
import { seedMedia } from './media'
import { seedServices } from './services'
import { seedProjects } from './projects'
import { seedPosts } from './posts'
import { seedLeads } from './leads'
import { seedSiteSettings } from './site-settings'

export async function seed(payload: Payload) {
  payload.logger.info('Seeding database...')

  const users = await seedUsers(payload)
  payload.logger.info(`Seeded ${users.count} user(s)`)

  const media = await seedMedia(payload)
  payload.logger.info(`Seeded ${media.count} media item(s)`)

  const services = await seedServices(payload)
  payload.logger.info(`Seeded ${services.count} service(s)`)

  const projects = await seedProjects(payload, media.ids)
  payload.logger.info(`Seeded ${projects.count} project(s)`)

  const posts = await seedPosts(payload, users.adminId, media.ids)
  payload.logger.info(`Seeded ${posts.count} post(s)`)

  const leads = await seedLeads(payload)
  payload.logger.info(`Seeded ${leads.count} lead(s)`)

  const siteSettings = await seedSiteSettings(payload)
  payload.logger.info('Seeded site settings')

  return {
    users: users.count,
    media: media.count,
    services: services.count,
    projects: projects.count,
    posts: posts.count,
    leads: leads.count,
    siteSettings: siteSettings.count,
  }
}
