const { sendResponse } = require("../../../functions/sendRes");
const deleteImg = require("../../../middleware/deleteImg");
const Categories = require("../../../model/Categories");
const fs = require('fs')


class categoryController {
    async Categories(req, res, next) {
        try {
            const data = await Categories.find({ isDeleted: false })
            res.render('Categories/Categories', {
                data: data,
                message: req.flash('message'),
                error: req.flash('error')
            })
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
    async AddCategories(req, res) {
        try {
            res.render('Categories/AddCategories', { message: req.flash('message'), error: req.flash('error') });
        } catch (error) {
            sendResponse(res, 400, { message: error.message });

        }
    }
    async AddCategoriesAction(req, res, next) {
        const { name, slug, status, serial } = req.body
        const photo = req.file?.filename;
        if (!name || !slug || !serial) {
            req.flash('message', 'Please Enter Details')
            return res.redirect('back')
        }
        try {
            const exists = await Categories.exists({ name })
            if (exists) {
                req.flash('message', 'This Category already exist')
                return res.redirect('/admin/Categories');
            } else {
                const insertdata = new Categories({ name, slug, serial, photo })
                await insertdata.save()
                req.flash('message', 'New Categories Added Successfully.')
                return res.redirect('/admin/Categories');
            }
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
    async DeleteCategories(req, res, next) {
        try {
            var id = req.params.id;
            // const data = await Categories.findById(id);
            // // deleteImg(data.photo)
            // if (data.photo) {
            //     fs.unlink(`./public/assets/CategoryImage/${data.photo}`, (err) => {
            //         if (err) {
            //             req.flash('error', err.message)
            //             return res.redirect('back')
            //         } else {
            //             console.log("Successfully deleted the file.")
            //         }
            //     });
            // }
            const datas = await Categories.findByIdAndUpdate(
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
            // const del = Categories.findByIdAndDelete(id);
            // del.exec(function (err, data) {
            //     if (err) throw err;
            //     res.redirect("back")
            // });
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
    async UpdateCategoriesStatus(req, res) {
        const id = req.params.id;
        const status = req.params.status;
        if (!id || !status) {
            req.flash('error', 'Please Enter details')
            return res.redirect('back')
        }
        try {
            const data = await Categories.findByIdAndUpdate(
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
    async EditCategories(req, res) {
        const id = req.params.id
        if (!id) {
            req.flash('error', 'category not found')
            return res.redirect('back')
        }
        try {
            const results = await Categories.findById(id)
            return res.render('Categories/EditCategories', {
                data: results, message: req.flash('message'), error: req.flash('error')
            });
        } catch (error) {
            sendResponse(res, 400, { message: error.message });
        }
    }
    async EditCategoriesAction(req, res) {
        let id = req.params.id;
        const { name, slug } = req.body;
        const olddata = await Categories.findById(id)
        const file = req.file;
        let imagesphoto;
        if (file) {
            imagesphoto = req.file.filename
            // deleteImg(olddata.photo)
            if (olddata.photo) {
                fs.unlink(`./public/assets/CategoryImage/${olddata.photo}`, (err) => {
                    if (err) {
                        req.flash('error', err.message)
                        return res.redirect('back')
                    } else {
                        console.log("Successfully deleted the file.")
                    }
                });
            }
        } else {
            imagesphoto = olddata.photo
        }
        try {
            const data = await Categories.findByIdAndUpdate(
                {
                    _id: id
                },
                {
                    $set: {
                        photo: imagesphoto,
                        name: req.body.name ? req.body.name : olddata.name,
                        slug: req.body.slug ? req.body.slug : olddata.slug,
                        serial: req.body.serial ? req.body.serial : olddata.serial,
                    }
                }
            )
                .then(() => {
                    req.flash('message', 'Categories Updated Successfully.')
                    return res.redirect('/admin/Categories');
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
module.exports = new categoryController()