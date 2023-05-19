import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
describe("<Blog />", () => {
    const blog = {
        title: "test title",
        author: "test author",
        url: "/test",
        likes: 1337,
        user: { name: "John Doe" }
    }

    test("renders the blog's title and author, but does not render its URL or number of likes by default", async () => {

        const mockHandler = jest.fn()

        render(<Blog blog={blog} updateLikes={mockHandler} />)

        const title_and_author = screen.queryByText("test title by test author")
        const url = screen.queryByText('/test')
        const likes = screen.queryByText('1337')

        expect(title_and_author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test("the blog's URL and number of likes are show when the button controlling the shown details has been clicked", async () => {
        const mockHandler = jest.fn()
        render(<Blog blog={blog} updateLikes={mockHandler} />)

        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        expect(screen.queryByText('/test')).toBeDefined()
        expect(screen.queryByText('1337')).toBeDefined()
    })

    test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
        const mockHandler = jest.fn()
        render(<Blog blog={blog} updateLikes={mockHandler} />)

        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        const like = screen.getByText('Like')
        await user.click(like)
        await user.click(like)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
