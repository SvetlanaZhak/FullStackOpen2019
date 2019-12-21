import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, onDeleteBlog, setBlogs }) => {
    // const sortedBlogs = () =>
    //     likesFilter()
    //         .sort((a, b)) => b.likes - a.likes)
    //         .map((blog, id) => (
    //             <Blog
    // ));
    return blogs.map((blog, index) => (
        <Blog key={index} blog={blog} onDeleteBlog={onDeleteBlog} setBlogs={setBlogs} />
    ));
};
export default Blogs;