import React, { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteSchedule } from '../support_local_files/support_func';
import { EventDesc } from '../ui-components';
const ConfirmationModal = ({ event, onDelete, isOpen }) => {
    const handleDelete = async () => {
        try {
            // Call the delete function to delete the event

            const deletedSchedule = await deleteSchedule(event.id);
            console.log('Event deleted:', deletedSchedule);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    useEffect(() => {

        if (isOpen) {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this event?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: handleDelete
                    },
                    {
                        label: 'No',
                        onClick: () => { }
                    }
                ]
            });

            console.log('Event: here', event);
        }
    }, [isOpen, event, onDelete]);

    return null;
};

export default ConfirmationModal;

// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './CalendarStyle.css';
// import { list_schedule_item } from '../support_local_files/support_func';
// import { EventDesc, ScheduleCreateForm } from '../ui-components';
// import AddEventModal from './AddEventModal';
// import addIcon from '../icons/add.svg';
// import { InfoBox } from '../ui-components';
// import ConfirmationModal from './ConfirmationModal'; // Import the new component
// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//     const [myEvents, setAllTodos] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     // const [isDelModalOpen, setIsDelModalOpen] = useState(false);
//     const [selectedEvent, setSelectedEvent] = useState(null);

//     async function fetchData() {
//         try {
//             const todos = await list_schedule_item();
//             console.log("HERE in fetch", todos.data.listSchedules.items);
//             setAllTodos(todos.data.listSchedules.items);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const transformedEvents = myEvents.map(event => ({
//         title: event.SUMMARY,
//         start: new Date(event.DTSTART),
//         end: new Date(event.DTEND),
//         location: event.LOCATION,
//         description: event.DESCRIPTION,
//         createdAt: new Date(event.createdAt),
//         updatedAt: new Date(event.updatedAt),
//         owner: event.owner,
//         userinfoID: event.userinfoID,
//         id: event.id,
//     }));

//     const handleAddEvent = (newEvent) => {
//         setAllTodos([...myEvents, newEvent]);
//         setIsModalOpen(false); // Close the form after adding event
//     };

//     // const handleDoubleClickEvent = (event) => {
//     //     setSelectedEvent(event);
//     //     setIsDelModalOpen(true);
//     // };

//     // const deleteEvent = (eventToDelete) => {
//     //     const updatedEvents = myEvents.filter(event => event.id !== eventToDelete.id);
//     //     setAllTodos(updatedEvents);
//     //     setSelectedEvent(null); // Clear selected event
//     //     setIsDelModalOpen(false);
//     // };

//     return (
//         <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
//             <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
//             >
//                 <img src={addIcon} alt="Add Event" className="w-6 h-6" />
//             </button>
//             <AddEventModal
//                 isOpen={isModalOpen}
//                 onRequestClose={() => setIsModalOpen(false)}
//                 onAddEvent={handleAddEvent}
//             />
//             {/* <ConfirmationModal
//                 event={selectedEvent}
//                 onDelete={deleteEvent}
//                 isOpen={isDelModalOpen}
//             /> */}
//             {/* <EventDesc schedule={selectedEvent} isOpen={isDelModalOpen} /> */}
//             <Calendar
//                 localizer={localizer}
//                 events={transformedEvents}
//                 startAccessor="start"
//                 endAccessor="end"
//                 // onDoubleClickEvent={handleDoubleClickEvent}
//                 defaultView="week"
//                 views={['month', 'week', 'day', 'agenda']}
//                 className="w-screen  shadow-lg bg-white p-4 rounded-lg"
//             />
//         </div>
//     );
// };

// export default MyCalendar;
