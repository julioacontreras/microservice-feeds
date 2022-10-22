import { serverHTTP } from '@/adapters/serverHTTP'

export function startApp () {   
  serverHTTP.run()
}
