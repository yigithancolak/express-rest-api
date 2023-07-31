import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { corsOptions } from '../config/corsOptions'
import { errorHandler } from './middleware/errorHandler'
import { authRouter } from './routes/auth'

const expressPort = process.env.PORT || 8888
const app = express()

//middleware for form data
app.use(express.urlencoded({ extended: false }))
//for logs
app.use(morgan('dev'))
// use json for API routes
app.use(express.json())
// cors for api address/port
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('INFO :: Root route called')
})

//routes
app.use('/api/auth', authRouter)

//handling errors with middleware
app.use(errorHandler)

app.listen(expressPort, () => {
  console.log('INFO :: Webserver started on port ' + expressPort)
})
