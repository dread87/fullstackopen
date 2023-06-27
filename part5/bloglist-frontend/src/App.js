import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [erorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogAppUser')

    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    blogService.create(blogObject).then((returnedObj) => {
      //setBlogs(blogs.concat(returnedObj));
      blogService.getAll().then((blogs) => setBlogs(blogs))
      setAuthor('')
      setTitle('')
      setUrl('')
      blogFormRef.current.toggleVisibility()

      setErrorMessage(
        `Added a new blog: ${returnedObj.title} by ${returnedObj.author}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
  const handleUpdateLikes = (blog) => {
    blogService.updateLikes(blog).then((returnedObj) => {
      const idx = blogs.findIndex((blog) => blog.id === returnedObj.id)
      let newBlogs = [...blogs]
      console.log(blogs, newBlogs)
      newBlogs[idx] = returnedObj
      setBlogs(newBlogs)
    })
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog).then(() => {
        const newBlogs = blogs.filter((b) => b.id !== blog.id)
        setBlogs(newBlogs)
      })
    }
  }
  //console.log(blogs);
  const blogFormRef = useRef()
  return (
    <div>
      <h2>Blog App</h2>
      <Notification message={erorMessage} />
      {!user ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handleSubmit={handleLogin}
          ></LoginForm>
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged in.{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleAuthorChange={(event) => setAuthor(event.target.value)}
              handleUrlChange={(event) => setUrl(event.target.value)}
              handleTitleChange={(event) => setTitle(event.target.value)}
              onSubmit={addBlog}
            />
          </Togglable>
          <h2>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user.username}
                updateLikes={handleUpdateLikes}
                removeBlog={handleRemove}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
