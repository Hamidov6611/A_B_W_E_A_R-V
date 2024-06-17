const postService = require("../service/post.service.js")

class PostController {
    async getAll(req, res) {
        try {
            const allPosts = await postService.getAll()
            const sendData = {
                count: allPosts.length,
                posts: allPosts
            }
            res.status(200).json(sendData)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async create(req, res) {
        try {
            const post = await postService.create(req.body, req.files.picture)
            res.status(201).json(post)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async delete(req, res) {
        try {
            const post = await postService.delete(req.params.id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async update(req, res) {
        try {
            const post = await postService.update(req.params.id, req.body)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async getOne(req, res) {
        try {
            const post = await postService.getOne(req.params.id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}

module.exports = new PostController()