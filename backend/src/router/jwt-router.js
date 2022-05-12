import express from 'express'
import { logout, refreshToken } from '../controller/jwt-controller.js'
const jwtRouter = express.Router()

jwtRouter.get('/refreshToken', refreshToken)

export default jwtRouter
