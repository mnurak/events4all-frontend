import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventContext from "../../context/events/EventContext";
import Alert from "../../components/Alert";
import RegisterContext from "../../context/register/RegisterContext";

const GetStudent = () => {
    
  const { events } = useContext(EventContext);
  const { registrations, getRegistrations } = useContext(RegisterContext);
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

  return (
    <div>
      <div className="relative">
        <header className="text-center mb-10 mt-10">
          <h1 className="text-3xl font-bold">Registered Events</h1>
          <p className="text-lg">Keep track of the events registered</p>
        </header>
        <div className="flex justify-end h-7 px-5 mx-10">
          <span
            className="text-4xl w-15 h-7 flex justify-end hover:scale-110 px-3 hover:cursor-pointer"
            onClick={() => getRegistrations()}
          >
            &#x21BB;
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-7 p-5 mx-10">
        {details.length > 0 &&
          details.map((event) => (
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
                <div>
                  <h5>Participants</h5>
                  <div>
                    {event.participants?.map((participant, index) => (
                      <li className="ml-3.5" key={participant.usn}>
                        <span>{participant.name}</span>
                      </li>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">
                  Status:{" "}
                  <strong className="text-amber-500">{event.status}</strong>
                </p>
                <h1 className="mt-5">Description</h1>
                <div className="mt-2 h-10 w-80 overflow-y-auto flex justify-center">
                  {event.description}
                </div>
                {event.status !== "verified" ? (
                  <button
                    onClick={() => register(event.id)}
                    className="mt-4 bg-blue-400 text-[#1A1A1A] hover:bg-blue-600 hover:text-white"
                  >
                    edit the form
                  </button>
                ) : (
                  <section>
                    <span>Once verified cannot edit the form</span>
                  </section>
                )}
              </div>
              <div className="w-[35%] py-2 px-1">
                <img
                  src={event.image || "images/poster.jpg"}
                  alt={`${event.title} poster`}
                  className="transition-transform duration-450 ease-in-out transform hover:scale-150"
                />
              </div>
            </div>
          ))}
      </div>
      {details.length === 0 && (
        <div className="h-15 text-2xl flex  justify-center mx-20 p-0.5">
          <Alert alert={"warning"} message={"No Registration found"}></Alert>
        </div>
      )}
    </div>
  );
};

export default GetStudent;
