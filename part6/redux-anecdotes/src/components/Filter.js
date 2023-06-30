import { useDispatch, useSelector } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state.filter);

  const filterAnecdotes = (event) => {
    dispatch(filterChange(event.target.value));
  };
  return (
    <div style={{ marginBottom: 15 }}>
      <input
        type="text"
        name="filter"
        onChange={filterAnecdotes}
        value={filterValue}
      />
    </div>
  );
};

export default Filter;
