const { sendResponse } = require("../../../functions/sendRes");
const ProductReviews = require("../../../model/ProductReviews");


exports.ProductReviews = async (req, res) => {
    try {
        const results = await ProductReviews.find({}).populate('item_id').populate('user_id')
        res.render('ProductReviews/ProductReviews', {
            data: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.UpdateReviewStatus = async (req, res) => {
    const id = req.params.id
    const status = req.params.status;
    try {
        const data = await ProductReviews.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    status: status
                }
            }
        )
            .then(() => {
                res.redirect("back")
            })
            .catch((err) => {
                sendResponse(res, 400, { message: err.message });
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}

exports.ViewProductReview = async (req, res) => {
    const id = req.params.id
    try {
        const results = await ProductReviews.findById(id).populate('item_id').populate('user_id')
        res.render('ProductReviews/ViewProductReview', {
            reviewdata: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}
exports.DeleteProductReview = async (req, res) => {
    const id = req.params.id
    try {
        const data = await ProductReviews.findByIdAndDelete(id)
        const del = ProductReviews.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            req.flash('message', 'Delete Successfully!')
            res.redirect("back")
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}
