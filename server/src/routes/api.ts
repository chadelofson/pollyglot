import { Router } from "express"
import translationRouter from "./translate/translate.router";

const api = Router()

api.use('/translate', translationRouter)

export default api