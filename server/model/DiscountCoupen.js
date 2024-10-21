const mongoose = require("mongoose");
const validatore = require("validator");


const Schema = mongoose.Schema;

const DiscountCoupenSchema = new Schema({
    coupen_name: {
        type: String,
        required: true
    },
    coupen_code: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    amtL: {
        type: Number
    },
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})



const DiscountCoupen = mongoose.model("discountCoupen", DiscountCoupenSchema)

module.exports = DiscountCoupen;