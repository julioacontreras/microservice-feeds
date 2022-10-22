import { Feed } from './Feed'
import { Channel } from './Channel'

export type DailyFeeds = {
    createdAt: number
    channel: Channel
    feeds: [Feed]
}
