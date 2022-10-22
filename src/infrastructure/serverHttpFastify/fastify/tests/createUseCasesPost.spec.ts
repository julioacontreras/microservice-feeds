import '@/infrastructure/serverHttpFastify'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { serverHTTP, statusHTTP } from '@/adapters/serverHTTP'

import { FastifyInstance } from 'fastify'

type Response = {
  body: {
    value: string
  }
}

serverHTTP.add('test', {
  useCase: (data: unknown): HTTPReturn => {
    const response = data as Response

    return {
      response: { foo: response.body.value },
      code: statusHTTP.OK
    }
  },
  method: 'POST',
  route: '/api/test'
})

const app = serverHTTP.createSrv() as FastifyInstance

beforeEach(async () => {
  await app.ready()
})

afterEach(() => {
  app.close()
})

test('default route POST', async () => {

  const res = await app.inject({
    method: 'POST',
    url: '/api/test',
    payload: { value: 'bar' }
  })

  expect(res.json()).toEqual({ foo: 'bar' })
})
