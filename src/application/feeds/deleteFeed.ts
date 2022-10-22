import { logger } from '@/adapters/logger'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'

import { useRespository } from '@/repositories/feedRepository'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

type Response = {
  params: {
    id: string
  }
}

export const deleteFeed = async (data: unknown): Promise<HTTPReturn> => {  
  const response = data as Response
  const feedRepository = useRespository()

  if (!response?.params?.id) {
    return {
      response: {
        message: 'error: need id to delete this register'
      },
      code: statusHTTP.INTERNAL_SERVER_ERROR
    }
  }

  try {

    const isSuccessful = await feedRepository.delete(response.params.id)
    return {
      response: {},
      code: isSuccessful ? statusHTTP.OK : statusHTTP.UNAUTHORIZED
    } as HTTPReturn

  } catch(e) {

    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR
    
  }
}
