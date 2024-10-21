const { sendResponse } = require("../../../functions/sendRes");
const Categories = require("../../../model/Categories");
const Galleries = require("../../../model/Galleries");
const Item = require("../../../model/Item");
const Tax = require("../../../model/Tax");
const fs = require('fs')

exports.AllProduct = async (req, res) => {
    try {
        const results = await Item.find({isDeleted: false}).populate('category_id')
        const categoryresults = await Categories.find({})
        const a= res.render('AllProduct/AllProduct', {
            data: results, categoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
        });
        // console.log(a);
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

exports.AddProduct = async (req, res) => {
    try {
        const categoryresults = await Categories.find({})
        const taxsList = await Tax.find({})

        return res.render('AddProduct/AddProduct', {
            CategoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.AddProductAction = async (req, res) => {
    const { title, slug, sort_details, sku_code, In_price, outIn_price, availablefor, category_id, subcategory_id, child_id, color, fabric, pattern, sleeves, size, ptype, weight, customStaching, customType, metaTage } = req.body;
    const mainimages = req.files?.mainimages[0]?.filename
    const photo = req.files?.photo[0]?.filename
    if (!title || !slug || !photo || !sort_details || !outIn_price || !In_price || !sku_code || !category_id || !subcategory_id || !child_id || !weight || !availablefor || !metaTage) {
        req.flash('error', 'Please Enter Details')
        return res.redirect('back')
    }
    const gallaryimg = [];
    const gallaryimgdata = req.files?.galleries
    for (let i = 0; i < gallaryimgdata.length; i++) {
        gallaryimg.push(gallaryimgdata[i]?.filename)
    }
    try {

        const insertadata = new Item({ title, slug, sort_details, sku_code, photo: mainimages, availablefor, In_price, outIn_price, category_id, subcategory_id, child_id, fabric, pattern, sleeves, size, ptype, weight, customStaching, customType, metaTage })
        const savedata = await insertadata.save()
        try {
            if (savedata._id) {
                const item_id = savedata._id;
                if (!item_id) {
                    req.flash('error', 'Please Enter Photos')
                    return res.redirect('back')
                } else {
                    const insertdata = new Galleries({ item_id, color, coverphoto: photo, photo: gallaryimg })
                    const savedata = await insertdata.save()
                }
                req.flash('message', 'New Item Added Successfully.')
                return res.redirect('/admin/AllProduct');
            } else {
                req.flash('error', 'Please Enter Photos')
                return res.redirect('back')
            }
        } catch (error) {
            req.flash('error', 'Please Enter Photos')
            return res.redirect('back')
        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.UpdateProductStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    if (!id || !status) {
        req.flash('error', 'Please Enter details')
        return res.redirect('back')
    }
    try {
        const data = await Item.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    status: status
                }
            })
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
exports.EditProduct = async (req, res) => {
    const id = req.params.id
    try {
        const results = await Item.findById(id)
        const categoryresults = await Categories.find({})
        return res.render('AllProduct/EditProduct', {
            data: results, CategoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.EditProductAction = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        req.flash('error', 'This Item Is Not Available')
        return res.redirect('back')
    }
    const olddataproduct = await Item.findById(id)
    let productImg;
    const images = req.files
    const oldgallrydata = await Galleries.find({ item_id: id })
    if (images?.photo) {
        if (olddataproduct.photo) {
            fs.unlink(`./public/assets/AddProductImage/Photos/${olddataproduct.photo}`, function (error) {
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
    try {
        console.log("productImg", productImg)
        const data = await Item.findByIdAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    photo: productImg,
                    title: req.body.tiltle ? req.body.tiltle : olddataproduct.tiltle,
                    slug: req.body.slug ? req.body.slug : olddataproduct.slug,
                    sort_details: req.body.sort_details ? req.body.sort_details : olddataproduct.sort_details,
                    sku_code: req.body.sku_code ? req.body.sku_code : olddataproduct.sku_code,
                    In_price: req.body.In_price ? req.body.In_price : olddataproduct.In_price,
                    outIn_price: req.body.outIn_price ? req.body.outIn_price : olddataproduct.outIn_price,
                    category_id: req.body.category_id ? req.body.category_id : olddataproduct.category_id,
                    subcategory_id: req.body.subcategory_id ? req.body.subcategory_id : olddataproduct.subcategory_id,
                    child_id: req.body.child_id ? req.body.child_id : olddataproduct.child_id,
                    color: req.body.color ? req.body.color : olddataproduct.color,
                    fabric: req.body.fabric ? req.body.fabric : olddataproduct.fabric,
                    pattern: req.body.pattern ? req.body.pattern : olddataproduct.pattern,
                    sleeves: req.body.sleeves ? req.body.sleeves : olddataproduct.sleeves,
                    size: req.body.size ? req.body.size : olddataproduct.size,
                    ptype: req.body.ptype ? req.body.ptype : olddataproduct.ptype,
                    weight: req.body.weight ? req.body.weight : olddataproduct.weight,
                    availablefor: req.body.availablefor ? req.body.availablefor : olddataproduct.availablefor,
                    customStaching: req.body.customStaching ? req.body.customStaching : olddataproduct.customStaching,
                    customType: req.body.customType ? req.body.customType : olddataproduct.customType,

                }
            }
        )
            .then(() => {
                req.flash('message', 'Item Updated Successfully.')
                return res.redirect('/admin/AllProduct');
            })
            .catch((err) => {
                req.flash('error', err.message)
                res.redirect('back')
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.DeleteProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        req.flash('error', 'This Item Is Not Available')
        return res.redirect('back')
    }
    try {
        try {
            const gallrydata = await Galleries.find({ item_id: id })
            const gallaryphoto = gallrydata.photo
            if (gallaryphoto) {
                for (let i = 0; i < gallaryphoto.length; i++) {
                    fs.unlink(`./public/assets/AddProductImage/Gallery/${gallaryphoto[i]}`, function (error) {
                        if (error) {
                            req.flash('error', error.message)
                            return res.redirect('back')
                        }
                    });
                    const deletedata = await Galleries.findByIdAndDelete(gallrydata._id)
                }
            } else {
                req.flash('error', error.message)
                return res.redirect('back')
            }
        } catch (error) {
            req.flash('error', error.message)
            return res.redirect('back')
        }
        const olddata = await Item.findById(id)
        try {
            if (olddata) {
                fs.unlink(`./public/assets/AddProductImage/Photos/${olddata.photo}`, function (error) {
                    if (error) {
                        req.flash('error', error.message)
                        return res.redirect('back')
                    }
                });
                const deletedata = await Item.findByIdAndDelete(id)
            } else {
                return res.redirect('back')
            }
        } catch (error) {
            req.flash('error', error.message)
            return res.redirect('back')
        }
        req.flash('message', 'Item Delete Successfully')
        return res.redirect('/admin/AllProduct');
    } catch (error) {
        res.redirect("back")
        // sendResponse(res, 400, { message: error.message });
    }
}
exports.CSVImportExport = async (req, res) => {
    try {
        res.render('CSVImportExport/CSVImportExport', { message: req.flash('message'), error: req.flash('error') });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.CSVFileImport = async (req, res) => {
    try {
        const results = await Item.find({})

        return res.render('AllProduct/ViewProduct', {
            data: results, CategoryList: categoryresults, galleriesList: galleriesData, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ViewProduct = async (req, res) => {
    const id = req.params.id
    try {
        const results = await Item.findById(id).populate('category_id').populate('subcategory_id').populate('child_id')
        const categoryresults = await Categories.find({})
        const galleriesData = await Galleries.find({ item_id: id })
        return res.render('AllProduct/ViewProduct', {
            data: results, CategoryList: categoryresults, galleriesList: galleriesData, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.ProductFilterData = async (req, res) => {
    const category_id = req.body?.category_id;
    const orderby = req.body?.orderby;
    try {
        const categoryresults = await Categories.find({})

        if (category_id) {
            const results = await Item.find({ category_id: category_id })
            res.render('AllProduct/AllProduct', {
                data: results, categoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
            });
        } else {
            const results = await Item.find({})
            res.render('AllProduct/AllProduct', {
                data: results, categoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
            });

        }
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}
exports.DeleteSoftProduct = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        req.flash('error', 'This Item Is Not Available');
        return res.redirect('back')
    }
    try {
        const data = await Item.findByIdAndUpdate(
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
            })
            .catch((err) => {
                sendResponse(res, 400, { message: err.message });
            })
    } catch (error) {
        sendResponse(res, 400, { message: error.message })

    }
}



exports.AllColor = async (req, res) => {
    try {
        const results = await Item.find({})
        const categoryresults = await Categories.find({})
        res.render('AllProduct/AllColor', {
            data: results, categoryList: categoryresults, message: req.flash('message'), error: req.flash('error')
        });
    } catch (error) {
        sendResponse(res, 400, { message: error.message });
    }
}

