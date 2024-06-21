const mongoose = require('mongoose')

const PORT = process.env.PORT || 8080
const bootstrap = async (app) => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log('Connected DB'))

        app.listen(PORT, () => console.log(`Listening on - http://localhost:${PORT}`))
    } catch (error) {
        console.log(`Error connecting with DB: ${error}`)
    }
}

module.exports = bootstrap