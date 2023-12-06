import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('The form calls addBlog function with correct details', async() => {
    const mockCreateBlog = jest.fn()
    const user = userEvent.setup()

    const {container} = render(<BlogForm createBlog={mockCreateBlog}/>)
    const inputTitle = container.querySelector('#title')
    const inputAuthor = container.querySelector('#author')
    const inputUrl = container.querySelector('#url')
    const sendButton = screen.getByText('Save')

    await user.type(inputTitle, 'New blog')
    await user.type(inputAuthor, 'New blogger')
    await user.type(inputUrl, 'newblog.com')

    await user.click(sendButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('New blog')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('New blogger')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('newblog.com')
  })