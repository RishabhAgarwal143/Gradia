import React, { useState } from "react";

const AddTaskForm = ({ subjectsID, onSubmit, onCancel }) => {
    const [summary, setSummary] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [status, setStatus] = useState("IN-PROGRESS");
    const [grade, setGrade] = useState("");
    const [weightage, setWeightage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({ "subjectsID": subjectsID, "SUMMARY": summary, "DUE": dateTime, "STATUS": status, "current_Grade": grade, "task_Weightage": weightage, "taskID": subjectsID });
        setSummary("");
        setDateTime("");
        setStatus("IN-PROGRESS");
        setGrade("");
        setWeightage("");
    };

    const handleCancel = () => {
        onCancel();
        setSummary("");
        setDateTime("");
        setStatus("IN-PROGRESS");
        setGrade("");
        setWeightage("");
    };

    return (
        <>
            <tr className=" text-white" style={{ color: "#323232" }}>
                <td className="p-4">
                    <input
                        type="text"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Summary"
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none"
                        required
                    />
                </td>
                <td className="p-4">
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none"
                        required
                    />
                </td>
                <td className="p-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none"
                    >
                        <option value="COMPLETE">COMPLETE</option>
                        <option value="IN-PROGRESS">IN-PROGRESS</option>
                        <option value="NEEDS-ACTION">NEEDS ACTION</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </td>
                <td className="p-4">
                    <input
                        type="number"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="Grade"
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none"
                        required
                    />
                </td>
                <td className="p-4"></td>
                <td className="p-4">
                    <input
                        type="number"
                        value={weightage}
                        onChange={(e) => setWeightage(e.target.value)}
                        placeholder="Weightage"
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none"
                        required
                    />
                </td>
                <td className="p-4"></td>
            </tr>
            <tr className=" text-white" style={{ color: "#323232" }}>
                <td colSpan="7" className="p-4 text-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none"
                    >
                        <span className="text-white font-bold">Add</span>
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    >
                        <span className="text-white font-bold">Cancel</span>
                    </button>
                </td>
            </tr>
        </>
    );
};

export default AddTaskForm;
