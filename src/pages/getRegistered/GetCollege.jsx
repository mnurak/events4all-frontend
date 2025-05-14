import { useContext, useEffect, useState } from "react";
import RegisterContext from "../../context/register/RegisterContext";
import EventContext from "../../context/events/EventContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const GetCollege = () => {
  const { loading } = useContext(RegisterContext);
  const navigate = useNavigate();
  const { userEvents, getUserEvents } = useContext(EventContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      if (user === "student") {
        alert("You are not authenticated.");
        navigate("/auth");
      }
      getUserEvents();
    }
  }, [loading]);

  const updateEvent = (id) => {
    navigate(`/correction/college?id=${id}`);
  };

  const getStudents = (id) => {
    navigate(`student?id=${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <p className="text-lg text-gray-500">Keep track of the events created.</p>
      </header>

      <div className="flex justify-end mb-8 px-6">
        <span
          className="text-4xl cursor-pointer hover:scale-110 transition duration-300"
          onClick={getUserEvents}
        >
          &#x21BB;
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {userEvents.length > 0 &&
          userEvents.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-2/3">
                  <h2 className="text-2xl font-semibold text-gray-700">{event.title}</h2>
                  <p className="text-gray-600 mt-2">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Registration Ends: {new Date(event.registrationEndDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mt-2">
                    No of participants: {event.currentParticipants}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Status:{" "}
                    <strong className="text-amber-500">{event.status}</strong>
                  </p>

                  <h3 className="mt-5 text-lg font-semibold">Description</h3>
                  <p className="text-gray-600 mt-2">{event.description}</p>

                  <div className="mt-5 flex space-x-4">
                    <button
                      onClick={() => updateEvent(event._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit Event Details
                    </button>
                    <button
                      onClick={() => getStudents(event._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                    >
                      Get Registered Students
                    </button>
                  </div>
                </div>
                <div className="sm:w-1/3 sm:pl-6 mt-4 sm:mt-0">
                  <img
                    src={event.image || "images/poster.jpg"}
                    alt={`${event.title} poster`}
                    className="w-full h-auto rounded-lg object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetCollege;
