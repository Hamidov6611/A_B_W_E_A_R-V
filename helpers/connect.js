const mongoose = require("mongoose")

const bootstrap = async (app) => {
    try {
        await mongoose.connect(process.env.DB_URL).then(() => console.log("Connected DB"))
        app.listen(process.env.PORT, () => console.log(`Server started on port http://localhost:${process.env.PORT}`))
    } catch (error) {
        console.log(error)
    }
}

module.exports = bootstrap