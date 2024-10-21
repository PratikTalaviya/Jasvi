const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MiddlebannerSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    subcategory_id: {
        type: Schema.Types.ObjectId,
        ref: "subcategories",
        required: true
    },
    image: {
        type: String,
        default: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: true
    }
}, {
    timestamps: true
})


const Middlebanner = mongoose.model("middlebanner", MiddlebannerSchema)

module.exports = Middlebanner;