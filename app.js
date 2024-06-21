require('dotenv').config()

const express = require('express')

const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')
const cors = require('cors')
const bootstrap = require('./utils/connection')


const app = express()

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(express.json())
app.use(cookieParser({}))
app.use(express.static('static'))
app.use(fileUpload({}))

// Routes
app.use('/api/post', require('./routes/post.route'))
app.use('/api/auth', require('./routes/auth.route'))

app.use(errorMiddleware)

bootstrap(app)
