import React, { useContext, useEffect, useState } from "react";
import EventContext from "./EventContext";
import AuthContext from "../auth/AuthContext";

const EventState = (props) => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [fetched, setFetched] = useState(false);

  const getEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/event/events/get",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      if (json.success) {
        setEvents(json.events);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserEvents = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/event/${user}/get`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const json = await response.json();
      if (json.success) setUserEvents(json.events);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEvents();
    getUserEvents();
    setFetched(true)
  }, []);

  return (
    <EventContext.Provider
      value={{ events, userEvents, getEvents, getUserEvents }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
