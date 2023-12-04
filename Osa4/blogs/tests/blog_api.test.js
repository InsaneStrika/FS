const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Roth', passwordHash: passwordHash })
    await user.save()
},20000)


test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('Correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Id is used as identifier', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('A blog can be added', async() => {
    const newBlog = {
        "title": "Coin",
        "author": "CoinGecko",
        "url": "https://www.coingecko.com/",
        "likes": 99
    }
    const response = await api.post('/api/login').send({username: 'root', password: 'sekret'})
    const token = response.body.token

    await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(n => n.author)
  expect(authors).toContain(
    'CoinGecko'
  )

})

test('A blog cannot be added without token', async() => {
    const newBlog = {
        "title": "Coin",
        "author": "CoinGecko",
        "url": "https://www.coingecko.com/",
        "likes": 99
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('A blog with no likes has zero likes', async() => {
    const newBlog = {
        "title": "FULLSTACK",
        "author": "HY",
        "url": "https://fullstackopen.com/"
    }
    const response0 = await api.post('/api/login').send({username: 'root', password: 'sekret'})
    const token = response0.body.token

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)

    expect(response.body.likes).toBe(0)
})

test('A blog with no title cannot be added', async() => {
    const newBlog = {
        "author": "HY",
        "url": "https://fullstackopen.com/",
        "likes": 99
    }
    const response0 = await api.post('/api/login').send({username: 'root', password: 'sekret'})
    const token = response0.body.token

    await api
    .post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(400)
})

test('A blog with no url cannot be added', async() => {
    const newBlog = {
        "title": "FULLSTACK",
        "author": "HY",
        "likes": 99
    }
    const response0 = await api.post('/api/login').send({username: 'root', password: 'sekret'})
    const token = response0.body.token

    await api
    .post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(400)
})

test('A blog can be deleted', async() => {

    // Adding a blog and then deleting it

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const response0 = await api.post('/api/login').send({username: 'root', password: 'sekret'})
    const token = response0.body.token

    const newBlog = {
        "title": "Coin",
        "author": "CoinGecko",
        "url": "https://www.coingecko.com/",
        "likes": 99
    }

    const postedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)

    const id = postedBlog.body.id

    await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('A blog can be updated', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 2828
    }

    const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)

    expect(result.body.likes).toBe(newBlog.likes)
})

afterAll(async () => {
    await mongoose.connection.close()
})