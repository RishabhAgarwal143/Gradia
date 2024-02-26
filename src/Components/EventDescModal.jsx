import React from "react";
import ReactModal from "react-modal"; // Import the modal component from your modal library
import EventDetailsCard from "./EventDetailsCard"; // Import EventDesc from AWS Amplify

const EventDescModal = ({ event, isOpen, onClose, position }) => {

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      style={{
        content: {
          top: position.top,
          left: position.left,
          right: 'auto',
          bottom: 'auto',
          padding: '20px',
          border: 'none',
          zIndex: 9999,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}

    >
      <div className="relative rounded-lg py-8 px-8">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <EventDetailsCard event={event} Close={onClose} />
      </div>
      {/* <div className="bg-white rounded-lg p-6 w-1/4 h-1/4">

            </div> */}
    </ReactModal>
  );
};

export default EventDescModal;
