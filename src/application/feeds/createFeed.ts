import { logger } from '@/adapters/logger'

import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

import { DailyFeeds } from '@/domains/DailyFeeds'
import { useRespository } from '@/repositories/feedRepository'
import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

type Response = {
  body: DailyFeeds
}

export const createFeed = async (data: unknown): Promise<HTTPReturn> => {
  const response = data as Response
  const feedRepository = useRespository()

  try {

    const feed = response.body
    feed.createdAt = new Date(feed.createdAt as string)
    
    const isSuccessful = await feedRepository.create(feed)
    return {
      response: {},
      code: isSuccessful ? statusHTTP.OK : statusHTTP.UNAUTHORIZED
    } as HTTPReturn

  } catch(e) {

    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR
    
  }
}
