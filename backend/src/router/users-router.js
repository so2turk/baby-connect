import express from 'express'
} from '../controller/users-controller.js'
import { verify } from '../util/auth.js'
const usersRouter = express.Router()

usersRouter.post('/', createUser).get('/:userId', getUser)

export default usersRouter
