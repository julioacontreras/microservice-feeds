import '@/infrastructure/logger'
import { logger } from '@/adapters/logger'

test('test log', async () => {
  const message = logger.info('a')
  expect(message).toEqual('a')
})
  
test('test error', async () => {
  const message = logger.error('b')
  expect(message).toEqual('b')
})
  
