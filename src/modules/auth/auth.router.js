import * as authController from '../auth/controller/auth.js'
import { Router } from "express";

const router = Router()

//get send data in url
//post send more Security
router.post('/signUp',authController.signUp)
router.post('/signUpAdmin',authController.signUpAdmin)

router.post('/logIn',authController.logIn )

export default router