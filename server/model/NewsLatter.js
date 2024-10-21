const mongoose = require("mongoose");
const validatore = require("validator");


const Schema = mongoose.Schema;

const NewsLatterSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validatore.isEmail(value)) {
                throw new Error("Invalide Email")
            }
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})



const NewsLetter = mongoose.model("newsLetter", NewsLatterSchema)

module.exports = NewsLetter;