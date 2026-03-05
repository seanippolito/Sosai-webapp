import { getPayload } from 'payload'
import config from '@payload-config'
import { seed } from '@/seed'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return Response.json(
      { error: 'Seed route is disabled in production' },
      { status: 403 },
    )
  }

  try {
    const payload = await getPayload({ config })
    const results = await seed(payload)

    return Response.json({ success: true, results })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
