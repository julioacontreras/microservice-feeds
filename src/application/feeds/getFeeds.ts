import { logger } from '@/adapters/logger'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { DailyFeeds } from '@/domains/DailyFeeds'
import { useRespository } from '@/repositories/feedRepository'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'
import { Feed } from '@/domains/Feed'

type Response = {
  query: {
    max: number
  }
}

export const getFeeds = async (data: unknown): Promise<HTTPReturn> => {
  const response = data as Response  
  const feedRepository = useRespository()
  const start = new Date()
  start.setHours(0,0,0,0)  
  const end = new Date()
  end.setHours(23,59,59,999)

  try {

    const dailyFeedsCollection = (await feedRepository.find({
      createdAt:{
        $gte: start,
        $lt: end
      }       
    })) as unknown as [DailyFeeds]

    const max = response.query?.max || 5
    const result = dailyFeedsCollection.map(dailyFeeds => {
      dailyFeeds.feeds = dailyFeeds.feeds.slice(0, max) as [Feed]  
      return dailyFeeds
    })

    return {
      response: result,
      code: statusHTTP.OK
    } as HTTPReturn

  } catch(e) {

    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR
    
  }
}
