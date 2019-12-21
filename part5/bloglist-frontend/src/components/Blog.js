import React, { useState } from 'react';
import blogsService from "../services/blogs";
// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} {blog.author}{blog.url}{blog.likes}
//   </div>
// )
const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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

  const likeBlog = event => {
    if (window.confirm(`Like ${blog.title} ?`)) {
      blog.likes += 1
      blogsService
        .update(blog.id, blog)
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
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} style={{ fontWeight: 'bold', cursor: 'pointer' }}>
        {blog.title}

      </div>
      <div style={showWhenVisible}>
        by {blog.author}
        <br />
        link: {blog.url}
        <br />
        amount of likes: {" "}{blog.likes}
        <button onClick={likeBlog}>like</button>
        <br />
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>


  )
}

export default Blog;