const Contactus = require("../../../model/Contactus")

exports.ContactUs = async (req, res) => {
    try {
        const data = await Contactus.find({isDeleted:false});
        return res.render('ContactUs/ContactUs', {
            ContactusData: data,
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


exports.ContactusDelete = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            req.flash('error', 'This Tax Is Not Available')
            return res.redirect('back')
        } else {
            const datas = await Contactus.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        isDeleted: true
                    }
                }
            )
                .then(() => {
                    res.redirect("back")
                    req.flash('message', 'Delete Successfully!')
                })
                .catch((err) => {
                    sendResponse(res, 400, { message: err.message });
                })

        }
    } catch (error) {
        req.flash('error', 'This Contactus Is Not Available')
        return res.redirect('back')
    }
}