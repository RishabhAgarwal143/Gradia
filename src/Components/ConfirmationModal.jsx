import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// import { deleteSchedule } from "./support_func";

const ConfirmationModal = ({ event, isOpen, isClose, onDel }) => {
  const handleDelete = async () => {
    try {
      isOpen = false;
      isClose();
      onDel(event);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  useEffect(() => {
    // console.log("in delete confirmation", event);
    if (isOpen) {
      confirmAlert({
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this event?",
        buttons: [
          {
            label: "Yes",
            onClick: handleDelete,
          },
          {
            label: "No",
            onClick: () => {
              isClose();
            },
          },
        ],
      });
    }
  });

  return null;
};

export default ConfirmationModal;
// import { useEffect } from 'react';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
// import { deleteSchedule } from '../support_local_files/support_func';

// const ConfirmationModal = ({ event, isOpen, onClose }) => {
//     const handleDelete = async () => {
//         try {
//             // Call the delete function to delete the event
//             const deletedSchedule = await deleteSchedule(event.id);
//             console.log('Event deleted:', deletedSchedule);
//             onClose(); // Close the modal after deletion
//         } catch (error) {
//             console.error('Error deleting event:', error);
//         }
//     };

//     useEffect(() => {
//         if (isOpen) {
//             confirmAlert({
//                 title: 'Confirm Deletion',
//                 message: 'Are you sure you want to delete this event?',
//                 buttons: [
//                     {
//                         label: 'Yes',
//                         onClick: handleDelete
//                     },
//                     {
//                         label: 'No',
//                         onClick: onClose // Close the modal without deleting
//                     }
//                 ]
//             });
//         }
//     }); // Include all dependencies here

//     return null;
// };

// export default ConfirmationModal;
