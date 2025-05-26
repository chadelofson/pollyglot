import { Router } from 'express'

import { httpGetTranslation } from "./translate.controller";

const translationRouter = Router()

translationRouter.post('/', httpGetTranslation)

export default translationRouter