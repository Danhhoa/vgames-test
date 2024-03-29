import express, {Express, Request, Response, Application} from 'express'
import dotenv from 'dotenv'
import {initDB} from './src/config/mongodb'
import router from './src/routes'
import bodyParser from 'body-parser'

//For env File
dotenv.config()

const app: Application = express()
const port = process.env.PORT

app.use(bodyParser.json())

initDB()
app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
