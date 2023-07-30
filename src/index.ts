import cors, { CorsOptions } from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import { routes } from './routes/auth'

const expressPort = process.env.PORT || 8888
const app = express()

app.use(express.urlencoded({ extended: false }))

const whitelist = ['www.mydeploymentlink.com', 'http://localhost:8888']

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    //after development || !origin will be removed
    if (whitelist.indexOf(origin!) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

//for logs
app.use(morgan('dev'))
// use json for API routes
app.use(express.json())
// cors for api address/port
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.send('INFO :: Root route called')
})

routes(app)

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err)
  res.status(500).send(err.message)
})

app.listen(expressPort, () => {
  console.log('INFO :: Webserver started on port ' + expressPort)
})
