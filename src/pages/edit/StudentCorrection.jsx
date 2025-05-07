import React, { useContext, useEffect, useState } from "react";
import EventContext from "../../context/events/EventContext";
import RegisterContext from "../../context/register/RegisterContext";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

const StudentCorrection = () => {
  const navigate = useNavigate();
  const { events } = useContext(EventContext);
  const { registrations, getRegistrations, loading } =
    useContext(RegisterContext);

  const [registrationDetails, setRegistrationDetails] = useState();
  const [details, setDetails] = useState({
    maxParticipantsPerTeam: 1,
    name: "",
  });
  const [participantsCount, setParticipantsCount] = useState(1);
  const [participants, setParticipants] = useState([{ name: "", usn: "" }]);
  const [id, setId] = useState("");

  const updateNumber = (e) => {
    let value = e.target.value;
    if (value === "") {
      setParticipantsCount(1);
    }
    value = Number(value);
    if (!isNaN(value)) {
      value = Math.min(value, details?.maxParticipantsPerTeam || 1);
      setParticipantsCount(value);
    }
  };

  const updateParticipant = (index, key, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][key] = value;
    setParticipants(updatedParticipants);
  };

  useEffect(() => {
    if (participantsCount > participants.length) {
      const newParticipants = [...participants];
      for (let i = participants.length; i < participantsCount; i++) {
        newParticipants.push({ name: "", usn: "" });
      }
      setParticipants(newParticipants);
    } else if (participantsCount < participants.length) {
      setParticipants(participants.slice(0, participantsCount));
    }
  }, [participantsCount]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setId(queryParams.get("id"));
  }, []);

  useEffect(() => {
    if (id && !loading) {
      const registrationDetail = registrations.find((r) => r._id === id);
      if (registrationDetail) {
        setRegistrationDetails(registrationDetail);
        const eventDetail = events.find(
          (item) => item._id === registrationDetail.event_id
        );
        setDetails(eventDetail);
        setParticipants(registrationDetail.participants || []);
        setParticipantsCount(registrationDetail.participants.length);
      }
    } else {
      getRegistrations();
    }
  }, [id, loading, registrations, events]);

  const submit = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/registration/student/edit/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ participants }),
        }
      );
      const json = await response.json();
      if (json.success) {
        navigate("/registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Input
          type="number"
          value={participantsCount}
          update={updateNumber}
          min={1}
          max={details?.maxParticipantsPerTeam}
          placeholder="1"
          message="Choose number of participants"
          name="members"
        />
      </div>

      {participants.map((participant, index) => (
        <div key={index}>
          <Input
            type="text"
            value={participant.name || ""} // Ensure value is an empty string if undefined
            update={(e) => updateParticipant(index, "name", e.target.value)}
            placeholder={`Name of participant ${index + 1}`}
            message={`Name of participant ${index + 1}`}
            name={`name${index + 1}`}
          />
          <Input
            type="text"
            value={participant.usn || ""} // Ensure value is an empty string if undefined
            update={(e) => updateParticipant(index, "usn", e.target.value)}
            placeholder={`USN of participant ${index + 1}`}
            message={`USN of participant ${index + 1}`}
            name={`usn${index + 1}`}
          />
        </div>
      ))}

      <div className="flex justify-center m-1 p-1">
        <button onClick={submit} className="mt-3 bg-amber-500 text-amber-900">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default StudentCorrection;
