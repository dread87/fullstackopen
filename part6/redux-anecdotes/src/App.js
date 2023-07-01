import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes"
import { setAnecdotes, initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
const dispatch = useDispatch()
useEffect(()=>{
  //anecdoteService.getAll().then(anecdotes=>dispatch(setAnecdotes(anecdotes)))
  dispatch(initializeAnecdotes())
},[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
