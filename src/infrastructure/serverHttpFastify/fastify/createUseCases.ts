import { FastifyInstance, HTTPMethods } from 'fastify'

import { UseCaseRoute, UseCaseMap } from '@/adapters/serverHTTP/types'

export function createUseCases (useCases: UseCaseMap, server: FastifyInstance) {
  useCases.forEach((value, key) => {
    const useCaseRoute = value as unknown as UseCaseRoute
          
    // -------------------------
    //   route <=> use case
    // -------------------------    
    server.route({
      method: useCaseRoute.method as HTTPMethods,
      url: useCaseRoute.route,
      schema: {},
      handler: async (request, reply) => {
        const useCaseExecute = useCases.get(key)?.useCase
  
        if (!useCaseExecute) {
          return reply
            .status(500)
            .send({ status: `Not exist use case ${key}` })        
        } 
  
        try {
          const returnHTTP = await useCaseExecute({ body: request.body, params: request.params, query: request.query })
          return reply
            .status(returnHTTP.code)
            .send(returnHTTP.response)
        } catch (err) {
          return reply
            .status(500)
            .send({ status: 'internal-error' })
        }
  
      }
    })
    
  })
}
