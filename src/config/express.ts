import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { useExpressServer } from 'routing-controllers'
import { PostController } from '../controllers/PostController'
import mongoose from 'mongoose'

export class ExpressConfig {
  app: express.Express
  mongoUrl = 'mongodb://localhost:27017/letsposts'

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.use(cors())
    this.setUpControllers()
    this.setUpMongoose()
  }

  private setUpControllers() {
    useExpressServer(this.app, {
      controllers: [PostController],
    })
  }

  private setUpMongoose(): void {
    mongoose.connect(
      this.mongoUrl,
      { promiseLibrary: global.Promise }
    )
  }
}
