import '@/infrastructure/serverHttpFastify'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { serverHTTP, statusHTTP } from '@/adapters/serverHTTP'

import { FastifyInstance } from 'fastify'

type Response = {
  params: {
    id: string
  }
}

serverHTTP.add('test', {
  useCase: (data: unknown): HTTPReturn => {
    const response = data as Response
    return {
      response: { foo: response.params.id },
      code: statusHTTP.OK
    }
  },
  method: 'DELETE',
  route: '/api/test/:id'
})

const app = serverHTTP.createSrv() as FastifyInstance

beforeEach(async () => {
  await app.ready()
})

afterEach(() => {
  app.close()
})

test('default route DELETE', async () => {

  const res = await app.inject({
    method: 'DELETE',
    url: '/api/test/1',
  })

  expect(res.json()).toEqual({ foo: '1' })
})
