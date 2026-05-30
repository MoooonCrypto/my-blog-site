import { createClient } from '@libsql/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function addColumn(sql: string, name: string) {
  try {
    await client.execute(sql)
    console.log(`Migration complete: added ${name} column to social_links`)
  } catch (e: any) {
    if (e.message?.includes('duplicate column')) {
      console.log(`Column ${name} already exists, skipping`)
    } else {
      throw e
    }
  }
}

async function migrate() {
  await addColumn(
    `ALTER TABLE social_links ADD COLUMN show_in_header INTEGER NOT NULL DEFAULT 0`,
    'show_in_header'
  )
  await addColumn(
    `ALTER TABLE social_links ADD COLUMN title TEXT`,
    'title'
  )
  client.close()
}

migrate().catch((e) => { console.error(e); process.exit(1) })
