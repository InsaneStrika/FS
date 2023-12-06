import { useState, useEffect } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [blogOwner, setBlogOwner] = useState(false)

  useEffect(() => {
    setBlogOwner(user.username === blog.user.username)
  }, [])

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const buttonLabel = blogVisible ? 'Hide' : 'View'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes+1
    }
    updateBlog(blog.id, newBlog)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}<button onClick={likeBlog}>Like</button></p>
        <p>Saved by: {blog.user.name}</p>
        {blogOwner && <button onClick={removeBlog}>Delete</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  updateBlog: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  deleteBlog: propTypes.func.isRequired
}

export default Blog