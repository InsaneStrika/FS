const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Crypto blog',
    author: 'Coinmarketcap',
    url: 'https://coinmarketcap.com/',
    likes: 100
  },
  {
    title: 'Random blog',
    author: 'Idk',
    url: 'https://youtube.com/',
    likes: 1000
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}