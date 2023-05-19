import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const blog = {
        title: "test title",
        author: "test author",
        url: "/test",
        likes: 1337,
        user: { name: "John Doe" }
    }

    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector("input[name='title']");
    const authorInput = container.querySelector("input[name='author']");
    const urlInput = container.querySelector("input[name='url']");
    const sendButton = screen.getByText("Create");

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toBe(blog.title);
    expect(createBlog.mock.calls[0][1]).toBe(blog.author);
    expect(createBlog.mock.calls[0][2]).toBe(blog.url);
})