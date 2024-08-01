import userModel from "../../../../DB/models/User.model.js";
import { hash, compare } from "../../../utils/Hash&Compare.js";
import { generateToken } from "../../../utils/generate&VerifyToken.js";


export const signUp = async (req, res, next) => {
    try {
        const {email , password ,cPassword, phone} = req.body; // dustructing 
        if (password != cPassword) {
            return res.json({ message: "confirmationPassword misMatch password" })
        }
        const checakUser = await userModel.findOne({ email }); // object info user or null not find user
        if (checakUser) {
            return res.json({ message: "Exist Email" });
        }
        const hashPassword = hash({ plainText: password });
        const user = await userModel.create({  email, password: hashPassword, phone })
        return res.json({ message: "Done", user });
    } catch (error) {
        return res.json({ message: "Catch Error"});
    }
}

export const signUpAdmin = async (req, res, next) => {
    try {
        const {email , password ,cPassword, phone} = req.body; // dustructing 
        if (password != cPassword) {
            return res.json({ message: "confirmationPassword misMatch password" })
        }
        const checakUser = await userModel.findOne({ email }); // object info user or null not find user
        if (checakUser) {
            return res.json({ message: "Exist Email" });
        }
        const hashPassword = hash({ plainText: password });
        const user = await userModel.create({  email, password: hashPassword, phone , roleType:"Admin" })
        return res.json({ message: "Done", user });
    } catch (error) {
        return res.json({ message: "Catch Error"});
    }
}


export const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ message: "In-Valid Email" });
        }
        const match = compare({plainText:password , hashVlaue:user.password})
        if (!match) {
            return res.json({ message: "In-Valid Password" });
        }
        user.status = "active"
        user.save()
        const token = generateToken({ payload: { id: user._id, role: user.roleType, isLoggedIn: true } })
        return res.json({ message: "Done", token , roleType:user.roleType })
    } catch (error) {
        return res.json({ message: "Catch Error"})
    }
}
