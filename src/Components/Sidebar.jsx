import React, { useState, useEffect } from "react";
import { list_tasks_item } from "../support_local_files/support_func";

const Sidebar = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TasksData = await list_tasks_item();
        console.log(TasksData.data.listTasks.items);
        setSchedules(TasksData.data.listTasks.items);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className=" text-white p-4 overflow-y-auto rounded-lg h-50">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="grid gap-2">
          {schedules.map((schedule) => (
            <li
              key={schedule.id}
              className="bg-gray-400 bg-opacity-10 p-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
            >
              <div
                className="absolute left-0 top-0 h-full bg-blue-500"
                style={{ width: "4px" }}
              ></div>
              <div className="text-left mb-2 text-lg ">
                {schedule.SUMMARY + ` `}
                {new Date(schedule.DUE).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Sidebar;
