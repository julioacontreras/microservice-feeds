import { serverHTTP } from '@/adapters/serverHTTP'

import { createFeed } from '@/application/feeds/createFeed'
import { deleteFeed } from '@/application/feeds/deleteFeed'
import { getFeeds } from '@/application/feeds/getFeeds'
import { importFeeds } from '@/application/feeds/importFeeds'

import Method from '@/adapters/serverHTTP/MethodHTTP'

export function useFeeds () {

  const { POST, DELETE, GET } = Method

  serverHTTP.add('importFeeds', {
    useCase: importFeeds,
    method: POST,
    route: '/api/daily-feeds/import'
  })
  
  serverHTTP.add('createFeed', {
    useCase: createFeed,
    method: POST,
    route: '/api/daily-feeds'
  })

  serverHTTP.add('deleteFeed', {
    useCase: deleteFeed,
    method: DELETE,
    route: '/api/daily-feeds/:id'
  })

  serverHTTP.add('getFeeds', {
    useCase: getFeeds,
    method: GET,
    route: '/api/daily-feeds'
  })
  
}
