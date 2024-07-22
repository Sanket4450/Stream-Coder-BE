import express from 'express'
import cors from 'cors'
import httpStatus from 'http-status'

import { initializeDB } from './config/data-source'
import { redis } from './config/redis'
import router from './routes'
import { errorConverter, errorHandler } from './middlewares/error'

const app = express()

initializeDB()

redis.on('ready', () => {
  console.log('Redis connection established successfully')
})

redis.on('error', (err) => {
  console.error(`Failed to connect to Redis: ${err.message}`)
})

app.use(
  cors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Upgrade',
      'Authorization',
      'Content-Type',
      'Accept',
    ],
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (_, res) => {
  res.sendStatus(httpStatus.OK)
})

app.use('/api', router)

app.use(errorConverter)
app.use(errorHandler)

export default app
