import React, { useContext, useEffect, useState } from "react";
import EventContext from "../../context/events/EventContext";
import RegisterContext from "../../context/register/RegisterContext";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const StudentCorrection = () => {
  const {BACKEND_LINK} = useContext(AuthContext)
  const { events } = useContext(EventContext);
  const { registrations, getRegistrations, loading } = useContext(RegisterContext);
  const [registrationDetails, setRegistrationDetails] = useState();
  const [details, setDetails] = useState({ maxParticipantsPerTeam: 1 });
  const [participantsCount, setParticipantsCount] = useState(1);
  const [participants, setParticipants] = useState([{ name: "", usn: "" }]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setId(queryParams.get("id"));
  }, []);

  useEffect(() => {
    if (id && !loading) {
      const registration = registrations.find((r) => r._id === id);
      if (registration) {
        setRegistrationDetails(registration);
        setParticipants(registration.participants || []);
        setParticipantsCount(registration.participants.length);
        const event = events.find((e) => e._id === registration.event_id);
        setDetails(event);
      }
    } else {
      getRegistrations();
    }
  }, [id, loading, registrations, events]);

  const updateParticipant = (index, key, value) => {
    const updated = [...participants];
    updated[index][key] = value;
    setParticipants(updated);
  };

  const handleCountChange = (e) => {
    let count = Math.min(Number(e.target.value) || 1, details?.maxParticipantsPerTeam || 1);
    setParticipantsCount(count);
  };

  useEffect(() => {
    if (participantsCount > participants.length) {
      setParticipants([...participants, ...Array(participantsCount - participants.length).fill({ name: "", usn: "" })]);
    } else {
      setParticipants(participants.slice(0, participantsCount));
    }
  }, [participantsCount]);

  const submit = async () => {
    try {
      const res = await fetch(`${BACKEND_LINK}api/registration/student/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ participants }),
      });
      const json = await res.json();
      if (json.success) navigate("/registered");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-amber-700">Edit Registration</h2>

      <Input
        type="number"
        value={participantsCount}
        update={handleCountChange}
        min={1}
        max={details?.maxParticipantsPerTeam}
        placeholder="1"
        message="Number of Participants"
        name="members"
      />

      {participants.map((p, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            value={p.name || ""}
            update={(e) => updateParticipant(index, "name", e.target.value)}
            placeholder={`Participant ${index + 1} Name`}
            message={`Name ${index + 1}`}
            name={`name${index + 1}`}
          />
          <Input
            type="text"
            value={p.usn || ""}
            update={(e) => updateParticipant(index, "usn", e.target.value)}
            placeholder={`Participant ${index + 1} USN`}
            message={`USN ${index + 1}`}
            name={`usn${index + 1}`}
          />
        </div>
      ))}

      <button
        onClick={submit}
        className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
      >
        Confirm Changes
      </button>
    </div>
  );
};

export default StudentCorrection;
