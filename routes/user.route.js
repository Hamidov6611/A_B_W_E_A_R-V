const express = require("express")
const authController = require("../controllers/auth.controller.js")

const authRoute = express.Router()

authRoute.post("/register", authController.register)
authRoute.get("/activation/:id", authController.activate)
authRoute.post("/login", authController.login)
authRoute.post("/logout", authController.logout)
authRoute.get("/refresh", authController.refresh)

module.exports = authRoute