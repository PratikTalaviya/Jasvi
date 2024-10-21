const { sendResponse } = require("../../../functions/sendRes");
const Tax = require("../../../model/Tax")

exports.TaxInfo = async (req, res) => {
    try {
        const data = await Tax.find({  isDeleted: false});
        return res.render('Tax/Tax', {
            TaxData: data,
            message: req.flash('message'),
            error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
}

exports.AddTax = async (req, res) => {
    try {
        res.render('Tax/AddTax',
            {
                message: req.flash('message'),
                error: req.flash('error')
            }
        );
    } catch (error) {
        req.flash('error', error.message);
    }
}

exports.AddTaxActions = async (req, res) => {
    try {
        const TaxDetails = new Tax({
            title: req.body.title,
            tax: req.body.tax,
            status: 0
        })
        const saveTaxData = await TaxDetails.save();

        req.flash('message', 'New Tax Added Successfully.')
        return res.redirect('/admin/Tax');

    } catch (error) {
        // req.flash('error', 'Please Enter Details')
        // return res.redirect('/admin/AddSocialMedia')
        sendResponse(res, 400, { message: error.message });

    }
}

exports.EditTax = async (req, res) => {
    const id = req.params.id
    try {
        const datas = await Tax.findById(id)
        res.render('Tax/EditTax', {
            data: datas,
            message: req.flash('message'),
            error: req.flash('error')
        })
    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
};

exports.EditTaxAction = async (req, res) => {
    try {
        let id = req.params.id

        const updateSocial = Tax.findByIdAndUpdate(
            {
                _id: id
            },
            {
                title: req.body.title,
                tax: req.body.tax
            }
        ).
            then(() => {
                req.flash('message', 'Tax update successfully')
                return res.redirect('/admin/Tax')

            }).catch((error) => {
                req.flash('error', "Not Updated");
                return res.redirect('back')
            });

    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
}

exports.UpdateTaxStatus = async (req, res) => {
    try {
        let id = req.params.id;
        const status = req.params.status;


        const updateSocialStatus = Tax.findByIdAndUpdate(
            {
                _id: id
            },
            {
                status: status
            }
        ).
            then(() => {
                req.flash('message', 'Tax Status Update Successfully')
                return res.redirect('/admin/Tax')

            }).catch((error) => {
                req.flash('error', "Not Updated");
                return res.redirect('back')
            });

    } catch (error) {
        req.flash('error', error.message)
        return res.redirect('back')
    }
}

exports.DeleteTaxAction = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            req.flash('error', 'This Tax Is Not Available')
            return res.redirect('back')
        } else {
           const datas = await Tax.findByIdAndUpdate(
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
        req.flash('error', 'This Tax Is Not Available')
        return res.redirect('back')
    }
}

