import cartModel from "../../../../DB/models/Cart..model.js"
import categoryModel from "../../../../DB/models/Category.model.js"
import medicineModel from "../../../../DB/models/Medicine.model.js"
import cloudinary from "../../../utils/cloudnary.js"
// get all medicine (page admin)
export const getAllMedicine = async (req, res, next) => {
    const category = await medicineModel.find()
    return res.json({ message: "Done", category })
}

// create Medicine token is required
export const createMedicine = async (req, res, next) => {
    try {
        const { name, categoryName , expaireDate } = req.body
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }
    
        const checkcategory = await categoryModel.findOne({ name: categoryName })
    
        if (!checkcategory) {
            return res.json({ message: `category is not found` })
        }
    
        const checkmedicine = await medicineModel.findOne({ name })
        if (checkmedicine) {
            return res.json({ message: `medicine is already Exist ${name}` })
        }
    
        if(new Date(expaireDate).getTime() < new Date().getTime()){
            return res.json({ message: `The expiry date has already expired ${expaireDate}` })
        }

        // if (!req.file) {
        //     return res.json({ message: `image is required` })
        // }
        
        // const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `Meds/category/${checkcategory._id}/` })

        // req.body.image = { secure_url, public_id }
    
        req.body.catedgoryId = checkcategory._id
    
        const medicine = await medicineModel.create(req.body)
    
        return res.json({ message: "Done", medicine })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }

}

// update Medicinee token is required
export const updateMedicine = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }
    
        const medicine = await medicineModel.findById(req.params.medicineId)
    
        if(!medicine){
            return res.json({ message: "In-Valid medicine ID " })
        }
    
        if (req.body.name) {
            medicine.name = req.body.name
        }

        if (req.body.descriotion) {
            medicine.descriotion = req.body.descriotion
        }
    
        if (req.body.price) {
            medicine.price = req.body.price
        }
    
        if (req.body.expaireDate) {
            if(new Date(req.body.expaireDate).getTime() < new Date().getTime()){
                return res.json({ message: `The expiry date has already expired ${req.body.expaireDate}` })
            }
            medicine.expaireDate = req.body.expaireDate
        }
    
        if (req.body.categoryName) {
            const checkcategory = await categoryModel.findOne({ name: req.body.categoryName})
            if (!checkcategory) {
                return res.json({ message: `category is not found` })
            }
            medicine.categoryName = req.body.categoryName;
            medicine.catedgoryId = checkcategory._id;
        }

        if(req.file){
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `Meds/category/${medicine.catedgoryId}/` })
            await cloudinary.uploader.destroy(medicine.image.public_id)
            medicine.image = { secure_url, public_id }
        }
    
        await medicine.save()
    
        return res.json({ message: "Done", medicine })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }

}

// delete Medicinee token is required
export const deleteMedicine = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }
    
        const medicine = await medicineModel.findByIdAndDelete({ _id: req.params.medicineId })
        if (!medicine) {
            return res.json({ message: `In-valid medicine ID` })
        }
        await cloudinary.uploader.destroy(medicine.image.public_id)
        await cartModel.updateMany(
            { $pull: { medicineAdd: { medicineId: req.params.medicineId } } }
        );
        return res.json({ message: "Done" })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}

