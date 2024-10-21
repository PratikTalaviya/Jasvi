const { sendResponse } = require("../../../functions/sendRes");
const deleteImg = require("../../../middleware/deleteImg");
const Categories = require("../../../model/Categories");
const Middlebanner = require("../../../model/Middlebanner");
const fs = require('fs');

exports.MiddleBanner = async (req, res) => {  
    try {
        const results = await Middlebanner.find({}).populate('category_id').populate('subcategory_id');
        res.render('MiddleBanner/MiddleBanner', {
            data: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.AddMiddleBanner = async (req, res) => {
    try {
        const categoryresults = await Categories.find()
        return res.render('MiddleBanner/AddMiddleBanner', {
            CategoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.AddMiddleBannerActions = async (req, res) => {
    const { category_id, subcategory_id, title, description } = req.body;
    const image = req.file?.filename;
    if (!category_id || !subcategory_id || !title || !description || !image) {
        req.flash('error', 'Please Enter Details')
        return res.redirect('/AddMiddleBanner')
    }
    try {
        const insertdata = new Middlebanner({ category_id, subcategory_id, title, description, image })
        const data = await insertdata.save()
        req.flash('message', 'MiddleBanner Added Successfully.')
        return res.redirect('/admin/MiddleBanner');
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.EditMiddleBanner = async (req, res) => {
    const id = req.params.id
    try {
        const categoryresults = await Categories.find()
        const results = await Middlebanner.findById(id)
        return res.render('MiddleBanner/EditMiddleBanner', {
            CategoryList: categoryresults, data: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

    }
}
exports.EditMiddleBannerActions = async (req, res) => {
    let id = req.params.id;
    const olddata = await Middlebanner.findById(id)
    const file = req.file;
    let imagesphoto;
    if (file) {
        imagesphoto = req.file.filename
        if (olddata.image) {
            fs.unlink(`./public/assets/MiddleBannerImage/${olddata.image}`, (err) => {
                if (err) {
                    req.flash('error', err.message)
                    return res.redirect('back')
                } else {
                    console.log("Successfully deleted the file.")
                }
            });
        }
    } else {
        imagesphoto = olddata.image
    }
    try {
        const data = await Middlebanner.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    image: imagesphoto,
                    title: req.body.title ? req.body.title : olddata.title,
                    description: req.body.description ? req.body.description : olddata.description,
                    category_id: req.body.category_id ? req.body.category_id : olddata.category_id,
                    subcategory_id: req.body.subcategory_id ? req.body.subcategory_id : olddata.subcategory_id,
                }
            }
        )
            .then(() => {
                req.flash('message', 'Banner Updated Successfully.')
                return res.redirect('/admin/MiddleBanner');
            })
            .catch((err) => {
                req.flash('error', "Not Updateed")
                res.redirect('back')
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.DeleteMiddleBannerAction = async (req, res) => {
    const id = req.params.id
    try {
        const olddata = await Middlebanner.findById(id)
        if (olddata.image) {
            fs.unlink(`./public/assets/MiddleBannerImage/${olddata.image}`, (err) => {
                if (err) {
                    req.flash('error', err.message)
                    return res.redirect('back')
                } else {
                    console.log("Successfully deleted the file.")
                }
            });
        }
        // deleteImg(olddata.image)
        const del = Middlebanner.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            req.flash('message', 'Delete Successfully!')
            res.redirect("back")
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });

    }
}