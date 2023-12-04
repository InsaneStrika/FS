const bcrypt = require('bcrypt')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Roth', passwordHash: passwordHash })
    await user.save()
  })

  test('Creation succeeds with a unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Killermasa',
      name: 'Matti',
      password: 'salis2',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('Creation fails with a non-unique username', async () => {
    const newUser = {
      username: 'root',
      name: 'Matti',
      password: 'salis2',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)

    expect(result.status).toBe(400)
})

test('Creation fails with too short password', async () => {
    const newUser = {
      username: 'Killermasa',
      name: 'Matti',
      password: 'sa',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)

    expect(result.status).toBe(400)
    expect(result.body.error).toContain('Password too short')
})

test('Creation fails with too short username', async () => {
    const newUser = {
      username: 'Ki',
      name: 'Matti',
      password: 'salis2',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)

    expect(result.status).toBe(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})


