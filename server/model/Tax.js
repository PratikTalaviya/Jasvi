const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaxSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})


const Tax = mongoose.model("tax", TaxSchema)

module.exports = Tax;