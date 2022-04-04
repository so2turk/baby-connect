import express from 'express'
const usersRouter = express.Router()

usersRouter.post('/', createUser).get('/:userId', getUser)

export default usersRouter
