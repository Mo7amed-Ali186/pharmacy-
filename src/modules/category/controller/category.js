import categoryModel from "../../../../DB/models/Category.model.js";
import medicineModel from "../../../../DB/models/Medicine.model.js";

// get all category ( home page )
export const getCategory = async (req, res, next) => {
    const category = await categoryModel.find()
    return res.json({ message: "Done" , category })
}

// get medicine of category  (page medicine)
export const getMedOfCategory = async (req, res, next) => {
    try {
        if(!await categoryModel.findById(req.params.categoryId)){
            return res.json({ message: `In-valid category id` })
        }
        const medicine = await medicineModel.find({catedgoryId: req.params.categoryId})
        return res.json({ message: "Done", medicineList:medicine })
    } catch (error) {
        return res.json({ message: "Catch Error" })
    }
}

// create category token is required
export const createCategory = async (req, res, next) => {
    try {
        const name = req.body.name.toLowerCase();
        const descriotion = req.body.descriotion.toLowerCase();

        if(req.user.roleType != "Admin"){
            return res.json({ message: "Not authorized Account" })
        }
    
        const checkCategory = await categoryModel.findOne({ name })
        if (checkCategory) {
            return res.json({ message: `Duplicate category name ${name}` })
        }
        const category = await categoryModel.create({name , descriotion})
        return res.json({ message: "Done" , category})
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}

 //upaate category token is required
export const updateCategory = async (req, res, next) => {
    try {
        const name = req.body.name.toLowerCase();
        const descriotion = req.body.descriotion.toLowerCase();
        if(req.user.roleType != "Admin"){
            return res.json({ message: "Not authorized Account" })
        }
    
        const category = await categoryModel.findById(req.params.categoryId)
        if (!category) {
            return res.json({ message: `In-valid category id` })
        }
    
        if (await categoryModel.findOne({name}) ) {
            return res.json({ message: `Duplicate category name ${name}` })
        }
        category.name = name;
        category.descriotion = descriotion;
        await category.save()
        return res.json({ message: "Done" , category})
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }

}

//delete category token is required
export const deleteCategory = async (req, res, next) => {
    try {
        if(req.user.roleType != "Admin"){
            return res.json({ message: "Not authorized Account" })
        }
    
        const category = await categoryModel.findByIdAndDelete(req.params.categoryId)
        if (!category) {
            return res.json({ message: `In-valid category id` })
        }
        await medicineModel.deleteMany({catedgoryId : req.params.categoryId})
        return res.json({ message: "Done"})
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}