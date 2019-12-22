import 'jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import React from 'react'
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import SimpleBlog from './SimpleBlog'
import Blog from "./Blog"

const blog = {
    title: 'TITLE',
    author: 'Lana',
    likes: 12,
}

test("renders content", () => {

    const component = render(<SimpleBlog blog={blog} />)
    expect(component.container).toHaveTextContent("TITLE")
    expect(component.container).toHaveTextContent("Lana")
    expect(component.container).toHaveTextContent('blog has 12 likes')
})
