import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import Filter from "./components/Filter";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from './services/login'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';


const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const blogFormRef = React.createRef();


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


  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  const filteredBlogs = blogs.filter(
    blog => blog.title.toLowerCase().indexOf(filterTitle.toLowerCase()) !== -1
  );

  const onBlogSuccess = (blogs, message) => {
    blogFormRef.current.toggleVisibility();
    setBlogs(blogs);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const onDeleteBlog = (id, error) => {
    if (error) {
      onError(`Blog '${id}' was already deleted`)
      setTimeout(() => {
        onError([])
      }, 5000)


    } else {
      setBlogs(blogs.filter(b => b.id !== id));
      setSuccessMessage(`Blog '${id}' was deleted`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000)
    }
  }

  const onError = errorString => {
    setErrorMessage(errorString);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };
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
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm
              onBlogSuccess={onBlogSuccess}
              onError={onError}
              blogs={blogs}
              user={user}
            />

          </Togglable>


          <h2>List</h2>
          <Blogs blogs={filteredBlogs} onDeleteBlog={onDeleteBlog} setBlogs={setBlogs} user={user} />
          <Footer />
        </div>
      }



    </div>
  )
}

export default App