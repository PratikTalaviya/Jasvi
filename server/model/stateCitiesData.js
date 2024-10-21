const mongoose = require("mongoose");

const StartCitySchema = mongoose.Schema({
    city: {
        type: String
    },
    state: {
        type: String
    }
});

const stateCity = new mongoose.model('StartCity', StartCitySchema);

module.exports = stateCity;