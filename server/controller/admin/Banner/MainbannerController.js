const { sendResponse } = require("../../../functions/sendRes");
const deleteImg = require("../../../middleware/deleteImg");
const Banner = require("../../../model/Banner");
const fs = require('fs');

exports.Banner = async (req, res) => {
    try {
        const results = await Banner.find({});
        res.render('Banner/Banner', {
            data: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.AddBanner = async (req, res) => {
    try {
        res.render('Banner/AddBanner', { message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.AddBannerActions = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file.filename;
    if (!title || !description || !image) {
        req.flash('error', 'Please Enter Details')
        return res.redirect('/admin/AddBanner')
    }
    try {
        const inserbanner = new Banner({ title, description, image })
        const savedata = await inserbanner.save();
        req.flash('message', 'Banner Added Successfully.')
        return res.redirect('/admin/Banner');
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.DeleteBannerAction = async (req, res) => {
    const id = req.params.id
    try {
        const olddata = await Banner.findById(id)
        if (olddata.image) {
            fs.unlink(`./public/assets/BannerImage/${olddata.image}`, (err) => {
                if (err) {
                    req.flash('error', err.message)
                    return res.redirect('back')
                } else {
                    console.log("Successfully deleted the file.")
                }
            });
        }
        const del = Banner.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            req.flash('message', 'Delete Successfully!')
            res.redirect("back")
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.EditBanner = async (req, res) => {
    const id = req.params.id
    try {
        const results = await Banner.findById(id)
        return res.render('Banner/EditBanner', {
            data: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.EditBannerActions = async (req, res) => {
    let id = req.params.id;
    const olddata = await Banner.findById(id)
    const file = req.file;
    let imagesphoto;
    if (file) {
        imagesphoto = req.file.filename
        if (olddata.image) {
            fs.unlink(`./public/assets/BannerImage/${olddata.image}`, (err) => {
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
        const data = await Banner.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    image: imagesphoto,
                    title: req.body.title ? req.body.title : olddata.title,
                    description: req.body.description ? req.body.description : olddata.description,
                }
            }
        )
            .then(() => {
                req.flash('message', 'Banner Updated Successfully.')
                return res.redirect('/admin/Banner');
            })
            .catch((err) => {
                req.flash('error', "Not Updateed")
                res.redirect('back')
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}



