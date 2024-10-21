require("dotenv").config();
const jwt = require("jsonwebtoken");
const MainAdmin = require("../model/MainAdmin")


const authSchema = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        console.log("🚀 ~ file: auth.js:9 ~ authSchema ~ token:", token)
        jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
            if (decoded) {
                await MainAdmin.findOne({ _id: decoded?._id }).then((result) => {
                    req.user = result;
                    next();
                })
            } else {
                return res.status(401).josn({
                    message: "Invalid token!"
                })
            }
        });

    } catch (error) {
        res.status(401).send('Not Match Data');
    }
};

module.exports = authSchema;