import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [erorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedBlogAppUser");

    blogService.setToken(null);
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    blogService.create(blogObject).then((returnedObj) => {
      setBlogs(blogs.concat(returnedObj));
      setAuthor("");
      setTitle("");
      setUrl("");

      setErrorMessage(
        `Added a new blog: ${returnedObj.title} by ${returnedObj.author}`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <h2>Create new blog</h2>
        <div>
          Title
          <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          Author
          <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          URL
          <input value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  };
  const loggedIn = () => {
    return (
      <div>
        <p>
          {user.name} logged in. <button onClick={handleLogout}>Logout</button>
        </p>
        {blogForm()}
        <h2>Blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };
  return (
    <div>
      <h2>Blog App</h2>
      <Notification message={erorMessage} />
      {!user ? loginForm() : loggedIn()}
    </div>
  );
};

export default App;
