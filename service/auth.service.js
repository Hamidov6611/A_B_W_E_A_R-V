const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model")
const { hash, verify } = require('argon2');
const tokenSevice = require("./token.sevice");
const mailService = require("./mail.service");

class AuthService {

    async register(email, password) {
        const existUser = await userModel.findOne({ email })

        if (existUser) {
            throw new Error("User already exists")
        }


        const hashedPassword = await hash(password)

        const user = await userModel.create({ email, password: hashedPassword })
        const userDto = new UserDto(user)

        await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)


        const tokens = tokenSevice.generateTokens({ ...userDto })

        await tokenSevice.saveToken(userDto.id, tokens.refreshToken)
        return { user: userDto, ...tokens }
    }

    async activate(id) {
        const user = await userModel.findById(id)

        if (!user) {
            throw new Error("User not found")
        }

        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }
 
        const isPassEquals = await verify(user.password, password)

        if (!isPassEquals) {
            throw new Error("Password is wrong")
        }

        const userDto = new UserDto(user)

        const tokens = tokenSevice.generateTokens({ ...userDto })

        await tokenSevice.saveToken(userDto.id, tokens.refreshToken)

        return { user: userDto, ...tokens }
    }

    async logout(refreshToken) {
        return await tokenSevice.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw new Error("No refresh token")
        }

        const userPayload = tokenSevice.validateRefreshToken(refreshToken)

        const tokenFromDb = await tokenSevice.findToken(refreshToken)

        if (!userPayload || !tokenFromDb) {
            throw new Error("No user")
        }

        const user = await userModel.findById(userPayload.id)

        const userDto = new UserDto(user)

        const tokens = tokenSevice.generateTokens({ ...userDto })

        await tokenSevice.saveToken(userDto.id, tokens.refreshToken)

        return { user: userDto, ...tokens }
    }

}

module.exports = new AuthService()

