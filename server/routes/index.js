const express = require('express')
const routes = express.Router()
const admin = require("./admin")
const api = require("./api")

routes.use("/admin", admin)
routes.use('/api', api)

module.exports = routes;
