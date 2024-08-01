import * as medicineController from '../medicine/controller/medicine.js'
import auth from "../../middleware/auth.js"
import { Router } from "express";
import { fileUpload , fileValidation } from '../../utils/multer.js';

const router = Router()


router.get('/', medicineController.getAllMedicine) // get all medicine token is required (page admin)

// create Medicine token is required
router.post('/', auth,fileUpload(fileValidation.image).single('image'), medicineController.createMedicine) 

// update Medicinee token is required
router.patch('/:medicineId', auth,fileUpload(fileValidation.image).single('image'), medicineController.updateMedicine)

// delete Medicinee token is required
router.delete('/:medicineId/delete', auth, medicineController.deleteMedicine)  


export default router