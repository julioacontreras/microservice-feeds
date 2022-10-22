import { logger } from '@/adapters/logger'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

import { useRespository } from '@/repositories/feedRepository'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

export const getFeeds = async (): Promise<HTTPReturn> => {  
  const feedRepository = useRespository()
  const start = new Date()
  start.setHours(0,0,0,0)  
  const end = new Date()
  end.setHours(23,59,59,999)

  try {

    const feeds = await feedRepository.find({
      createdAt:{
        $gte: start,
        $lt: end
      }       
    })
    return {
      response: feeds,
      code: statusHTTP.OK
    } as HTTPReturn

  } catch(e) {

    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR
    
  }
}
