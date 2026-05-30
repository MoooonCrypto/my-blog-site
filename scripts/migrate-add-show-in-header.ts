import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function migrate() {
  try {
    await client.execute(
      `ALTER TABLE social_links ADD COLUMN show_in_header INTEGER NOT NULL DEFAULT 0`
    )
    console.log('Migration complete: added show_in_header column to social_links')
  } catch (e: any) {
    if (e.message?.includes('duplicate column')) {
      console.log('Column show_in_header already exists, skipping')
    } else {
      throw e
    }
  } finally {
    client.close()
  }
}

migrate().catch((e) => { console.error(e); process.exit(1) })
