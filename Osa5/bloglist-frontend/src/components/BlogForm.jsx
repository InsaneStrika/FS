import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit = {addBlog}>
        <div>
            Title
          <input
            id = 'title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            Author
          <input
            id = 'author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            Url
          <input
            id = 'url'
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

export default BlogForm