import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import EventContext from "../../context/events/EventContext";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CollegeCorrection = () => {
  const { userEvents, getUserEvents, fetched } = useContext(EventContext);
  const { user, BACKEND_LINK } = useContext(AuthContext);
  const [parameter, setParameter] = useState(null);
  const navigate = useNavigate();
  const id = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    if (fetched) getUserEvents();
  }, [user, fetched]);

  useEffect(() => {
    const event = userEvents.find((item) => item._id === id);
    setParameter(event);
  }, [userEvents]);

  const handleChange = (e) => {
    setParameter({ ...parameter, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${BACKEND_LINK}/api/event/update/${id}`, {
        method: "PATCH",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameter),
      });
      const json = await res.json();
      if (json.success) navigate("/registered");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-600">Edit Event Details</h2>
        <button
          onClick={getUserEvents}
          className="text-2xl text-blue-400 hover:text-blue-600 transform hover:scale-110"
          title="Refresh Events"
        >
          &#x21BB;
        </button>
      </div>

      <Input type="text" update={handleChange} value={parameter?.title || ""} placeholder="Title" message="Title" name="title" />
      <Input type="date" update={handleChange} value={formatDate(parameter?.date)} message="Event Date" name="date" />
      <Input type="date" update={handleChange} value={formatDate(parameter?.registrationEndDate)} message="Registration Close Date" name="registrationEndDate" />
      <Input type="number" update={handleChange} value={parameter?.maxParticipantsPerTeam || ""} placeholder="1" message="Participants Per Team" name="maxParticipantsPerTeam" />
      <Input type="number" update={handleChange} value={parameter?.maxParticipants || ""} placeholder="100" message="Total Participants Allowed" name="maxParticipants" />

      <div className="space-y-2">
        <label htmlFor="status" className="font-medium">Status</label>
        <select
          id="status"
          name="status"
          value={parameter?.status || "active"}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="active">Active</option>
          <option value="awaiting">Awaiting</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="font-medium">Event Description</label>
        <textarea
          id="description"
          name="description"
          value={parameter?.description || ""}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Changes
      </button>
    </div>
  );
};

export default CollegeCorrection;
