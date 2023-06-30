import { useSelector } from "react-redux";
import { useEffect } from "react";
import { changeNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(changeNotification(""));
    }, 5000);
    return () => clearTimeout(timeout);
  });

  return notification === "" ? (
    <div />
  ) : (
    <div style={style}>{notification}</div>
  );
};

export default Notification;
