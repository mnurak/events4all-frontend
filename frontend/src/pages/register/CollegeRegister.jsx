import React, { useContext, useState } from "react";
import Input from "../../components/Input";
import EventContext from "../../context/events/EventContext";
import { useNavigate } from "react-router-dom";
const CollegeRegister = () => {
  const navigate = useNavigate()
  const { getEvents, getUserEvents } = useContext(EventContext);
  const defaultParam = {
    title: "",
    date: "",
    registrationEndDate: "",
    description: "",
    maxParticipantsPerTeam: "",
    maxParticipants: "",
    currentParticipants: 0,
  };
  const [parameter, setParameter] = useState(defaultParam);
  const submit = async () => {
    try {
      const responce = await fetch("http://localhost:5001/api/event/create", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameter),
      });
      const json = await responce.json();
      if (json.success) {
        alert("successfully registered");
        getUserEvents();
        getEvents();
        navigate('/college')
      }
    } catch (error) {
      console.log(error);
    }
  };
  const create = (e) => {
    setParameter({ ...parameter, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <Input
          type="text"
          update={create}
          placeholder="Enter the title"
          message="Title"
          name="title"
        />
        <Input type="date" update={create} message="Event Date" name="date" />
        <Input
          type="date"
          update={create}
          message="Registration Closing date"
          name="registrationEndDate"
        />
        <Input
          type="number"
          update={create}
          placeholder="no, of participents per team, default 1"
          message="Participents Per-Team"
          name="maxParticipantsPerTeam"
        />
        <Input
          type="number"
          update={create}
          placeholder="Maximim Participent"
          message="Total participents required"
          name="maxParticipants"
        />
        <div className="mt-1 p-2">
          <label htmlFor="status" className="my-5">
            Status of the event
          </label>
          <select name="status" id="status" className="mx-6 " onChange={create}>
            <option defaultChecked value="active">
              active
            </option>
            <option value="awaiting">awaiting</option>
          </select>
        </div>

        <div className="mt-1 p-2">
          <label htmlFor="description">Description on the event</label>
          <br />
          <textarea
            name="description"
            id="description"
            rows={4}
            onChange={create}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          ></textarea>
        </div>

        <button
          className="bg-blue-500 text-blue-50 hover:text-blue-900 "
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CollegeRegister;
