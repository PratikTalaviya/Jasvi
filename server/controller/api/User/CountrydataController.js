const { sendResponse } = require("../../../functions/sendRes");
const Countrydata = require("../../../model/countryData");
const stateCity = require("../../../model/stateCitiesData");


exports.countryViewAll = async (req, res) => {
    try {
        const data = await Countrydata?.find();
        sendResponse(res, 200, { message: "Get All Country Data", sucess: 1, data: data });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.stateCitiesViewAll = async (req, res) => {
    try {
        const data = await stateCity?.find().select('-__v');
        sendResponse(res, 200, { message: "Get All Country Data", data: data, sucess: 1 });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.CountrystateData = async (req, res) => {
    try {
        const Country = await Countrydata.find({})
        const datas = await stateCity.find({})
        sendResponse(res, 200, { message: "Country and state get Successfully", Country: Country, state: datas, Success: 1 });
    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            status: 400
        })
    }
}