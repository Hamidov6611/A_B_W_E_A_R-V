const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model")
const { hash, verify } = require('argon2');

class AuthService {

    async register(email, password) {
        const existUser = await userModel.findOne({ email })

        if (existUser) {
            throw new Error("User already exists")
        }


        const hashedPassword = await hash(password)

        const user = await userModel.create({ email, password: hashedPassword })

        const userDto = new UserDto(user)

        return { data: userDto }
    }

    async activate(id) {
        const user = await userModel.findById(id)

        if (!user) {
            throw new Error("User not found")
        }

        user.isActivated = true
        await user.save()
    }

}

module.exports = new AuthService()

