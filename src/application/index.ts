import { serverHTTP } from '@/adapters/serverHTTP'

import { useFeeds } from './feeds'

export function startApp () {
  useFeeds()
    
  serverHTTP.run()
}
