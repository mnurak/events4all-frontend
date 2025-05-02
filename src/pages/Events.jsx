import React, { useContext, useEffect, useState } from "react";
import EventContext from "../context/events/EventContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const Events = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { events, getEvents } = useContext(EventContext);
  const [category, setCategory] = useState("all");
  const [filterEvents, setFilterEvents] = useState(events);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user === "college") setShow(false);
    else setShow(true);
  }, [user]);
  
  useEffect(() => {
    if (category === "all") {
      setFilterEvents(events);
    } else {
      const filtered = events.filter((event) => event.status === category);
      setFilterEvents(filtered);
    }
  }, [events, category]);

  if (events.length === 0) return <div>Loading events...</div>;

  const register = (id) => {
    if (user === "student") navigate(`/events/register?id=${id}`);
    else alert("Only students can register");
  };

  const filter = (e) => {
    setCategory(e.target.value);
  };

  const refresh = () => {
    getEvents()
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <p className="text-lg">
          Explore various events held by different colleges.
        </p>
      </header>

      <div className="flex justify-center mb-4">
        <select onChange={filter} className="border rounded p-2">
          <option value="all">All Events</option>
          <option value="active">Active Events</option>
          <option value="closed">Closed Events</option>
          <option value="awaiting">Awaiting Events</option>
        </select>
        <div
          className="mx-5 text-3xl text-shadow-2xs hover:scale-110 hover:cursor-pointer cursor-auto"
          onClick={refresh}
        >
          &#x21BB;
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filterEvents.length > 0 ? (
          filterEvents.map((event) => (
            <div key={event._id} className="border rounded-lg flex">
              <div className="p-4 shadow-md w-[65%]">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Registration Ends:{" "}
                  {new Date(event.registrationEndDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Max Participants: {event.maxParticipants}
                </p>
                <p className="text-gray-600">
                  Current Participants: {event.currentParticipants}
                </p>
                <p className="text-gray-600">Status: {event.status}</p>
                <div className="mt-2 h-20 w-80 overflow-y-auto flex justify-center">
                  {event.description}
                </div>
                {show && (
                  <button
                    onClick={() => register(event._id)}
                    className="mt-4 bg-blue-400 text-[#1A1A1A] hover:bg-blue-600 hover:text-white"
                  >
                    Register
                  </button>
                )}
              </div>
              <div className="w-[35%] py-2 px-1">
                <img
                  src={event.image || "images/poster.jpg"}
                  alt={`${event.title} poster`}
                  className="transition-transform duration-450 ease-in-out transform hover:scale-300"
                />
              </div>
            </div>
          ))
        ) : (
          <div>No events found for the selected category.</div>
        )}
      </div>
    </div>
  );
};

export default Events;
