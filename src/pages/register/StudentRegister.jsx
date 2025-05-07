import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import EventContext from "../../context/events/EventContext";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {

  const [details, setDetails] = useState({
    maxParticipantsPerTeam: 1,
    name: "",
  });
  const { events, getEvents } = useContext(EventContext);
  const [participants, setParticipants] = useState([{ name: "", usn: "" }]);
  const [participantsCount, setParticipantsCount] = useState(1);
  const [team_name, setTeam_name] = useState();
  const navigate = useNavigate()

  const chose = (e) => {
    const id = e.target.value;
    const event = events.find((item) => item._id === id);
    updateNumber({
      target: {
        value: event.maxParticipantsPerTeam,
      },
    });
    setDetails(event);
  };

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

  const updateTeamName = (e) =>{
    setTeam_name(e.target.value)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");

    const event = events.find((event) => event._id === id);
    if (event) {
      setDetails(event);
      setParticipantsCount(
        Math.min(event.maxParticipantsPerTeam, participantsCount)
      );
    }
  }, [events]);

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

  const updateParticipant = (index, key, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][key] = value;
    setParticipants(updatedParticipants);
  };

  useEffect(() => {
    getEvents()
  }, []);

  const submit = async () => {

    try {
      const response = await fetch(
        `http://localhost:5001/api/registration/create/${details._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ participants, team_name }),
        }
      );
      const json = await response.json();
      if (json.success) navigate('/registered')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <div>
          <select
            onChange={chose}
            name="event_id"
            id="event_id"
            value={details._id}
          >
            {events.map((event) => {
              return (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <Input
            type="text"
            update={updateTeamName}
            placeholder="Enter the team name"
            message="Team Name"
            name="team_name"
          />
        </div>
        <div>
          <Input
            type="number"
            value={participantsCount}
            update={updateNumber}
            min={1}
            max={details.maxParticipantsPerTeam}
            placeholder="1"
            message="Choose number of participants"
            name="members"
          />
        </div>

        {Array.from({ length: participantsCount }).map((_, index) => (
          <div key={index}>
            <Input
              type="text"
              value={participants[index]?.name || ""}
              update={(e) => updateParticipant(index, "name", e.target.value)}
              placeholder={`Name of participant ${index + 1}`}
              message={`Name of participant ${index + 1}`}
              name={`name${index + 1}`}
            />
            <Input
              type="text"
              value={participants[index]?.usn || ""}
              update={(e) => updateParticipant(index, "usn", e.target.value)}
              placeholder={`USN of participant ${index + 1}`}
              message={`USN of participant ${index + 1}`}
              name={`usn${index + 1}`}
            />
          </div>
        ))}
        <div className="flex justify-center m-1 p-1">
          <button disabled={!participantsCount>0} onClick={submit} className="mt-3">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
