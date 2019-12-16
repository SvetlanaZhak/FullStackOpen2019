const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {

    try {
        const blogs = await Blog.find({})
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

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
    })

    try {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body

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