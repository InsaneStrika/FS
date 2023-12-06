import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Elon Ma',
    url: 'x.com',
    likes: 50,
    user: {
        username: 'Tester12',
        name: 'Tester'
    }
  }


const user = {
    username: 'Tester12',
    name: 'Tester'
}

let mockUpdateBlog = jest.fn()
let mockDeleteBlog = jest.fn()


test('Initially renders title and author', () => {
    const {container} = render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={user}/>)
    const div = container.querySelector('.default')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library - Elon Ma')
  })

test('More information is visible when the button is clicked', async() => {
    render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={user}/>)
    const user1 = userEvent.setup()
    const button = screen.getByText('View')
    await user1.click(button)
    
    const url = screen.findByText('x.com')
    expect(url).toBeDefined()

    const likes = screen.findByText('50')
    expect(likes).toBeDefined()
    
    const savedby = screen.findByText('Tester')
    expect(savedby).toBeDefined()
})

test('Clicking the like button twice, the update function is called twice', async() => {
  render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={user}/>)
  const user1 = userEvent.setup()
  const button = screen.getByText('View')
  await user1.click(button)
  
  const button2 = screen.getByText('Like')
  await user1.click(button2)
  await user1.click(button2)
  expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})

