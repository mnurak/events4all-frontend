const Modal = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white border border-blue-500 rounded-lg p-6 w-11/12 md:w-1/2 shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-600">{event.title}</h2>
        <p className="text-gray-600">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Registration Ends:{" "}
          {new Date(event.registrationEndDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          Max Participants: {event.maxParticipants}
        </p>
        <p className="text-gray-600">
          Current Participants: {event.currentParticipants}
        </p>
        <p className="text-gray-600">Status: {event.status}</p>
        <p className="mt-2">{event.description}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white rounded px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
