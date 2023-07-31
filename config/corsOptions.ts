import { CorsOptions } from 'cors'

const whitelist = ['www.mydeploymentlink.com', 'http://localhost:8888']

export const corsOptions: CorsOptions = {
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
