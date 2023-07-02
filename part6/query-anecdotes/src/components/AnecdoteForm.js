import { useMutation } from "react-query";
import { createAnecdote } from "../requests";
import { useQueryClient } from "react-query";

const AnecdoteForm = ({ handleNotification }) => {
  const queryClient = new useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries("anecdotes");
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      handleNotification("CREATE",newAnecdote.content);
    },
    onError: ()=>{
      handleNotification("ERROR");
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({
      content,
      id: (Math.floor(Math.random() * 100000) + 1).toString(),
      votes: 0,
    });
  };


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
