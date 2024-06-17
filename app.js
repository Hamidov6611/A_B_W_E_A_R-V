require("dotenv").config()
const express = require("express")
const bootstrap = require("./helpers/connect.js")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser({}))
app.use(express.static("static"))
app.use(fileUpload({}))

// Routes

app.use("/api/post", require("./routes/post.route.js"))
app.use("/api/auth", require("./routes/user.route.js"))

bootstrap(app)