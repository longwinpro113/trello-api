import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/enviroment'

import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()
  const hostname = 'localhost'
  const port = 3000

  app.use('/v1', APIs_V1) 

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from Mongo Cloud Atlas')
  })
}

(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas!')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Atlas!')
    START_SERVER()
  } catch (error) {
    // console.error(error)
    process.exit(0)
  }
})()