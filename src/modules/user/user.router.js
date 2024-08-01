import * as userController from '../user/controller/user.js'
import auth from "../../middleware/auth.js"
import { Router } from "express";

const router = Router()


router.get('/',auth , userController.getAlluser) // get all user token is required (page admin)
router.post('/request',auth , userController.Resrequest)
router.patch('/:reqId/waiting',auth , userController.adminDec)
router.get('/request',auth , userController.getReqUser)
router.get('/request/admin',auth , userController.getReqAllUser) // get all user token is required (page admin)


router.put('/:userId/update',auth , userController.updateUser) // update user (Admin)
router.delete('/:userId/delete',auth , userController.deleteUser) // delete user (Admin)


 


export default router