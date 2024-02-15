import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyle.css';
import { list_schedule_item } from '../support_local_files/support_func';
// import { EventDesc, ScheduleCreateForm } from '../ui-components';
import AddEventModal from './AddEventModal';
import addIcon from '../icons/add.svg';
// import { InfoBox } from '../ui-components';
// import ConfirmationModal from './ConfirmationModal'; // Import the new component
import Sidebar from './Sidebar';
import EventDescModal from './EventDescModal';
import { RRule } from 'rrule';
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [myEvents, setAllEvents] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);

    async function fetchData() {
        try {
            const todos = await list_schedule_item();
            console.log("todos", todos.data.listSchedules.items.length)
            const allEvents = processEvents(todos.data.listSchedules.items);
            console.log("HERE in fetch", todos.data.listSchedules.items);
            setAllEvents(allEvents);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const processEvents = (fetchedEvents) => {
        const processedEvents = [];
        fetchedEvents.forEach(event => {
            if (event.RRULE) {

                const occurrences = generateOccurrences(event);
                processedEvents.push(...occurrences);
            } else {
                processedEvents.push(event);
            }
        });
        return processedEvents;
    };

    const generateOccurrences = (event) => {
        const { BYDAYS, FREQ, INTERVALS, UNTIL, WKST } = event.RRULE;

        // Convert BYDAYS string to an array of days
        const byDaysArray = BYDAYS ? BYDAYS.split(',') : [];

        // Parse UNTIL date
        const untilDate = new Date(UNTIL);

        // Create an RRule object
        const rule = new RRule({
            freq: RRule[FREQ],
            interval: INTERVALS,
            byweekday: byDaysArray.map(day => RRule[day]),
            until: untilDate,
            wkst: RRule[WKST],
            dtstart: new Date(event.DTSTART)
        });

        // Generate occurrences based on the rule
        const occurrences = rule.all();

        console.log("occurrences", occurrences);
        return occurrences.map(occurrence => ({
            ...event,
            DTSTART: occurrence,
            DTEND: new Date(new Date(occurrence).getTime() + (new Date(event.DTEND).getTime() - new Date(event.DTSTART).getTime())),
            // Adjust other properties as needed
        }));
    };


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

    const handleAddEvent = (newEvent) => {
        setAllEvents([...myEvents, newEvent]);
        setIsAddModalOpen(false); // Close the form after adding event
    };

    const handleDoubleClickEvent = (event) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true); // Open the modal
    };
    const originalSelectedEvent = myEvents.find(item => item.id === selectedEvent?.id);
    console.log("originalSelectedEvent", originalSelectedEvent);
    return (
        <div className="flex flex-col">
            <div className="flex-1 relative">
                <div className="h-screen bg-gray-200 flex items-center justify-center relative">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
                    >
                        <img src={addIcon} alt="Add Event" className="w-6 h-6" />
                    </button>
                    <AddEventModal
                        isOpen={isAddModalOpen}
                        onRequestClose={() => setIsAddModalOpen(false)}
                        onAddEvent={handleAddEvent}
                    />
                    <EventDescModal
                        event={originalSelectedEvent}
                        isOpen={isEventModalOpen}
                        onClose={() => setIsEventModalOpen(false)}
                    />
                    <div>

                    </div>
                    <Calendar
                        localizer={localizer}
                        events={transformedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        onDoubleClickEvent={handleDoubleClickEvent}
                        defaultView="week"
                        views={['month', 'week', 'day', 'agenda']}
                        className="w-3/4 left-0 top-0 absolute bg-white p-4 rounded-lg shadow-lg"
                    />
                </div>
            </div>
            <div>

            </div>
            <div className='flex'>
                {/* <h1 className="text-black text-xl font-bold mt-8 mb-4">Tasks</h1> */}
                <div className="fixed top-1/2 transform -translate-y-1/2 right-0 h-3/4 w-1/4 flex flex-col items-center justify-center overflow-y-auto">
                    <Sidebar />
                </div>
            </div>



        </div>
    );

};

export default MyCalendar;
