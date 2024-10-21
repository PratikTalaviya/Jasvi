const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductReviewsSchema = new Schema({
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
    review: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})


const ProductReviews = mongoose.model("productReviews", ProductReviewsSchema)

module.exports = ProductReviews;