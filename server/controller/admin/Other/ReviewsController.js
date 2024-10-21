const Reviews = require("../../../model/Reviews")

exports.ReviewsInfo = async (req, res) => {
    try {
        const datas = await Reviews.find({}).populate("user");
        
        return res.render('WebReviews/Reviews', {
            data: datas,
            message: req.flash('message'), error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}