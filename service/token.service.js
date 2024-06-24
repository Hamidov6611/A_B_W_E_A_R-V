const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

class TokenService {
	generateToken(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

		return { accessToken, refreshToken }
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
		return await tokenModel.findOneAndDelete({ refreshToken })
	}

	async findToken(refreshToken) {
		return await tokenModel.findOne({ refreshToken })
	}

	validateRefreshToken(token) {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
		} catch (error) {
			return null
		}
	}

	validateAccessToken(token) {
		try {
			console.log(token)
			console.log(jwt.verify(token, process.env.JWT_ACCESS_SECRET))
			return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		} catch (error) {
			return null
		}
	}
}

module.exports = new TokenService()
