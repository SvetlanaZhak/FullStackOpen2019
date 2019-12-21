const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}



blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (exception) {
        next(exception)
    }
})



blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.post("/", async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const user = await User.findById(decodedToken.id)
        if (!body.likes) {
            body.likes = 0
        }
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id,
            likes: body.likes
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())

    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete("/:id", async (request, response, next) => {
    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(403).end()
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body
    console.log('afsfasdfgasdlkgjasdighsadkljf');
    console.log(body);
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try {
        const match = await Blog.findById(request.params.id)
        !blog.title ? blog.likes = match.likes : {}
        !blog.author ? blog.author = match.author : {}
        !blog.url ? blog.url = match.url : {}
        !blog.likes ? blog.likes = match.likes : {}
        const blogUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(blogUpdate.toJSON())
    } catch (exception) {
        next(exception)
    }
})


module.exports = blogsRouter