const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SocialsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Socials = mongoose.model("socials", SocialsSchema)

module.exports = Socials;   