const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GalleriesSchema = new Schema({
    item_id: {
        type: Schema.Types.ObjectId,
        ref: "item",
        required: true
    },
    photo: [],
    isDelete: {
        type: Boolean,
        default: false
    },
    coverphoto: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Galleries = mongoose.model("galleries", GalleriesSchema)

module.exports = Galleries;