import React, { useContext, useState } from "react";
import Input from "../../components/Input";
import EventContext from "../../context/events/EventContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

const CollegeRegister = () => {
  const {BACKEND_LINK} = useContext(AuthContext)
  const navigate = useNavigate();
  const { getEvents, getUserEvents } = useContext(EventContext);
  const defaultParam = {
    title: "",
    date: "",
    registrationEndDate: "",
    description: "",
    link:"",
    maxParticipantsPerTeam: "",
    maxParticipants: "",
    currentParticipants: 0,
  };
  const [parameter, setParameter] = useState(defaultParam);

  const submit = async () => {
    try {
      const response = await fetch(`${BACKEND_LINK}api/event/create`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameter),
      });
      const json = await response.json();
      if (json.success) {
        alert("Successfully registered!");
        getUserEvents();
        getEvents();
        navigate("/college");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const create = (e) => {
    setParameter({ ...parameter, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        College Event Registration
      </h2>

      <div className="space-y-6">
        <Input
          type="text"
          update={create}
          placeholder="Enter the event title"
          message="Event Title"
          name="title"
        />
        <Input type="date" update={create} message="Event Date" name="date" />
        <Input
          type="date"
          update={create}
          message="Registration Closing Date"
          name="registrationEndDate"
        />
        <Input
          type="number"
          update={create}
          placeholder="Participants per team (default: 1)"
          message="Max Participants Per Team"
          name="maxParticipantsPerTeam"
        />
        <Input
          type="number"
          update={create}
          placeholder="Total participants required"
          message="Max Participants"
          name="maxParticipants"
        />
        
        <Input
          type="text"
          update={create}
          placeholder="Enter the link to the poster"
          message="Poster link"
          description="*Make sure the link is publicly accessible."
          name="link"
        />

        <div className="mt-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status of the event
          </label>
          <select
            name="status"
            id="status"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={create}
          >
            <option value="active">Active</option>
            <option value="awaiting">Awaiting</option>
          </select>
        </div>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Event Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            onChange={create}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide a detailed description of the event"
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={submit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeRegister;
