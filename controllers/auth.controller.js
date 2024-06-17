const authService = require("../service/auth.service")

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body

            const data = await authService.register(email, password)

            res.status(201).json(data)
        } catch (error) {
            console.log(error)

            next(error.message)
        }
    }

    async activate(req, res, next) {
        try {
            const userId = req.params.id

            await authService.activate(userId)

            return res.json({ message: "Account activated" })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController()