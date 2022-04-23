import express from 'express'
import {
	createUser,
	deleteUser,
	getUser,
	login,
	refreshUserToken,
	updateUser,
	userDetails,
} from '../controller/users-controller.js'
import { verify } from '../util/auth.js'
const usersRouter = express.Router()

usersRouter
	.post('/register', createUser)
	.post('/login', login)
	.get('/details', verify, userDetails)
	.get('/details/:userId', verify, getUser)
	.delete('/delete/:userId', verify, deleteUser)
	.patch('/update/:userId', verify, updateUser)
	.post('/refresh', refreshUserToken)

export default usersRouter
