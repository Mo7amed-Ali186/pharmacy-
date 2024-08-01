import userModel from "../../DB/models/User.model.js";
import { verifyToken } from "../utils/generate&VerifyToken.js";



const auth = async (req, res, next) => {

    try {
        const token = req.headers.token
        if (!token) {
            return res.json({ message: "token is requierd" });
        }
        const decoded = verifyToken({ token })
        // console.log(decoded)
        const authUser = await userModel.findById(decoded.id)
        if (!authUser) {
            return res.json({ message: "Not register account" });
        }
        req.user = authUser
        return next()
    } catch (error) {
        return res.json({ message: "Catch Error" });
    }
}


export default auth