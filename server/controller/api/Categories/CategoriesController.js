const Categories = require("../../../model/Categories");
const ChieldCategories = require("../../../model/ChieldCategories");
const Subcategories = require("../../../model/Subcategories");


exports.GetCategoriesList = async (req, res) => {
    try {

        const datas = await Categories.find().select('-__v');
        if (datas) {
            Object.keys(datas).forEach(function (key) {
                var row = datas[key];
                row.photo = "http://localhost:8080/assets/CategoryImage/" + row.photo
            });
            return res.json({
                Success: 1,
                Message: 'Category List',
                CategoryList: datas
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}
exports.GetSubCategoriesList = async (req, res) => {
    try {

        const datas = await Subcategories.find({}).populate('category_id');
        return res.status(200).json({
            Success: 1,
            Message: 'SubCategory List',
            SubCategoryList: datas
        });

    } catch (error) {
        console.log("error:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}
exports.GetChildCategoriesList = async (req, res) => {
    try {

        const datas = await ChieldCategories.find({}).populate('subcategory_id');
        return res.status(200).json({
            Success: 1,
            Message: 'ChildCategory List',
            ChildCategoryList: datas
        });
        // res.status(200).json({
        //     message: "Get All Chield-Categories Data",
        //     status: 200,
        //     Total: datas.length,
        //     data: datas
        // })
    } catch (error) {
        console.log("error:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}


