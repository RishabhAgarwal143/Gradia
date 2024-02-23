import React, { useState, useEffect } from "react";
import { list_tasks_item } from "../support_local_files/support_func";
const Sidebar = () => {
  const [schedules, setSchedules] = useState([]);
  // const [tasks, setTasks] = useState([]);
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
    <div
      className=" text-white p-4 overflow-y-auto rounded-lg"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid gap-4">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="text-center mb-2">{schedule.SUMMARY}</div>
              <div className="text-sm text-gray-400">
                {new Date(schedule.DUE).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-400">{schedule.STATUS}</div>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Sidebar;
