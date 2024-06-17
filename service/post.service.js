const postModel = require("../models/post.model")
const fileService = require("./file.service")

class PostService {

    async create(post, picture) {
        const fileName = fileService.save(picture)
        const newPost = await postModel.create({ ...post, picture: fileName })
        return newPost
    }

    async getAll() {
        return await postModel.find()
    }

    async delete(id) {
        return await postModel.findByIdAndDelete(id)
    }

    async update(id, post) {
        if (!id) throw new Error("Id is required")

        return await postModel.findByIdAndUpdate(id, post, { new: true })
    }

    async getOne(id) {
        if (!id) throw new Error("Id is required")
        return await postModel.findById(id)
    }

}

module.exports = new PostService()