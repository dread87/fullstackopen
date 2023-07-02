export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `You created '${action.payload}'`;
    case "VOTE":
      return `You voted '${action.payload}'`;
    case "ERROR":
      return `Too short anecdote, must have length 5 or more`;
    default:
      return action.payload;
  }
};
