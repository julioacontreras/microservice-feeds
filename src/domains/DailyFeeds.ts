import { Feed } from './Feed'
import { Channel } from './Channel'

export type DailyFeeds = {
    createdAt: unknown
    channel: Channel
    feeds: [Feed]
}
