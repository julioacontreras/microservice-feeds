import { Database } from './Database'

type PrepareId = (id: string) => void

export let database: Database
export let prepareId: PrepareId

export function startDatabase (newDatabase: Database, newPrepareId: PrepareId): void{
  database = newDatabase
  prepareId = newPrepareId
}


