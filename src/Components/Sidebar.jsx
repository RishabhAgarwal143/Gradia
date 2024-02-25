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

  const categoryColors = {};

  // const getCategoryColor = (category) => {
  const getCategoryColor = (category) => {
    if (categoryColors[category]) {
      return categoryColors[category];
    } else {
      const hue = Math.floor(Math.random() * 360);
      const newColor = `hsl(${hue}deg, 100%, 50%)`;
      categoryColors[category] = newColor;
      return newColor;
    }
  };

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
            <li
              key={schedule.id}
              className="bg-gray-400 bg-opacity-10 p-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="text-left align-middle mb-2 text-md ">
                <span
                  className="inline-block w-1 h-6 mr-1 bg-blue-900"
                  style={{
                    backgroundColor: getCategoryColor(schedule.CATEGORIES),
                  }}
                ></span>
                {schedule.SUMMARY + ` `}
                {new Date(schedule.DUE).toLocaleDateString()}
              </div>
              <div className="text-left mb-2 text-sm ">
                {schedule.CATEGORIES}
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Sidebar;
