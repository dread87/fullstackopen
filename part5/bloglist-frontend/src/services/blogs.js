import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const updateLikes = (blogObject) => {
  const likes = blogObject.likes + 1;
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.put(`${baseUrl}/${blogObject.id}`, { likes }, config);
  return request.then((response) => response.data);
};

const remove = (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blogObject.id}`, config);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, updateLikes, remove };
