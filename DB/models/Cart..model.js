import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    medicineAdd: [{
        medicineId: { type: Types.ObjectId, ref: 'Medicine', required: true },
    }]


}, {
    timestamps: true
});


const cartModel = mongoose.models.Cart || model('Cart', cartSchema);

export default cartModel;