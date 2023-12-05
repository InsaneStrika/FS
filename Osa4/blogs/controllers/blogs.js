const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
  response.json(blogs)
  })
  
blogsRouter.post('/', middleware.userExtractor, async(request, response) => {
    const body = request.body

    if( !body.title || !body.url) {
      response.status(400).end()
    }

    else {
    const user = request.user
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes | 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    await savedBlog.populate('user', {username:1, name:1})

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.json(savedBlog)
  }
  })

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response) => {

  const blog = await Blog.findById(request.params.id)
  const user = request.user
  
  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else response.status(400) 
})

blogsRouter.put('/:id', async(request, response) => {
  const blog = {
    likes: request.body.likes
  }
  result = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  await result.populate('user', {username:1, name:1})
  response.json(result)

})

module.exports = blogsRouter