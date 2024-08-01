import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    descriotion: {
        type: String,
        unique: true,
        required: false,
    },
})

const categoryModel = model('Category', categorySchema)

export default categoryModel