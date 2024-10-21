require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validatore = require("validator");

const Schema = mongoose.Schema;

const MainAdminSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validatore.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


MainAdminSchema.methods.generateauthtoken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("error:", error);
    }
};


const MainAdmin = mongoose.model("MainAdmin", MainAdminSchema)

module.exports = MainAdmin;