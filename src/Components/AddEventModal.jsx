// AddEventModal.js
// import React, { useState } from 'react';
import Modal from "react-modal";
import AddEvent from "./AddEvent.jsx";
import * as commands from "./support_func.js";
// import AddEvent from "./AddEvent.jsx";
// const AddEventModal = ({ isOpen, onRequestClose, onAddEvent }) => {
// return (
//   <Modal
//     isOpen={isOpen}
//     onRequestClose={onRequestClose}
//     contentLabel="Add Event Modal"
//     ariaHideApp={false} // This disables the warning about the modal not being accessible to screen readers
//   >
//     <div className="p-4 bg-gray-200">
//       <h2 className="text-2xl font-bold mb-4">Add Event</h2>
//       {/* <ScheduleCreateForm
//         onSubmit={(fields) => {
//           // Example function to trim all string inputs
//           const updatedFields = {};
//           Object.keys(fields).forEach((key) => {
//             updatedFields[key] = fields[key];
//           });
//           updatedFields["userinfoID"] = commands.cognito_Id;
//           console.log(`testing`, { updatedFields });
//           return updatedFields;
//         }}
//         onError={(error) => {
//           console.log(`testing`, error);
//         }}
//       /> */}
//       <AddEvent onSubmit={onAddEvent} />

//     </div>
//   </Modal>
// );
// const customStyles = {
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: '50',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   content: {
//     width: '50%',
//     backgroundColor: '#4a5568', // Adjust the background color as needed
//     borderRadius: '8px', // Adjust the border radius as needed
//     padding: '20px', // Adjust the padding as needed
//   },
// };
const AddEventModal = ({
  isOpen,
  onRequestClose,
  onAddEvent,
  onUpdateFields,
}) => {
  const handleAddEvent = (fields) => {
    const updatedFields = { ...fields, userinfoID: commands.cognito_Id };
    console.log("Updated fields:", updatedFields);
    onAddEvent(updatedFields); // Pass the updated fields to the parent component
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Event Modal"
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-1/2 relative"
    >
      <h2 className="text-2xl font-bold mb-4 justify-center text-center">
        Add Event
      </h2>
      <button
        className="absolute top-0 right-0 p-4 text-white"
        onClick={onRequestClose}
      >
        X
      </button>
      <AddEvent
        onSubmit={handleAddEvent}
        onError={(error) => console.log("Error:", error)}
      />
    </Modal>
  );
};

export default AddEventModal;
