import React from 'react';
import blogsService from "../services/blogs";
// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} {blog.author}{blog.url}{blog.likes}
//   </div>
// )
const Blog = ({ blog, setBlogs }) => {
  // delete Blog
  const deleteBlog = event => {
    if (window.confirm(`Delete ${blog.title} ?`)) {
      blogsService
        .remove(blog.id)
        .then(() => {
          blogsService.getAll().then(updatedBlogs => {
            setBlogs(updatedBlogs);
          });
        })
        .catch(error => {
          console.log("Blog does not exist");
        });
    }
  };
  return (
    <p>
      <strong>{blog.title}</strong>
      <br />
      by {blog.author}
      <br />
      link: {blog.url}
      <br />
      amount of likes: {" "}{blog.likes}
      <br />
      <button onClick={deleteBlog}>delete</button>
    </p>
  );
};
export default Blog;