import { useContext, useEffect, useState } from "react";
import RegisterContext from "../../context/register/RegisterContext";
import EventContext from "../../context/events/EventContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const GetEventRegistration = () => {
  const {BACKEND_LINK} = useContext(AuthContext)
  const { registrations, getRegistrations } = useContext(RegisterContext);
  const { events } = useContext(EventContext);
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const [registration, setRegistration] = useState([]);
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getRegistrations();
  }, []);

  useEffect(() => {
    const details = registrations.filter(
      (item) => item.event_id === id && item.verification !== "rejected"
    );
    setRegistration(details);
    setEvent(events.find((item) => item._id === id));
  }, [registrations, events]);

  const submit = async (approval, id) => {
    try {
      const response = await fetch(
        `${BACKEND_LINK}api/registration/approval/${id}`,
        {
          method: "PATCH",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ approval }),
        }
      );
      const json = await response.json();
      if (json.success) {
        getRegistrations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Registrations</h1>
        <p className="text-lg text-gray-500">
          Registration of students for the event: <strong>{event?.title}</strong>
        </p>
      </header>

      <div className="flex justify-end mb-8 px-6">
        <span
          className="text-4xl cursor-pointer hover:scale-110 transition duration-300"
          onClick={getRegistrations}
        >
          &#x21BB;
        </span>
      </div>

      <div className="mt-10 mx-auto max-w-5xl px-6">
        {registration?.length > 0 ? (
          registration.map((registar) => (
            <div
              key={registar._id}
              className="bg-white rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {registar.name || "No Name"}
              </h2>

              <table className="w-full text-left border-t border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 text-gray-600">Name</th>
                    <th className="py-2 text-gray-600">USN</th>
                  </tr>
                </thead>
                <tbody>
                  {registar.participants?.map((participant) => (
                    <tr
                      key={participant.usn}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-2">{participant.name}</td>
                      <td className="py-2 text-amber-500 font-medium">
                        {participant.usn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {registar.verification === "awaiting" ? (
                <div className="mx-5 mt-4 space-x-4">
                  <button
                    onClick={() => submit(true, registar._id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => submit(false, registar._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="text-center text-xl font-semibold bg-gradient-to-r from-green-400 via-teal-500 to-green-400 text-white rounded-full p-1 w-40 max-w-xs shadow-lg">
                  {registar.verification}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No registrations found.</p>
        )}
      </div>
    </div>
  );
};

export default GetEventRegistration;
