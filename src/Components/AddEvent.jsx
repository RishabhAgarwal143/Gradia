import React, { useState } from 'react';
import { cognito_Id } from '../support_local_files/support_func';
const AddEvent = ({ onSubmit }) => {
    const [summary, setSummary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [rrule, setRRule] = useState('');
    const [frequency, setFrequency] = useState('');
    const [interval, setInterval] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [categories, setCategories] = useState('');
    const [monthlyDay, setMonthlyDay] = useState('');
    const [yearlyMonth, setYearlyMonth] = useState('');
    const [monthlyInterval, setMonthlyInterval] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        // Create an event object with the form data
        const eventData = {
            SUMMARY: summary,
            DTSTART: new Date(`${startDate}T${startTime}Z`),
            DTEND: new Date(`${endDate}T${endTime}Z`),
            LOCATION: location,
            DESCRIPTION: description,
            RRULE: {
                FREQ: "WEEKLY",
                INTERVAL: 1,
            // BYDAYS: selectedDays,
            // UNTIL: new Date(`${endDate}T${endTime}Z`),
            // WKST: new Date(startDate).getDay(),

            },
            userinfoID: cognito_Id,
        };
        // Call the onSubmit function and pass the event data
        onSubmit(eventData);
        // Reset the form fields after submission
        setSummary('');
        setStartDate('');
        setStartTime('');
        setEndDate('');
        setEndTime('');
        setLocation('');
        setDescription('');
        setRRule('');
        setFrequency('');
        setInterval();
        setSelectedDays([]);
    };

    // Function to render additional options based on the selected RRULE
    const renderRRuleOptions = () => {
        if (rrule === 'WEEKLY') {
            return (
                <div className="form-group">
                    <label htmlFor="daysOfWeek" className="block text-sm font-semibold mb-1">Select Days:</label>
                    <div className="flex flex-wrap">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <label key={day} className="mr-2">
                                <input
                                    type="checkbox"
                                    value={day}
                                    checked={selectedDays.includes(day)}
                                    onChange={(e) => handleDayChange(e, day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>
            );
        } else if (rrule === 'MONTHLY') {
            return (
                <div>
                    <div className="form-group">
                        <label htmlFor="monthlyDay" className="block text-sm font-semibold mb-1">Day of the Month:</label>
                        <input
                            type="number"
                            id="monthlyDay"
                            value={monthlyDay}
                            onChange={(e) => setMonthlyDay(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white"
                            min="1"
                            max="31"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="monthlyInterval" className="block text-sm font-semibold mb-1">Repeat Every:</label>
                        <select
                            id="monthlyInterval"
                            value={monthlyInterval}
                            onChange={(e) => setMonthlyInterval(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white"
                        >
                            <option value="1">Every month</option>
                            <option value="2">Every two months</option>
                            <option value="3">Every three months</option>
                            <option value="4">Every four months</option>
                            <option value="5">Every five months</option>
                            <option value="6">Every six months</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </div>
            );
        } else if (rrule === 'YEARLY') {
            return (
                <div className="form-group">
                    <label htmlFor="yearlyMonth" className="block text-sm font-semibold mb-1">Month of the Year:</label>
                    <select
                        id="yearlyMonth"
                        value={yearlyMonth}
                        onChange={(e) => setYearlyMonth(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white"
                        required
                    >
                        <option value="">Select Month...</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            );
        }
        return null;
    };


    // Function to handle day selection for weekly recurrence
    const handleDayChange = (e, day) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedDays([...selectedDays, day]);
        } else {
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <div className="form-group">
                <label htmlFor="summary" className="block text-sm font-semibold mb-1">Summary:</label>
                <input type="text" id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" required />
            </div>
            <div className="flex">
                <div className="form-group mr-4">
                    <label htmlFor="startDate" className="block text-sm font-semibold mb-1">Start Date:</label>
                    <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" required />
                </div>
                <div className="form-group mr-4">
                    <label htmlFor="startTime" className="block text-sm font-semibold mb-1">Start Time:</label>
                    <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" required />
                </div>
            </div>
            <div className="flex">
                <div className="form-group mr-4">
                    <label htmlFor="endDate" className="block text-sm font-semibold mb-1">End Date:</label>
                    <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" required />
                </div>
                <div className="form-group mr-4">
                    <label htmlFor="endTime" className="block text-sm font-semibold mb-1">End Time:</label>
                    <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" required />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="location" className="block text-sm font-semibold mb-1">Location:</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="block text-sm font-semibold mb-1">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="rrule" className="block text-sm font-semibold mb-1">Recurrence Rule:</label>
                <select id="rrule" value={rrule} onChange={(e) => setRRule(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white">
                    <option value="">Select...</option>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                </select>
                <div className="mt-2">{renderRRuleOptions()}</div>
            </div>
            <div className="form-group">
                <label htmlFor="categories" className="block text-sm font-semibold mb-1">Categories:</label>
                <input type="text" id="categories" value={categories} onChange={(e) => setCategories(e.target.value)} className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-white" />
            </div>
            <button type="submit" className="mx-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">Submit</button>
        </form>
    );
};

export default AddEvent;
