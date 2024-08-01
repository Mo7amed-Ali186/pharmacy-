import cartModel from "../../../../DB/models/Cart..model.js"
import medicineModel from "../../../../DB/models/Medicine.model.js"


// get all cart of users (Admin)
export const getAllCarts = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" }) 
        }
        const cartList = await cartModel.find().populate(['userId','medicineAdd.medicineId'])
        return res.json({ message: "Done" , cartList })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}


// get cart of user
export const getCartUser = async (req, res, next) => {
    try {
        if (req.user.roleType != "Patient") {
            return res.json({ message: "Not authorized Account" }) 
        }
        const cart = await cartModel.findOne({userId : req.user._id}).populate('medicineAdd.medicineId')
        // if(!cart){
        //     return res.json({ message: "In-valid cart Id"})
        // }
        return res.json({ message: "Done" , cart: cart ?? [] })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}


export const createCart = async (req, res, next) => {
    try {
        // if (req.user.roleType != "Patient") {
        //     return res.json({ message: "Not authorized Account" }) 
        // }
    
        const {medicineId} = req.params
    
        const medicine = await medicineModel.findById(medicineId)
        // check medicine 
        if(!medicine){
            return res.json({ message: "In-Valid medicine Id " })
        }
    
        // check Cart exist
        const cart = await cartModel.findOne({userId : req.user._id})
        // if not exist create new cart
        if(!cart){
            const newCart = await cartModel.create({userId : req.user._id , medicineAdd:[{medicineId}]})
            return res.json({ message: "Done" , cart:newCart })
        }
    
        for (let i = 0; i < cart.medicineAdd.length; i++) {
            if(cart.medicineAdd[i].medicineId == medicineId){
                return res.json({ message: "It has already been added to your cart" })
            }
        }
        cart.medicineAdd.push({medicineId})
        await cart.save()
        return res.json({ message: "Done" , cart })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Catch Error"})
    }
}