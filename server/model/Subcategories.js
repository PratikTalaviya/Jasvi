const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubcategoriesSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    slug : {
        type:String,
        required:true
    },
    category_id :{
        type: Schema.Types.ObjectId,
        ref: "categories",
        required:true
    },
    status: {
        type: Boolean,
        default: false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})


const Subcategories = mongoose.model("subcategories", SubcategoriesSchema)

module.exports = Subcategories;