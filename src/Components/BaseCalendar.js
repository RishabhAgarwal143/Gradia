import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyle.css';
import { list_schedule_item } from '../support_local_files/support_func';
import { ScheduleCreateForm } from '../ui-components';
import AddEventModal from './AddEventModal';
import addIcon from '../icons/add.svg';
const localizer = momentLocalizer(moment);

const MyCalendar = () => {

    const [myEvents, setAllTodos] = useState([]);


    async function fetchData() {
        try {
            const todos = await list_schedule_item();
            console.log("HERE in fetch", todos.data.listSchedules.items);

            setAllTodos(todos.data.listSchedules.items);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const transformedEvents = myEvents.map(event => ({
        title: event.SUMMARY,
        start: new Date(event.DTSTART),
        end: new Date(event.DTEND),
        location: event.LOCATION,
        description: event.DESCRIPTION,
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt),
        owner: event.owner,
        userinfoID: event.userinfoID,
        id: event.id,
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddEvent = (newEvent) => {
        setAllTodos([...myEvents, newEvent]);
        setIsModalOpen(false); // Close the form after adding event
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex items-center justify-center">
            {/* <ScheduleCreateForm onAddEvent={handleAddEvent} /> */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
            >
                <img src={addIcon} alt="Add Event" className="w-6 h-6" />
            </button>
            <AddEventModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onAddEvent={handleAddEvent}
            />
            {setIsModalOpen && (<Calendar
                localizer={localizer}
                events={transformedEvents}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(event) => console.log('Event selected:', event)}
                onSelectSlot={({ start, end }) =>
                    console.log('Slot selected:', start, end)
                }
                // onEventDrop={handleEventDrop}
                // onDragStart={handleDragStart} // Enables dragging
                defaultView="week"
                views={['month', 'week', 'day', 'agenda']}
                className="w-screen  shadow-lg bg-white p-4 rounded-lg"
            />)}
        </div>
    );
};

export default MyCalendar;
