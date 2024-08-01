import mongoose from "mongoose";

const connectDB = async () => {
    return await mongoose.connect("mongodb://127.0.0.1:27017/Meds").then((result) => {
        // console.log(result)
        console.log("connected DB......")
    }).catch((err) => {console.log(err)})
}


export default connectDB










