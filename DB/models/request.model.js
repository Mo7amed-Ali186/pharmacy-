import { Schema, Types, model } from "mongoose";

const requestSchema = new Schema({
   
    name: {
        type: String,

        required: true,
    },
    phone: {
        type: String,
        required: true,

    },
    typeClinic: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        default: "waiting",
        enum: ["rejected", "accepted" , "waiting"]
    },
    userId: { type: Types.ObjectId, ref: "User", required: true }
})

const requestModel = model('request', requestSchema)

export default requestModel