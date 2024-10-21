const { sendResponse } = require("../../../functions/sendRes");
const ChieldCategories = require("../../../model/ChieldCategories");
const Subcategories = require("../../../model/Subcategories");


exports.GetSubCatList = async (req, res) => {
    const id = req.body.id;
    try {
        const subcatlist = await Subcategories.find({ category_id: id })
        res.json(subcatlist)
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

    }
}
exports.GetChildCatList = async (req, res) => {
    const id = req.body.id;
    try {
        const childcatlist = await ChieldCategories.find({ subcategory_id: id })
        return res.json(childcatlist)
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

    }
}