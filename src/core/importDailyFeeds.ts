import { Channel } from '../domains/Channel'
import { DailyFeeds } from '../domains/DailyFeeds'

import axios from 'axios'
import * as cheerio from 'cheerio'

export const importFeedsElPais = async (): Promise<DailyFeeds> => {
  const channel = {
    title: 'El Pais',
    slug: 'el-pais',
    link: 'https://elpais.com/'
  } as Channel

  const dailyFeeds = {
    channel,
    feeds: [],
    createdAt: new Date()
  } as unknown as DailyFeeds

  const pageContent = await axios.get(channel.link)
  const $ = cheerio.load(pageContent.data)
  $('.c_t a').map((_, el) => {
    const obj = $(el)
    const title = obj.text()
    const link = obj.attr('href')
    if (title && link) {
      dailyFeeds.feeds.push({
        title, link 
      })
    }
  })

  return dailyFeeds as DailyFeeds
}

export const importFeedsElMundo = async (): Promise<DailyFeeds> => {
  const channel = {
    title: 'El Mundo',
    slug: 'el-mundo',
    link: 'https://www.elmundo.es/espana.html'
  } as Channel

  const dailyFeeds = {
    channel,
    feeds: [],
    createdAt: new Date()
  } as unknown as DailyFeeds

  const pageContent = await axios.request({ 
    method: 'GET',
    url: dailyFeeds.channel.link,
    responseEncoding: 'latin1' 
  })
  const $ = cheerio.load(pageContent.data, { decodeEntities: true })
  $('.ue-c-cover-content__main a').map((_, el) => {
    const obj = $(el)
    const title = Buffer.from(obj.find('h2').text(), 'utf-8').toString()
    const link = obj.attr('href')
    if (title && link) {
      dailyFeeds.feeds.push({ title, link })
    }
  })

  return dailyFeeds as DailyFeeds  
}
