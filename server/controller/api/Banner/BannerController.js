const Banner = require("../../../model/Banner");
const Middlebanner = require("../../../model/Middlebanner");



exports.GetBanner = async (req, res) => {
    try {
        const datas = await Banner.find({});

        Object.keys(datas).forEach(function (key) {
            var row = datas[key];
            row.image = "http://localhost:8080/assets/BannerImage/" + row.image
        });

        return res.send({
            Success: 1,
            Message: 'Get Banner List',
            BannerList: datas
          });
    } catch (error) {
        console.log("error:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}
exports.GetMiddleBanner = async (req, res) => {
    try {
        const datas = await Middlebanner.find({}).populate('category_id').populate('subcategory_id');

        Object.keys(datas).forEach(function (key) {
            var row = datas[key];
            row.image = "http://localhost:8080/assets/MiddleBannerImage/" + row.image
        });

        return res.send({
            Success: 1,
            Message: 'Get Middle Banner List',
            MiddleBannerList: datas
          });
    } catch (error) {
        console.log("error:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
}
