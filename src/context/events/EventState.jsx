import React, { useContext, useEffect, useState } from "react";
import EventContext from "./EventContext";
import AuthContext from "../auth/AuthContext";

const EventState = (props) => {
  const { user, finishedAuthentication, BACKEND_LINK } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [fetched, setFetched] = useState(false);

  const getEvents = async () => {
    try {
      const response = await fetch(
        `${BACKEND_LINK}/api/event/events/get`,
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
        `${BACKEND_LINK}/api/event/${user}/get`,
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
    setFetched(true)
  }, [finishedAuthentication]);

  return (
    <EventContext.Provider
      value={{ events, userEvents, getEvents, getUserEvents, fetched }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
