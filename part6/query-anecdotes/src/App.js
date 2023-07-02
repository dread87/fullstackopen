import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useReducer } from "react";
import { notificationReducer } from "./reducers/notificationReducer";

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  const queryClient = new useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData("anecdotes", (oldAnecdotes) => {
        return oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      });
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: "VOTE", payload: anecdote.content });
    const timeoutID = setTimeout(() => {
      notificationDispatch({ payload: "" });
      clearTimeout(timeoutID);
    }, 5000);
  };
  const handleCreate = (type,payload="") => {
    notificationDispatch({ type, payload});
    const timeoutID = setTimeout(() => {
      notificationDispatch({ payload: "" });
      clearTimeout(timeoutID);
    }, 5000);
  };
  const query = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const anecdotes = query.data || [];

  if (query.isLoading)
    return <div>anecdote service not available due to problems in server</div>;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notification} />
      <AnecdoteForm handleNotification={handleCreate} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
