const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    serial: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Categories = mongoose.model("categories", CategoriesSchema)

module.exports = Categories;