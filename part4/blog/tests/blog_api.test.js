const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const assert = require("assert");

const api = supertest(app);

const initialBlog = [
  {
    title: "test title 1",
    author: "test author 1",
    url: "/test1",
    likes: 1337,
  },
  {
    title: "test title 2",
    author: "test author 2",
    url: "/test2",
    likes: 420,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// }, 100000);

test("returns the correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlog.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
  expect(response.body[1].id).toBeDefined();
});

test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "test title 3",
      author: "test author 3",
      url: "/test3",
      likes: 12345,
    })
    .expect(201);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlog.length + 1);
});

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "test title 4",
      author: "test author 4",
      url: "/test4",
    })
    .expect(201)
    .expect((response) => {
      assert.ok(response.body.likes === 0);
    });
});

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  await api
    .post("/api/blogs")
    .send({
      title: "test title 5",
      author: "test author 5",
      url: "/test4",
    })
    .expect(201)
    .expect((response) => {
      assert.ok(response.body.likes === 0);
    });
});

test("if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
  //
});

test("deleting a single blog post resource", async () => {
  const blogs = await api.get("/api/blogs");
  const id = blogs.body[0].id;

  await api.delete(`/api/blogs/${id}`).expect(204);

  const newBlogs = await api.get("/api/blogs");
  expect(newBlogs.body).toHaveLength(blogs.body.length - 1);
});
afterAll(async () => {
  await mongoose.connection.close();
});
