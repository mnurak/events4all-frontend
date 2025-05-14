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
    setShow(user === "student");
  }, [user]);

  useEffect(() => {
    if (category === "all") {
      setFilterEvents(events);
    } else {
      const filtered = events.filter((event) => event.status === category);
      setFilterEvents(filtered);
    }
  }, [events, category]);

  if (events.length === 0) return <div className="text-center mt-10 text-gray-500">Loading events...</div>;

  const register = (id) => {
    if (user === "student") navigate(`/event/register?id=${id}`);
    else alert("Only students can register");
  };

  const filter = (e) => {
    setCategory(e.target.value);
  };

  const refresh = () => {
    getEvents();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Events</h1>
        <p className="text-lg text-gray-600">Browse and register for exciting upcoming events!</p>
      </header>

      <div className="flex justify-center items-center gap-4 mb-6">
        <select
          onChange={filter}
          id="category"
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Events</option>
          <option value="active">Active Events</option>
          <option value="closed">Closed Events</option>
          <option value="awaiting">Awaiting Events</option>
        </select>
        <button
          onClick={refresh}
          className="text-2xl hover:rotate-180 transform transition duration-300 ease-in-out"
          title="Refresh"
        >
          🔄
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filterEvents.length > 0 ? (
          filterEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-xl shadow-lg flex overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                  <div className="text-gray-600 text-sm space-y-1 mb-3">
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Registration Ends:</strong> {new Date(event.registrationEndDate).toLocaleDateString()}</p>
                    <p><strong>Max Participants:</strong> {event.maxParticipants}</p>
                    <p><strong>Current Participants:</strong> {event.currentParticipants}</p>
                    <p><strong>Status:</strong> {event.status}</p>
                  </div>
                  <p className="text-sm text-gray-700 max-h-24 overflow-y-auto">{event.description}</p>
                </div>
                {show && (
                  <button
                    onClick={() => register(event._id)}
                    className="mt-4 w-fit px-5 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                  >
                    Register
                  </button>
                )}
              </div>
              <div className="w-1/3 overflow-hidden">
                <img
                  src={event.image || "images/poster.jpg"}
                  alt={`${event.title} poster`}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-500">No events found for the selected category.</div>
        )}
      </div>
    </div>
  );
};

export default Events;
