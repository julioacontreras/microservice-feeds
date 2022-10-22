import '@/infrastructure/serverHttpFastify'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { serverHTTP, statusHTTP } from '@/adapters/serverHTTP'

import { FastifyInstance } from 'fastify'

serverHTTP.add('test', {
  useCase: (): HTTPReturn => {
    return {
      response: { foo: 'bar' },
      code: statusHTTP.OK
    }
  },
  method: 'GET',
  route: '/api/test'
})

const app = serverHTTP.createSrv() as FastifyInstance

beforeEach(async () => {
  await app.ready()
})

afterEach(() => {
  app.close()
})

test('default route GET', async () => {

  const res = await app.inject({
    method: 'GET',
    url: '/api/test',
  })

  expect(res.json()).toEqual({ foo: 'bar' })
})
