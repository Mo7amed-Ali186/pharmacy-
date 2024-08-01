import * as cartController from '../cart/controller/cart.js'
import auth from "../../middleware/auth.js"
import { Router } from "express";

const router = Router()


router.get('/',auth , cartController.getAllCarts) // get all carts (admin)

router.get('/user',auth , cartController.getCartUser) // get cart (user)

router.post('/:medicineId',auth , cartController.createCart) // added medicine 



export default router