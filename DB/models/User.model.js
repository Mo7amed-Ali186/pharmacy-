import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String, //to accept 0
    },
    status: {
        type: String,
        default: "in-active",
        enum: ["in-active", "active"]
    },
    roleType: {
        type: String,
        default: "Patient",
        enum: ["Patient", "Admin"]
    }
})

const userModel = model('User', userSchema)

export default userModel