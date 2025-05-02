import React, { useContext, useEffect } from "react";
import EventContext from "../context/events/EventContext";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const College = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { userEvents, getUserEvents } = useContext(EventContext);
  const filterEvents = userEvents;
  useEffect(() => {
    if (user === "student") {
      alert("you are not authenticated");
      navigate("/auth");
    }
    getUserEvents();
  }, [user]);
  const updateEvent = (id) => {
    navigate(`/college/update?id=${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold"> Events </h1>
        <p className="text-lg">Explore various events held by your colleges.</p>
      </header>
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
                <button
                  onClick={() => updateEvent(event._id)}
                  className="mt-4 bg-blue-400 text-[#1A1A1A] hover:bg-blue-600 hover:text-white"
                >
                  update
                </button>
              </div>
              <div className="w-[35%] py-2 px-1">
                <img
                  src={event.image || "images/poster.jpg"}
                  alt={`${event.title} poster`}
                  className="transition-transform duration-450 ease-in-out transform hover:scale-180"
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

export default College;
