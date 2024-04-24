import React, { useState, useEffect } from "react";
import { list_tasks_item, update_status_task } from "./support_func";
const Sidebar = () => {
  const [schedules, setSchedules] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const TasksData = await list_tasks_item();
        const filteredData = TasksData.filter((task) => task.STATUS !== "COMPLETED" && task.STATUS !== "CANCELLED");
        filteredData.sort((a, b) => {
          return new Date(a.DUE) - new Date(b.DUE);
        });

        console.log(filteredData);
        // console.log(TasksData.data.listTasks.items);
        setSchedules(filteredData);
      } catch (error) {
        console.error(error);
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
  const handleCheckboxChange = async (index) => {
    const confirmed = window.confirm("Mark this task as completed?");
    if (!confirmed) {
      return;
    }

    const updatedSchedules = [...schedules];
    updatedSchedules[index].STATUS = "COMPLETED";
    setSchedules(updatedSchedules);
    try {
      await update_status_task(updatedSchedules[index].id, "COMPLETED");
    } catch (error) {
      console.error("Error updating task status:", error);
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
            {schedules.map((schedule, index) => (
            <li
              key={schedule.id}
              className="bg-gray-400 bg-opacity-10 p-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
            >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={schedule.STATUS === "COMPLETED"}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <div
                      className="inline-block w-1 h-6 bg-blue-900"
                      style={{
                        backgroundColor: getCategoryColor(schedule.subjectsID),
                      }}
                    ></div>
                    <div className="text-md">
                      {schedule.SUMMARY + ` `}
                      {new Date(schedule.DUE).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm mt-1">{schedule.LOCATION}</div>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Sidebar;
