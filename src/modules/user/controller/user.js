import cartModel from "../../../../DB/models/Cart..model.js"
import userModel from "../../../../DB/models/User.model.js"
import requestModel from "../../../../DB/models/request.model.js"


// get all user token is required (page admin)
export const getAlluser = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }

        const users = await userModel.find({
            roleType: 'Patient'
        }).select("email phone status roleType")

        return res.json({ message: "Done", userList: users })
    } catch (error) {
        return res.json({ message: "Catch Error" })
    }
}

// update user (Admin)
export const updateUser = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }
        const { phone, roleType } = req.body

        const user = await userModel.findById({ _id: req.params.userId })

        if(!user){
            return res.json({ message: "In-Valid user ID" })
        }

        if(phone){
            user.phone = phone
        }

        if(roleType){
            user.roleType = roleType
        }
        await user.save()

        return res.json({ message: "Done", user })
    } catch (error) {
        return res.json({ message: "Catch Error" })
    }
}


// delete user (Admin)
export const deleteUser = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }

        const user = await userModel.findOneAndDelete({ _id: req.params.userId })

        if(!user){
            return res.json({ message: "In-Valid user ID" })
        }

        const cartUser = await cartModel.findOne({userId:req.params.userId})

        if (cartUser) {
            await cartModel.findByIdAndDelete({_id:cartUser._id})
        }

        return res.json({ message: "Done"})
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}

export const adminDec = async (req, res, next) => {
    try {
        const action = req.body.action.toLowerCase()
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }

        const request = await requestModel.findById(req.params.reqId)
        if (!request) {
            return res.json({ message: "In-Valid user ID" })
        }

        if(action == "accepted"){
            request.action = "accepted"
        }else if(action == "rejected"){
            request.action = "rejected"
        }else{
            return res.json({ message: `accepted or rejected only` })
        }

        request.save()

        return res.json({ message: "Done", request })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Catch Error"})
    }
}



export const Resrequest = async (req, res, next) => {
    try {
        const { name , phone , typeClinic} = req.body
        if (req.user.roleType != "Patient") {
            return res.json({ message: "Not authorized Account" })
        }

        const request = await requestModel.create({name , phone ,typeClinic , userId:req.user._id})

        return res.json({ message: "Done", request })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}

export const getReqUser = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }

        const users = await requestModel.find().select(" name phone typeClinic action")

        return res.json({ message: "Done", user: users })
    } catch (error) {
        return res.json({ message: "Catch Error" })
    }
}


export const getReqAllUser = async (req, res, next) => {
    try {
        if (req.user.roleType != "Admin") {
            return res.json({ message: "Not authorized Account" })
        }

        const users = await requestModel.find({}).select(" name  phone  typeClinic action")

        return res.json({ message: "Done", userList: users })
    } catch (error) {
        return res.json({ message: "Catch Error" })
    }
}