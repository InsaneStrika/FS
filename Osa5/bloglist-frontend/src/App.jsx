import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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

const handleLogout = async(event) =>{
  event.preventDefault()
  window.localStorage.clear()
  setUser(null)
}

const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
      title: title,
      author: author,
      url: url
  }
  blogService
  .create(blogObject).then(returnedBlog=>{
  setBlogs(blogs.concat(returnedBlog))
  setMessage(`A new blog ${title} by ${author} added!`)
  setTimeout(() => {
    setMessage(null)
  }, 5000)
  setAuthor('')
  setTitle('')
  setUrl('')
  })
}

const blogForm = () => {
  return(
      <div>
          <h2>Add a new blog</h2>
          <form onSubmit = {addBlog}>
          <div>
          Title
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          />
          </div>
          <div>
          Author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
          </div>
          <div>
          Url
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
          </div>
          <button type="submit">Save</button>    
          </form>
      </div>
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
      {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
      ))}
    </div>
    )}
    </div>
  )
}

export default App