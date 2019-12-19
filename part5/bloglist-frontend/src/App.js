import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import Filter from "./components/Filter";
import BlogForm from "./components/BlogForm";
// import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState('')
  // const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [filterTitle, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null);


  useEffect(() => {
    blogsService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])



  const onFilterChange = event => {
    setFilter(event.target.value);
  };


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )


      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    setUser(null)


  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const filteredBlogs = blogs.filter(
    blog => blog.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1
  );

  const onBlogSuccess = (blogs, message) => {
    setBlogs(blogs);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const onError = errorString => {
    setErrorMessage(errorString);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };
  console.log(onBlogSuccess)
  return (
    <div>
      <h1>Bloglist</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <h2>Login</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>Log out</button>
          <br /><br />
          <br />
          <Filter
            blogs={blogs}
            filterTitle={filterTitle}
            onFilterChange={onFilterChange}
          />
          <h2>Add new Blog</h2>
          <BlogForm
            onBlogSuccess={onBlogSuccess}
            onError={onError}
            blogs={blogs}
          />
          <h2>List</h2>
          <Blogs blogs={filteredBlogs} setBlogs={setBlogs} />
          <Footer />
        </div>
      }



    </div>
  )
}

export default App