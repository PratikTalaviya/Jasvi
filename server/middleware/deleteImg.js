const fs = require('fs')
// const img = require("../img")

const deleteImg = (img) => {
    fs.unlink(img, (err) => {
        if (err) {
            console.log("this is err", err.message)
            return err.message
        }
        else {
            console.log("Old Image Delete Successfully")
        }
    })
}
module.exports = deleteImg
