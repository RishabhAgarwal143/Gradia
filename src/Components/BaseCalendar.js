// Import necessary dependencies
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Create a localizer using moment.js
const localizer = momentLocalizer(moment);

// Sample events data
const events = [
    {
        title: 'Event 1',
        start: new Date(2024, 1, 1, 10, 0), // year, month (0-based), day, hour, minute
        end: new Date(2024, 1, 1, 12, 0),
    },
    {
        title: 'Event 2',
        start: new Date(2024, 1, 2, 14, 0),
        end: new Date(2024, 1, 2, 16, 0),
    },
];

// Calendar component
const MyCalendar = () => {
    const [myEvents, setMyEvents] = useState(events);

    return (
        <div style={{ height: '100vh', weight: '100vw' }}>

            <Calendar
                localizer={localizer}
                events={myEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
};

export default MyCalendar;
