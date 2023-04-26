import { useState } from "react";
const Blog = ({ blog, updateLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    background: "red",
    color: "white",
    padding: "4px",
    marginLeft: "2px",
    fontWeight: "bold",
  };
  const [contentVisible, setContentVisible] = useState(false);

  const changeVisibility = () => setContentVisible(!contentVisible);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button
          style={{ ...buttonStyle, background: "green" }}
          onClick={changeVisibility}
        >
          {!contentVisible ? "View" : "Hide"}
        </button>
        {contentVisible ? (
          <div>
            <div>
              <a href={blog.url} rel="noreferrer" target="_blank">
                {blog.url}
              </a>
            </div>
            <div>
              Likes: {blog.likes}
              <button
                style={{ ...buttonStyle, background: "blue" }}
                onClick={() => updateLikes(blog)}
              >
                Like
              </button>
            </div>
            <div>{blog.user.name}</div>
            <button style={buttonStyle} onClick={() => removeBlog(blog)}>
              Remove
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Blog;
