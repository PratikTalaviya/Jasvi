const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product_id: {
        type: Array,
    },
    productspecification: {
        type: Array,
    },
    return:{
        returnproduct: {
            type: Array,
            defult: ""
        },
        returnReasons:{
            type:String,
            default:""
        },
        returnOrder_id:{
            type:Number,
            default:0
        },
        returnShipment_id:{
            type:Number,
            default:0
        }
    },
    // returnproduct: {
    //     type: Array,
    //     defult: ""
    // },
    ship_orderid: {
        type: Number,
        default: 0,
    },
    ship_shipmentid: {
        type: Number,
        default: 0,
    },
    is_wallet: {
        type: Boolean,
        default: false
    },
    walletDetails: {
        currency: {
            type: String,
            defult: ""
        },
        amount: {
            type: Number,
            default: 0
        }
    },
    payment_method: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    payment_id: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    billing_customer_name: {
        type: String,
        required: true
    },
    billing_last_name: {
        type: String,
        required: true
    },
    billing_address: {
        type: String,
        required: true
    },
    billing_address_2: {
        type: String,
        required: true
    },
    billing_city: {
        type: String,
        required: true
    },
    billing_pincode: {
        type: Number,
        required: true
    },
    billing_state: {
        type: String,
        required: true
    },
    billing_country: {
        type: String,
        required: true
    },
    billing_email: {
        type: String,
        required: true
    },
    billing_phone: {
        type: Number,
        required: true
    },
    shipping_is_billing: {
        type: String,
        required: true
    },
    shipping_customer_name: {
        type: String,
        default: ""
    },
    shipping_last_name: {
        type: String,
        default: ""
    },
    shipping_address: {
        type: String,
        default: ""
    },
    shipping_address_2: {
        type: String,
        default: ""
    },
    shipping_city: {
        type: String,
        default: ""
    },
    shipping_pincode: {
        type: Number,
        default: ""
    },
    shipping_country: {
        type: String,
        default: ""
    },
    shipping_state: {
        type: String,
        default: ""
    },
    shipping_email: {
        type: String,
        default: ""
    },
    shipping_phone: {
        type: Number,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Orders = mongoose.model("orders", OrdersSchema)

module.exports = Orders;