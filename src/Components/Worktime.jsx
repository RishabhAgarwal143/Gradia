import React, { useState } from "react";
import { createUserWorkTim } from "../Components/support_func"

const WorkTimeForm = ({ onClose }) => {
    const [workTimes, setWorkTimes] = useState({
        Monday: { from: "", to: "" },
        Tuesday: { from: "", to: "" },
        Wednesday: { from: "", to: "" },
        Thursday: { from: "", to: "" },
        Friday: { from: "", to: "" },
        Saturday: { from: "", to: "" },
        Sunday: { from: "", to: "" },
    });

    const handleChange = (day, field, value) => {
        setWorkTimes((prevWorkTimes) => ({
            ...prevWorkTimes,
            [day]: {
                ...prevWorkTimes[day],
                [field]: value,
            },
        }));
    };
    function convertTimeStringToISO(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const currentDate = new Date();
        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate.toISOString();
    }

    const handleSubmit = async () => {
        const newUserWorkTimData = {
            "Monday_start": convertTimeStringToISO("08:30"), // Example time string
            "Monday_end": convertTimeStringToISO("17:00"), // Example time string
            "Tuesday_start": convertTimeStringToISO("08:30"), // Example time string
            "Tuesday_end": convertTimeStringToISO("17:00"), // Example time string
            "Wednesday_start": convertTimeStringToISO("08:30"), // Example time string
            "Wednesday_end": convertTimeStringToISO("17:00"), // Example time string
            "Thursday_start": convertTimeStringToISO("08:30"), // Example time string
            "Thursday_end": convertTimeStringToISO("17:00"), // Example time string
            "Friday_start": convertTimeStringToISO("08:30"), // Example time string
            "Friday_end": convertTimeStringToISO("17:00"), // Example time string
            "Saturday_start": convertTimeStringToISO("08:30"), // Example time string
            "Saturday_end": convertTimeStringToISO("12:00"), // Example time string
            "Sunday_start": convertTimeStringToISO("08:30"), // Example time string
            "Sunday_end": convertTimeStringToISO("12:00") // Example time string
        };

        try {
            const result = await createUserWorkTim(newUserWorkTimData);
            console.log("User work time created:", result);
        } catch (error) {
            console.error("Error creating user work time:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Set Work Times</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(workTimes).map((day) => (
                        <div key={day} className="flex flex-col">
                            <label className="text-sm mb-1">{day}</label>
                            <div className="flex">
                                <input
                                    type="time"
                                    value={workTimes[day].from}
                                    onChange={(e) => handleChange(day, "from", e.target.value)}
                                    className="border border-gray-300 p-2 rounded mr-2"
                                />
                                <span>to</span>
                                <input
                                    type="time"
                                    value={workTimes[day].to}
                                    onChange={(e) => handleChange(day, "to", e.target.value)}
                                    className="border border-gray-300 p-2 rounded ml-2"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkTimeForm;
