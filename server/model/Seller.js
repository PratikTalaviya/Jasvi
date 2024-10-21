const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    Adminname: {
        type: String
    },
    AdminlastNname: {
        type: String
    },
    Adminaddress: {
        type: String
    },
    Adminaddress2: {
        type: String
    },
    AdminCity: {
        type: String
    },
    AdminCountry: {
        type: String
    },
    AdminPincode: {
        type: Number
    },
    AdminState: {
        type: String
    },
    AdminEmail: {
        type: String
    },
    channelId: {
        type: Number
    },
    Adminphone: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Seller = mongoose.model("seller", SellerSchema)

module.exports = Seller;