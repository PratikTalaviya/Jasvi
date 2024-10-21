const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    Wallet_Amount: {
        type: Number,
        default: 0
    },
    Wallet_Currency: {
        type: String,
        default: ''
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Wallet = mongoose.model("wallet", WalletSchema)

module.exports = Wallet;