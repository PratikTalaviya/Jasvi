const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Payment = mongoose.model("payment", PaymentSchema)

module.exports = Payment;