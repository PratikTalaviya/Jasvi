const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        // required: true
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


const Reviews = mongoose.model("reviews", ReviewsSchema)

module.exports = Reviews;