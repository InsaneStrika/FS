import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs => {
      blogs.sort((l,r) => r.likes-l.likes)
      setBlogs(blogs)
    }
    ))
  }, [])


  const blogFormRef = useRef()

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Login to application</h1>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`New blog ${blogObject.title} by ${blogObject.author} added!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage('The blog could not be added.')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (id, newBlog) => {
    blogService.update(id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : returnedBlog))
      })
      .catch(error => {
        setMessage('The blog could not be updated.')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Delete ${blog.title}?`)) {

      blogService.deleteBlog(blog)
        .then(response => {
          setBlogs(blogs.filter(bl => bl.id !== blog.id))
          setMessage('The blog was deleted successfully')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage('The blog could not be deleted.')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel = "New blog" ref = {blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }


  return (
    <div>
      {user &&  <h2>Blogs</h2>}
      <Notification message={message} />
      {!user && loginForm()}
      {user &&
        <div>
          <p>{user.name} logged in </p>
          {logoutForm()}
          <div>&nbsp;</div>
          {blogForm()}
          <div>&nbsp;</div>
        </div>
      }
      {user && (
        <div>
          {blogs.sort((l,r) => r.likes-l.likes).map(blog => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App