const authService = require("../service/auth.service")

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await authService.register(email, password)

            res.cookie("refreshToken", data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

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

            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await authService.login(email, password)

            res.cookie("refreshToken", data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

            res.status(200).json(data)
        } catch (error) {
            next(error.message)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie("refreshToken")
            res.status(200).json(token)
        } catch (error) {
            next(error.message)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const data = await authService.refresh(refreshToken)
            res.cookie("refreshToken", data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.status(200).json(data)
        } catch (error) {
            next(error.message)
        }
    }
}

module.exports = new AuthController()