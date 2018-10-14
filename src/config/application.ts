import { ExpressConfig } from './express'
import winston from 'winston'

export class Applicaton {
  server: any
  port = 3000
  logger = winston.createLogger()

  constructor() {
    this.server = new ExpressConfig().app.listen(this.port, () => {
      this.logger.info(`Express Server started to listening at localhost:${this.port}`)
    })
  }
}
