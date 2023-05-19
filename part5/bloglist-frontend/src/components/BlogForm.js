const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <form onSubmit={onSubmit} className="formDiv">
      <h2>Create new blog</h2>
      <div>
        Title
        <input value={title} onChange={handleTitleChange} name="title" />
      </div>
      <div>
        Author
        <input value={author} onChange={handleAuthorChange} name="author" />
      </div>
      <div>
        URL
        <input value={url} onChange={handleUrlChange} name="url" />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
