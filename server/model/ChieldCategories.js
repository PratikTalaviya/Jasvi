const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChieldCategoriesSchema = new Schema({
    c_name:{
        type:String,
        required:true
    } ,
    slug : {
        type:String,
        required:true
    },
    subcategory_id :{
        type: Schema.Types.ObjectId,
        ref: "subcategories",
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


const ChieldCategories = mongoose.model("chieldCategories", ChieldCategoriesSchema)

module.exports = ChieldCategories;