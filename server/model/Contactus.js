const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactusSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})


const Contactus = mongoose.model("contactus", ContactusSchema)

module.exports = Contactus;