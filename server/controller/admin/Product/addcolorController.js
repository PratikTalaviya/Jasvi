const { sendResponse } = require("../../../functions/sendRes");
const Galleries = require("../../../model/Galleries");
const Item = require("../../../model/Item")
const fs = require('fs')

exports.addproductcolorpage = async (req, res) => {
    try {
        const data = await Item.find({})
        res.render('AddProduct/AddProductColor', {
            item: data, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}
exports.postcoloadd = async (req, res) => {
    const { item_id, color } = req.body
    const coverphoto = req.files?.coverimg[0]?.filename
    const gallaryimg = [];
    const gallaryimgdata = req.files?.photo
    for (let i = 0; i < gallaryimgdata.length; i++) {
        gallaryimg.push(gallaryimgdata[i]?.filename)
    }
    try {
        const insertdata = new Galleries({ item_id, color, coverphoto, photo: gallaryimg })
        const savedata = await insertdata.save();
        req.flash('message', 'New Item Added Successfully.')
        return res.redirect('/admin/addproductcolor');
    } catch (error) {
        sendResponse(res, 400, { message: error.message })
    }
}


exports.AllColor = async (req, res) => {
    try {
        const results = await Galleries.find({}).populate('item_id')
        res.render('AllProduct/AllColor', {
            data: results, producttitle: results, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.ProductFilterDatacolor = async (req, res) => {
    const productname = req.body?.title;
    try {
        const filterdataresults = await Galleries.find({}).populate('item_id')
        if (productname) {
            const results = await Galleries.find({ item_id: productname }).populate('item_id')
            res.render('AllProduct/AllColor', {
                data: results, producttitle: filterdataresults, message: req.flash('message'), error: req.flash('error')
            });
        } else {
            const results = await Galleries.find({}).populate('item_id')
            res.render('AllProduct/AllColor', {
                data: results, producttitle: filterdataresults, message: req.flash('message'), error: req.flash('error')
            });

        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}


exports.EditColor = async (req, res) => {
    const id = req.params.id
    try {
        const results = await Galleries.findById(id)
        const iteamdata = await Item.find()
        return res.render('AllProduct/EditColor', {
            data: results, item: iteamdata, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.EditColorAction = async (req, res) => {
    const id = req.params.id
    const { item_id, color } = req.body
    const olddataproduct = await Galleries.findById(id)
    const images = req.files
    let productImg;
    let gallarydata = [];
    try {
        if (images?.photo) {
            if (olddataproduct.photo) {
                fs.unlink(`./public/assets/AddProductImage/Photos/${olddataproduct.coverphoto}`, function (error) {
                    if (error) {
                        req.flash('error', error.message)
                        return res.redirect('back')
                    }
                });
                productImg = images.photo[0].filename
            }
        } else {
            productImg = olddataproduct?.photo
        }

        if (images?.galleries) {
            const oldgallaryphoto = olddataproduct.photo
            for (let i = 0; i < oldgallaryphoto.length; i++) {
                const element = oldgallaryphoto?.photo[i]
                fs.unlink(`./public/assets/AddProductImage/Gallery/${element}`, function (error) {
                    if (error) {
                        req.flash('error', error.message)
                        return res.redirect('back')
                    }
                });
            }
            const gallaryimgdata = req.files?.galleries
            for (let i = 0; i < gallaryimgdata.length; i++) {
                gallarydata.push(gallaryimgdata[i]?.filename)
            }
        } else {
            gallarydata = olddataproduct?.photo
        }
    } catch (error) {
        req.flash('error', "images not")
        res.redirect('back')
    }
    try {
        const data = await Galleries.findByIdAndUpdate(
            {
                _id: id
            }, {
            $set: {
                item_id: item_id ? item_id : olddataproduct.item_id,
                color: color ? color : olddataproduct.color,
                coverphoto: productImg,
                photo: gallarydata
            }
        }).then(() => {
            req.flash('message', ' Updated Successfully.')
            return res.redirect('/admin/AllColor');
        }).catch(error => {
            req.flash('error', error.message)
            res.redirect('back')
        })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('back')
    }
}