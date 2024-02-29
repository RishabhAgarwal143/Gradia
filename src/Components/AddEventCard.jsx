import React from "react";

const AddEventCard = ({ event, Close, onConfirm }) => {
  // console.log("in add event card:", event);

  const convertToTimeString = (date) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(date).toLocaleTimeString([], options);
  };

  const convertToDateString = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString([], options);
  };

  return (
    <div>
      {
        <div className="event-details-card bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold">{event.SUMMARY}</h2>
          <p className="mt-2">
            <strong>Start:</strong> {convertToTimeString(event.DTSTART)},{" "}
            {convertToDateString(event.DTSTART)}
          </p>
          <p>
            <strong>End:</strong> {convertToTimeString(event.DTEND)},{" "}
            {convertToDateString(event.DTEND)}
          </p>
          <p className="mt-2">
            <strong>Description:</strong> {event.DESCRIPTION}
          </p>
          <div className="options mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mr-2 rounded"
              onClick={() => onConfirm(true)}
            >
              Accept
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => onConfirm(false)}
            >
              Delete
            </button>
          </div>
        </div>
      }
      {/* <ConfirmationModal event={event} isOpen={isDelModalOpen} /> */}
    </div>
  );
};

export default AddEventCard;
