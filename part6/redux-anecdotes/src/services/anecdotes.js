import axios from "axios";
import { asObject } from "../reducers/anecdoteReducer";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdote) => {
  const object = asObject(anecdote)
  const response = await axios.post(baseUrl, object);
  console.log(response.data)
  return response.data;
};

const updateAnecdoteById = async (id, updatedAnecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
    console.log('Anecdote updated successfully:', response.data);
    return response.data
  } catch (error) {
    console.error('Error updating anecdote:', error.message);
  }
};

export default {
  getAll,
  createNew,
  updateAnecdoteById
};
