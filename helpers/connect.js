const mongoose = require("mongoose")

const bootstrap = async (app) => {
    const PORT = process.env.PORT
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log("Connected DB"))
        app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

module.exports = bootstrap