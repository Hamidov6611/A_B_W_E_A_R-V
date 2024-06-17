const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')
class TokenService {
    generateTokens(payload) {
        const accessToken = this.generateAccessToken(payload)
        const refreshToken = this.generateRefreshToken(payload)

        return {
            accessToken,
            refreshToken
        }
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    }

    async saveToken(userId, refreshToken) {
        const existToken = await tokenModel.findOne({ user: userId })

        if (existToken) {
            existToken.refreshToken = refreshToken
            return existToken.save()
        }

        const token = await tokenModel.create({ user: userId, refreshToken })

        return token

    }

    async removeToken(refreshToken) {
        const token = await tokenModel.findOneAndDelete({ refreshToken })
        return token
    }

    async findToken(refreshToken) {
        const token = await tokenModel.findOne({ refreshToken })
        return token
    }

    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }


}

module.exports = new TokenService()