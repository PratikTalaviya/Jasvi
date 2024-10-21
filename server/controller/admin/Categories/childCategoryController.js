const { sendResponse } = require("../../../functions/sendRes");
const ChieldCategories = require("../../../model/ChieldCategories");
const Subcategories = require("../../../model/Subcategories");
const { async } = require("./categoryController");


exports.ChildCategories = async (req, res) => {
    try {
        const results = await ChieldCategories.find({isDeleted: false}).populate({ path: 'subcategory_id', populate: { 'path': 'category_id' } })
        res.render('ChildCategories/ChildCategories', {
            data: results,
            message: req.flash('message'),
            error: req.flash('error')
        });

    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.AddChildCategories = async (req, res) => {
    try {
        const results = await Subcategories.find({})
        res.render('ChildCategories/AddChildCategories', {
            data: results,
            message: req.flash('message'),
            error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

    }
}

exports.AddChildCategoriesAction = async (req, res) => {
    const { c_name, slug, subcategory_id } = req.body
    if (!c_name || !slug || !subcategory_id) {
        req.flash('message', 'Please Enter Details')
        return res.redirect('back')
    }
    try {
        const insertdata = new ChieldCategories({ c_name, slug, status: 1, subcategory_id })
        await insertdata.save()
        req.flash('message', 'New ChieldCategories Added Successfully.')
        return res.redirect('/admin/ChildCategories');
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.UpdateChildCategoriesStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    if (!id || !status) {
        req.flash('error', 'Please Enter details')
        return res.redirect('back')
    }
    try {
        const data = await ChieldCategories.findByIdAndUpdate(
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
        sendResponse(res, 400, { message: error.message });
    }
}
exports.DeleteChildCategories = async (req, res) => {
    try {
        var id = req.params.id;
        const datas = await ChieldCategories.findByIdAndUpdate(
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
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}


exports.EditChildCategories = async (req, res) => {
    const id = req.params.id
    if (!id) {
        req.flash('error', 'category not found')
        return res.redirect('back')
    }
    try {
        const results = await ChieldCategories.findById(id)
        const results1 = await Subcategories.find()
        return res.render('ChildCategories/EditChildCategories', {
            data: results, category: results1, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.EditChildCategoriesAction = async (req, res) => {
    const olddata = await ChieldCategories.findById(req.params.id)
    try {
        const data = await ChieldCategories.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    c_name: req.body.c_name ? req.body.c_name : olddata.c_name,
                    slug: req.body.slug ? req.body.slug : olddata.slug,
                    subcategory_id: req.body.subcategory_id ? req.body.subcategory_id : olddata.subcategory_id,
                }
            }
        )
            .then(() => {
                req.flash('message', 'ChildCategorie Updated Successfully.')
                return res.redirect('/admin/ChildCategories');
            })
            .catch((err) => {
                req.flash('error', "Not Updateed")
                res.redirect('back')
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

