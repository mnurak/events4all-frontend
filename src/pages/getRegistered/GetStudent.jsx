import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventContext from "../../context/events/EventContext";
import Alert from "../../components/Alert";
import RegisterContext from "../../context/register/RegisterContext";

const GetStudent = () => {
  const { events } = useContext(EventContext);
  const { registrations, getRegistrations, loading } = useContext(RegisterContext);
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = [];
    registrations.map((register) => {
      const event = events.find((e) => e._id === register.event_id);
      if (event) {
        items.push({
          id: register._id,
          participants: register.participants,
          status: register.verification,
          title: event.title,
          date: event.date,
          description: event.description,
          registrationEndDate: event.registrationEndDate,
        });
      }
    });
    setDetails(items);
  }, [events, registrations]);

  const register = (id) => {
    navigate(`/correction/student?id=${id}`);
  };

  useEffect(() => {
    if (!loading) getRegistrations();
  }, [loading]);

  return (
    <div className="py-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">Registered Events</h1>
        <p className="text-lg text-gray-500">Keep track of the events registered</p>
      </header>

      <div className="flex justify-end px-10 mb-5">
        <button
          onClick={() => getRegistrations()}
          className="text-4xl hover:scale-110 transition-transform"
        >
          &#x21BB;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mx-auto max-w-screen-lg">
        {details.length > 0 ? (
          details.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary mb-2">{event.title}</h2>
                <p className="text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600">
                  Registration Ends: {new Date(event.registrationEndDate).toLocaleDateString()}
                </p>

                <h3 className="mt-4 font-medium text-gray-800">Participants</h3>
                <ul className="space-y-1 mt-2">
                  {event.participants?.map((participant, index) => (
                    <li key={participant.usn} className="text-gray-700">{participant.name}</li>
                  ))}
                </ul>

                <p className="text-gray-600 font-bold mt-4">
                  Status:{" "}
                  <span
                    className={`${
                      event.status === "awaiting" ? "text-amber-500" : event.status === "verified" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {event.status}
                  </span>
                </p>

                <h3 className="mt-4 text-gray-800 font-semibold">Description</h3>
                <div className="mt-2 text-gray-600 h-20 overflow-y-auto">
                  {event.description}
                </div>

                {event.status === "awaiting" ? (
                  <button
                    onClick={() => register(event.id)}
                    className="mt-4 bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit the form
                  </button>
                ) : (
                  <p className="mt-2 text-gray-500 text-center">Once verified/rejected, cannot edit the form.</p>
                )}
              </div>
              <div className="relative">
                <img
                  src={event.image || "images/poster.jpg"}
                  alt={`${event.title} poster`}
                  className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center mt-8">
            <Alert alert="warning" message="No Registration found" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStudent;
