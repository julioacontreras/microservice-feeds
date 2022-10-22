import { BaseRepository } from '@/adapters/repository/baseRepository'
import { database, prepareId } from '@/adapters/database'
import { Model } from '@/adapters/database/Model'
import { DailyFeeds } from '@/domains/DailyFeeds'

type Cursor = {
  toArray: () => Promise<[]>
}

export class FeedRepository extends BaseRepository<DailyFeeds> {
  private FeedModel: Model

  constructor () {
    super()
    this.FeedModel = database.collection('dailyFeeds')
  }

  async create (dailyFeeds: DailyFeeds): Promise<boolean> {
    return new Promise ((resolve) => {
      this.FeedModel.insertOne(dailyFeeds)
      resolve(true)
    })
  }

  delete (id: string): Promise<boolean> {
    return new Promise ((resolve) => {
      this.FeedModel.deleteOne({ _id: prepareId(id) })
      resolve(true)
    })    
  }

  async find (filter?: unknown): Promise<DailyFeeds[]> {
    const cursor = await this.FeedModel.find(filter) 
    return (cursor as unknown as Cursor).toArray()
  }
}

export let feedRepository: FeedRepository | null = null

export const useRespository = ():FeedRepository => {
  if (!feedRepository) {
    feedRepository = new FeedRepository()
  }
  return feedRepository
} 

