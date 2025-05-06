import React, { use, useContext, useEffect, useState } from "react";
import RegisterContext from "../../context/register/RegisterContext";
import EventContext from "../../context/events/EventContext";
import { useNavigate } from "react-router-dom";

const GetEventRegistration = () => {
  const { registrations, getRegistrations } = useContext(RegisterContext);
  const { events } = useContext(EventContext);
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const [registration, setRegistration] = useState([]);
  const [event, setEvent] = useState({});

  useEffect(() => {
    getRegistrations();
  }, []);

  useEffect(() => {
    const details = [];
    registrations.map((item) => {
      if (item.event_id === id && item.verification !== "rejected")
        details.push(item);
    });
    setRegistration(details);
    setEvent(events.find((item) => item._id === id));
  }, [registrations, events]);

  const submit = async (approval, id) => {
    try {
      const responce = await fetch(
        `http://localhost:5001/api/registration/approval/${id}`,
        {
          method: "PATCH",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ approval }),
        }
      );
      const json = await responce.json();
      if (json.success) {
        getRegistrations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="relative">
        <header className="text-center mb-10 mt-10">
          <h1 className="text-3xl font-bold">Registrations</h1>
          <p className="text-lg">
            Registration of students for the event.{" "}
            <strong>{event?.title}</strong>
          </p>
        </header>
        <div className="flex justify-end h-7 px-5 mx-10">
          <span
            className="text-4xl w-15 h-7 flex justify-end hover:scale-110 px-3 hover:cursor-pointer"
            onClick={() => {
              getRegistrations();
            }}
          >
            &#x21BB;
          </span>
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-5xl px-6">
        {registration?.length > 0 ? (
          registration.map((registar) => (
            <div
              key={registar._id}
              className="mb-8 rounded-lg border border-gray-300 shadow-md p-6 bg-white"
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
                {registar.verification === "awaiting" ? (
                  <div className="mx-5 space-x-3.5">
                    <button onClick={() => submit(true, registar._id)}>
                      <span>Approve</span>
                    </button>
                    <button
                      className="bg-red-400"
                      onClick={() => submit(false, registar._id)}
                    >
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <p className="flex justify-center items-center text-2xl font-semibold bg-gradient-to-r from-green-400 via-teal-500 to-green-400 text-white rounded-full p-1 w-40 max-w-xs shadow-lg">
                    {registar.verification}
                  </p>
                )}
              </table>
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
