const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
    name: {
        type: String,
        unique : true
    },
    code: {
        type: String,
        unique : true
    }
});

const Countrydata = new mongoose.model('Country', countrySchema);

module.exports = Countrydata;