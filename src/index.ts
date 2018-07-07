// src/index.ts
import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import GameController from './games/controller'

const port = process.env.PORT || 4001

const app = createKoaServer({
   cors: true,
   controllers: [
        GameController,
   ], 
   
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4001'))
  )
  .catch(err => console.error(err))