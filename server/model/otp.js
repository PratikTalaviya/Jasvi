const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    phone: {
        type: String,
        require: true
    },
    otp: {
        type: String,
        require: true
    },
    messagefor: {
        type: String,
        default: "Login"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const otp = mongoose.model("otp", otpSchema)

module.exports = otp;