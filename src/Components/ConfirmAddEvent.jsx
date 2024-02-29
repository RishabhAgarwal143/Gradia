import React from "react";
import ReactModal from "react-modal"; // Import the modal component from your modal library
// Import EventDesc from AWS Amplify
import AddEventCard from "./AddEventCard";
// import EventDetailsCard from "./EventDetailsCard";

const ConfirmAddModal = ({ event, isOpen, onCancel, position, onConfirm }) => {
  // console.log("I am here", event);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      style={{
        content: {
          //   top: position.top,
          //   left: position.left,
          //   right: "auto",
          //   bottom: "auto",
          //   padding: "20px",
          //   border: "none",
          //   zIndex: 9999,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="relative rounded-lg py-8 px-8">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onCancel}
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
        {/* <EventDetailsCard event={event} Close={onCancel} /> */}
        <AddEventCard event={event} Close={onCancel} onConfirm={onConfirm} />
      </div>
      {/* <div className="bg-white rounded-lg p-6 w-1/4 h-1/4">

            </div> */}
    </ReactModal>
  );
};

export default ConfirmAddModal;

// import { useEffect } from 'react';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { deleteSchedule } from '../support_local_files/support_func';

// const ConfirmAddModal = ({ isOpen, onConfirm, onCancel }) => {
//     console.log('ConfirmAddModal', isOpen);
//     useEffect(() => {

//         if (isOpen) {
//             confirmAlert({
//                 title: 'Confirm Add Event',
//                 message: 'Are you sure you want to add this event?',
//                 buttons: [
//                     {
//                         label: 'Yes',
//                         onClick: onConfirm(true)
//                     },
//                     {
//                         label: 'No',
//                         onClick: onConfirm(false)
//                     }
//                 ]
//             });

//         }
//     });
//     return null;

// return (
//     <div className={`modal ${isOpen ? 'is-active' : ''}`}>
//         <div className="modal-background" onClick={onCancel}></div>
//         <div className="modal-content">
//             <div className="box">
//                 <p>Are you sure you want to add this event?</p>
//                 <div className="buttons">
//                     <button className="button is-primary" onClick={() => onConfirm(true)}>Yes</button>
//                     <button className="button" onClick={() => onConfirm(false)}>No</button>
//                 </div>
//             </div>
//         </div>
//         <button className="modal-close is-large" aria-label="close" onClick={onCancel}></button>
//     </div>
// );
// };

// export default ConfirmAddModal;
