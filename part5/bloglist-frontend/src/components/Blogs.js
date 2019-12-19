import React from 'react';
import Blog from './Blog';

// const Blogs = ({ blogs, filter, filteredBlog, removeBlog }) => {
//     const blogRows = () => {
//         if (filter) {
//             return filteredBlog.map(blog => (
//                 <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
//             ));
//         }
//         return blogs.map(blog => (
//             <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
//         ));
//     };

//     return (
//         <div>
//             <h3>Numbers</h3>
//             <div>{blogRows()}</div>
//         </div>
//     );
// };

const Blogs = ({ blogs, setBlogs }) => {
    return blogs.map((blog, index) => (
        <Blog key={index} blog={blog} setBlogs={setBlogs} />
    ));
};

export default Blogs;