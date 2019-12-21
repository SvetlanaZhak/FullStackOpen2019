import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, setBlogs }) => {
    // const sortedBlogs = 
    return blogs.map((blog, index) => (
        <Blog key={index} blog={blog} setBlogs={setBlogs} />
    ));
};

export default Blogs;