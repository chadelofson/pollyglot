import express, { Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

import api from "./routes/api"

const app = express()

app.use(helmet())
app.disable('x-powered-by')
app.use(express.json())

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({
  origin: allowedOrigin,
  methods: ['POST']
}))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter)

app.use(morgan("combined"))

//
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"]
  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ error: 'forbidden' })
  }
  next()
})

app.use('/api/v1', api)

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" })
})

export default app