import express from 'express'
import { login,register } from '../controllers/userController.js'

const userRouter = express()

userRouter.post("/register",register)
userRouter.post("/login",login)

export default userRouter;