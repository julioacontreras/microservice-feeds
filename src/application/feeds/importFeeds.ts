
import { logger } from '@/adapters/logger'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

import { DailyFeeds } from '@/domains/DailyFeeds'

import { useRespository, FeedRepository } from '@/repositories/feedRepository'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'
import { importFeedsElPais, importFeedsElMundo } from '@/core/importDailyFeeds'

const updateFeedsElPais = async (
  start: unknown, 
  end: unknown,
  slugChannel: string, 
  newDailyFeeds: DailyFeeds,
  feedRepository: FeedRepository
) => {
  const dailyFeedsCollection = await feedRepository.find({ 
    'channel.slug': slugChannel,
    createdAt: {
      $gte: start,
      $lt: end
    } 
  })
  if (!dailyFeedsCollection.length) {
    feedRepository.create(newDailyFeeds)
  } 
}


export const importFeeds = async (): Promise<HTTPReturn> => {  
  const feedRepository = useRespository()
  const newDailyFeedsElpais = await importFeedsElPais()
  const newDailyFeedsElMundo = await  importFeedsElMundo()
  const start = new Date()
  start.setHours(0,0,0,0)  
  const end = new Date()
  end.setHours(23,59,59,999)

  try {
    updateFeedsElPais(start, end, 'el-pais', newDailyFeedsElpais, feedRepository)
    updateFeedsElPais(start, end, 'el-mundo', newDailyFeedsElMundo, feedRepository)

    return {
      response: {},
      code: statusHTTP.OK
    } as HTTPReturn

  } catch(e) {

    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR
    
  }
}
