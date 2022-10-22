import { Database } from '@/adapters/database/Database'
import { startDatabase } from '@/adapters/database'
import { database } from './mongodb/connector'
import { prepareId } from './mongodb/prepareId'

import { run } from './mongodb/connector'

async function useDatabase (): Promise<Database> {
  if (!process.env.MONGO_CONNECTION) {
    throw 'ERROR: need declare MONGO_CONNECTION'
  }
  const urlConnection = process.env.MONGO_CONNECTION 
  if (!urlConnection) throw 'Not exist url connection to mongoDB'

  await run(urlConnection)

  return database as Database
}

async function start () {
  startDatabase(await useDatabase(), prepareId)
}

start()
