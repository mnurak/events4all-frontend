import React, { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import EventContext from "../../context/events/EventContext";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CollegeCorrection = () => {
  const { userEvents, getUserEvents, fetched } = useContext(EventContext);
  const { user } = useContext(AuthContext);
  const [parameter, setParameter] = useState(null);
  const navigate = useNavigate()
  const queryparms = new URLSearchParams(window.location.search);
  const id = queryparms.get("id");
  useEffect(() => {
    if(fetched)
    getUserEvents();
  }, [user, fetched]);

  useEffect(() => {
    const event = userEvents.find((item) => item._id === id);
    setParameter(event);
  }, [userEvents]);

  const create = (e) => {
    setParameter({ ...parameter, [e.target.name]: e.target.value });
  };
  const formatDate = (date) => {
    if (!date) return ''; // if no date, return an empty string
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0]; // Converts to 'yyyy-MM-dd'
  };
  const submit = async() => {
    try {
        const responce = await fetch(`http://localhost:5001/api/event/update/${id}`, {
            method:'PATCH',
            headers:{
                'auth-token':localStorage.getItem('auth-token'),
                'Content-Type':'application/json'
            },
            body: JSON.stringify(parameter)
        })
        const json = await responce.json()
        if(json.success){
            navigate('/registered')
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div>
      <div className="flex justify-end h-7 px-5 mx-10 my-3 p-2">
        <span className="text-3xl text-blue-400">
          To revert back to the previous state
        </span>
        <span
          className="text-4xl w-15 h-7 flex justify-end hover:scale-110 px-3 hover:cursor-pointer hover:text-blue-400"
          onClick={() => {
            getUserEvents();
          }}
        >
          &#x21BB;
        </span>
      </div>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-8">
          <Input
            type="text"
            update={create}
            value={parameter?.title || ''}
            placeholder="Enter the title"
            message="Title"
            name="title"
          />
          <Input
            type="date"
            update={create}
            value={formatDate(parameter?.date)} 
            message="Event Date"
            name="date"
          />
          <Input
            type="date"
            update={create}
            value={formatDate(parameter?.registrationEndDate)}
            message="Registration Closing date"
            name="registrationEndDate"
          />
          <Input
            type="number"
            update={create}
            value={parameter?.maxParticipantsPerTeam || ''}
            placeholder="no, of participents per team, default 1"
            message="Participents Per-Team"
            name="maxParticipantsPerTeam"
          />
          <Input
            type="number"
            update={create}
            value={parameter?.maxParticipants || ''}
            placeholder="Maximim Participent"
            message="Total participents required"
            name="maxParticipants"
          />
          <div className="mt-1 p-2">
            <label htmlFor="status" className="my-5">
              Status of the event
            </label>
            <select
              name="status"
              id="status"
                value={parameter?.status || 'active'}
              className="mx-6 "
              onChange={create}
            >
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
              value={parameter?.description ||''}
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
    </div>
  );
};

export default CollegeCorrection;
