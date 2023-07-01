import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote,updateAnecdotes } from "../reducers/anecdoteReducer";
import { changeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filterValue = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updateAnecdotes(anecdote,anecdotes))
    dispatch(changeNotification(`You voted '${anecdote.content}'`))
  };

  return (
    <div>
      {anecdotes
        .filter((anecdote) => anecdote.content.includes(filterValue))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
