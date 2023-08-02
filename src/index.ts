import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { connectDB } from './config/connectDB'
import { corsOptions } from './config/corsOptions'
import { errorHandler } from './middleware/errorHandler'
import router from './routes'

config()
connectDB()

const expressPort = process.env.PORT || 8888
const app = express()

//middlewares
app.use(compression())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('INFO :: Root route called')
})

//routes
// app.use('/api/auth', authRouter)
app.use('/api', router())

//handling errors with middleware
app.use(errorHandler)

mongoose.connection.once('open', () => {
  app.listen(expressPort, () => {
    console.log('INFO :: Webserver started on port ' + expressPort)
  })
})

// mongoose.Promise = Promise
// mongoose.connect(process.env.MONGO_URL,{

// })
// mongoose.connection.on('error', (error: Error) => console.log(error))
