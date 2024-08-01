import { Schema, Types, model } from "mongoose";

const medicineSchema = new Schema({
   
    image : {type:Object , required : false},
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    descriotion: {
        type: String,
        required: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    expaireDate: { type: String, required: true },
    categoryName: { type: String, lowercase: true, required: true },
    catedgoryId: { type: Types.ObjectId, ref: "Category", required: true }
})

const medicineModel = model('Medicine', medicineSchema)

export default medicineModel