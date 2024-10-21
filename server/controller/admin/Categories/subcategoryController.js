const { sendResponse } = require("../../../functions/sendRes");
const Categories = require("../../../model/Categories");
const model = require("../../../model/index");
const Subcategories = require("../../../model/Subcategories");


class subcategoryController {
    async SubCategories(req, res, next) {
        try {
            const results = await Subcategories.find({isDeleted: false}).populate("category_id")
            res.render('SubCategories/SubCategories', {
                data: results,
                message: req.flash('message'),
                error: req.flash('error')
            });
        } catch (error) {
            sendResponse(res, 400, { message: error.message });

        }
    }
    async AddSubCategories(req, res) {
        try {
            const category = await Categories.find({})
            res.render('SubCategories/AddSubCategories', {
                data: category,
                message: req.flash('message'),
                error: req.flash('error')
            });
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
    async AddSubCategoriesAction(req, res) {
        const { name, slug, category_id } = req.body
        if (!name || !slug || !category_id) {
            req.flash('message', 'Please Enter Details')
            return res.redirect('back')
        }

        try {
            const exists = await Subcategories.exists({ name })
            if (exists) {
                req.flash('message', 'This Category already exist')
                return res.redirect('/admin/SubCategories');
            } else {
                const insertdata = new Subcategories({ name, slug, status: 1, category_id })
                await insertdata.save()
                req.flash('message', 'New SubCategories Added Successfully.')
                return res.redirect('/admin/SubCategories');
            }
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }

    async DeleteSubCategories(req, res) {
        try {
            var id = req.params.id;
            const datas = await Subcategories.findByIdAndUpdate(
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
    async UpdateSubCategoriesStatus(req, res) {
        const id = req.params.id;
        const status = req.params.status;
        if (!id || !status) {
            req.flash('error', 'Please Enter details')
            return res.redirect('back')
        }
        try {
            const data = await Subcategories.findByIdAndUpdate(
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
    async EditSubCategories(req, res) {
        const id = req.params.id
        if (!id) {
            req.flash('error', 'category not found')
            return res.redirect('back')
        }
        try {
            const results1 = await Categories.find({})
            const results = await Subcategories.findById(id)
            return res.render('SubCategories/EditSubCategories', {
                data: results, category: results1, message: req.flash('message'), error: req.flash('error')
            });
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }

    async EditSubCategoriesAction(req, res) {
        const olddata = await Subcategories.findById(req.params.id)
        try {
            const data = await Subcategories.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        name: req.body.name ? req.body.name : olddata.name,
                        slug: req.body.slug ? req.body.slug : olddata.slug,
                        category_id: req.body.category_id ? req.body.category_id : olddata.category_id,
                    }
                }
            )
                .then(() => {
                    req.flash('message', 'SubCategories Updated Successfully.')
                    return res.redirect('/admin/SubCategories');
                })
                .catch((err) => {
                    req.flash('error', "Not Updateed")
                    res.redirect('back')
                })
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
}
module.exports = new subcategoryController()