import express from 'express'
import { logout, refreshToken } from '../controller/jwt-controller.js'
import { verifyToken } from '../util/auth.js'
const jwtRouter = express.Router()

jwtRouter.get('/refreshToken', verifyToken, refreshToken)

export default jwtRouter
