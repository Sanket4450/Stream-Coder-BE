import dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'
import { Server } from 'socket.io'

import app from './app'

const bootstrap = async () => {
  const server = createServer(app)

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    console.log('a user is connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  const port = process.env.PORT || 7878

  server.listen(port, () => {
    console.log(`Server is listening on PORT: ${port}`)
  })
}

bootstrap()
