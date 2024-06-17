const express = require("express")
const postControllers = require("../controllers/post.controllers.js")

const postRoute = express.Router()

postRoute.get(`/get`, postControllers.getAll)
postRoute.post(`/create`, postControllers.create)
postRoute.delete(`/delete/:id`, postControllers.delete)
postRoute.put(`/update/:id`, postControllers.update)
postRoute.get('/get-one/:id', postControllers.getOne)


module.exports = postRoute