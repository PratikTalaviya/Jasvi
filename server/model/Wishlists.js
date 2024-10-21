const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WishlistsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    item_id: {
        type: Schema.Types.ObjectId,
        ref: "item",
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})


const Wishlists = mongoose.model("wishlists", WishlistsSchema)

module.exports = Wishlists;