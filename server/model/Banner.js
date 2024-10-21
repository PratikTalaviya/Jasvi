const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description	: {
        type: String,
        default: true
    }
}, {
    timestamps: true
})


const Banner = mongoose.model("banner", BannerSchema)

module.exports = Banner;