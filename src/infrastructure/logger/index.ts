import { setLogger } from '@/adapters/logger'

const logger = {
  info (message: string): string {
    console.info(message)
    return message
  },
  error (message: string): string {
    console.error(`%c 💩 ${message}`, 'color: red')
    return message
  }
}

setLogger(logger)
