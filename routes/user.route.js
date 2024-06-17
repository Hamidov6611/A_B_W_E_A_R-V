const express = require("express")
const authController = require("../controllers/auth.controller.js")

const authRoute = express.Router()

authRoute.post("/register", authController.register)
authRoute.get("/activation/:id", authController.activate)

module.exports = authRoute