const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose);
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
    child_id: {
        type: Schema.Types.ObjectId,
        ref: "chieldCategories",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    sku_code: {
        type: String,
        required: true
    },
    sort_details: {
        type: String,
        required: true
    },
    availablefor: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    // ptype: {
    //     type: String,
    //     required: true
    // },
    In_price: {
        type: Number,
        required: true
    },
    outIn_price: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    fabric: {
        type: String,
    },
    pattern: {
        type: String,
    },
    sleeves: {
        type: String,
    },
    weight: {
        type: Float,
        required: true
    },

    metaTage: {
        type: String
    },
    customStaching: {
        type: Boolean,
        default: false
    },
    customType: {
        type: String,
        default: 'New'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Item = mongoose.model("item", ItemSchema)

module.exports = Item;