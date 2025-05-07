import { useContext, useEffect, useState } from "react";
import RegisterContext from "../../context/register/RegisterContext";
import EventContext from "../../context/events/EventContext";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const GetCollege = () => {
  const { loading } = useContext(RegisterContext);
  const navigate = useNavigate();
  const { userEvents, getUserEvents } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!loading) {
      if (user === "student") {
        alert("you are not authenticated");
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
    <div>
      <div className="relative">
        <header className="text-center mb-10 mt-10">
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-lg">Keep track of the events created.</p>
        </header>
        <div className="flex justify-end h-7 px-5 mx-10">
          <span
            className="text-4xl w-15 h-7 flex justify-end hover:scale-110 px-3 hover:cursor-pointer"
            onClick={() => {
              getUserEvents();
            }}
          >
            &#x21BB;
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-7 p-5 mx-10">
        {userEvents.length > 0 &&
          userEvents.map((event) => (
            <div key={event._id} className="border-2 rounded-lg flex p-1">
              <div key={event.id} className="border-2 rounded-lg flex p-1 ">
                <div className="p-4 shadow-md w-[65%]">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-gray-600">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Registration Ends:{" "}
                    {new Date(event.registrationEndDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500">
                    No of participants: {event.currentParticipants}
                  </p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <strong className="text-amber-500">{event.status}</strong>
                  </p>
                  <h1 className="mt-5">Description</h1>
                  <div className="mt-2 h-10 w-80 overflow-y-auto flex justify-center">
                    {event.description}
                  </div>

                  <section>
                    <button
                      onClick={() => updateEvent(event._id)}
                      className="w-50 mx-2 p-1 my-2 "
                    >
                      Edit event details
                    </button>
                  </section>

                  <section>
                    <button
                      onClick={() => getStudents(event._id)}
                      className="w-65 mx-2 p-1 my-2"
                    >
                      get registered students
                    </button>
                  </section>
                </div>
                <div className="w-[35%] py-2 px-1">
                  <img
                    src={event.image || "images/poster.jpg"}
                    alt={`${event.title} poster`}
                    className="transition-transform duration-450 ease-in-out transform hover:scale-150"
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
