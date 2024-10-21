require("dotenv").config();
const userData = require("../model/User");
var jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const token = req?.cookies?.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userData.findOne({ _id: verifyUser._id });
        req.token = token;
        req.user = user;      
        next();
    } catch (error) {
        res.status(400).json({
            message:"Something Went Wrong",
            status:400
        })
    }

}


module.exports = userAuth;