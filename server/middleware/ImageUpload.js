
const multer = require('multer');
// var fs = require('fs');

module.exports.CategoryImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "public/assets/CategoryImage")
        },
        filename: function (req, file, cb) {
            return cb(null, file.originalname);
        }
    })
}).single("cat_image");

module.exports.BrandsImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "public/assets/BrandImage")
        },
        filename: function (req, file, cb) {
            return cb(null, file.originalname);
        }
    })
}).single("brand_photo");

module.exports.AddProduct_Gallery = multer({
    storage: multer.diskStorage({
        destination: function (req, files, cb) {
            if (files.fieldname == 'galleries') {
                return cb(null, "public/assets/AddProductImage/Gallery")
            } else {
                return cb(null, "public/assets/AddProductImage/Photos")
            }
        },
        filename: function (req, files, cb) {
            return cb(null, files.originalname);
        }
    })
}).fields([{ name: "galleries", maxCount: 10 }, { name: "photo", maxCount: 10 }])

module.exports.AddMain_product = multer({
    storage: multer.diskStorage({
        destination: function (req, files, cb) {
            if (files.fieldname == 'galleries') {
                return cb(null, "public/assets/AddProductImage/Gallery")
            } else if (files.fieldname == 'photo') {
                return cb(null, "public/assets/AddProductImage/Photos")
            } else {
                return cb(null, "public/assets/AddProductImage/mainimages")
            }
        },
        filename: function (req, files, cb) {
            return cb(null, files.originalname);
        }
    })
}).fields([{ name: "galleries", maxCount: 10 }, { name: "photo", maxCount: 10 }, { name: "mainimages", maxCount: 1 }])



module.exports.addproctcolor = multer({
    storage: multer.diskStorage({
        destination: function (req, files, cb) {
            if (files.fieldname == 'photo') {
                return cb(null, "public/assets/AddProductImage/Gallery")
            } else {
                return cb(null, "public/assets/AddProductImage/Photos")
            }
        },
        filename: function (req, files, cb) {
            return cb(null, files.originalname);
        }
    })
}).fields([{ name: "coverimg", maxCount: 1 }, { name: "photo", maxCount: 10 }])

module.exports.CSVFile1 = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "public/assets/CSVFile")
        },
        filename: function (req, file, cb) {
            return cb(null, file.originalname);
        }
    })
}).single("csvadd");

module.exports.SocialIcon = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "public/assets/SocialIcon")
        },
        filename: function (req, file, cb) {
            return cb(null, file.originalname);
        }
    })
}).single("icon");

module.exports.BannerImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "public/assets/BannerImage")
        },
        filename: function (req, file, cb) {
            return cb(null, file.originalname);
        }
    })
}).single("image");

module.exports.MiddleBannerImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, "public/assets/MiddleBannerImage")
        },
        filename: function (req, file, cb) {
            // return cb(null,file.originalname);
            return cb(null, `${Date.now()}_${file.originalname}`);
        }
    })
}).single("image");