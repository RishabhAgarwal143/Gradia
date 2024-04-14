import {
  listSubjects,
  list_tasks_grade_item,
  update_grade_task,
} from "./support_func";
import React, { useState, useEffect } from "react";
import "./gradeStyles.css";

let subject_list_json = [];
let task_grade_info = [];

function formatLocalTime(isoString) {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Convert the Date object to a string in the local timezone using Intl.DateTimeFormat
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  return formattedDate;
}

const Sidebar = ({ subjects, onClick, onSearch }) => {
  return (
    <div className="sidebar">
      <h1>
        <b>Subjects</b>
      </h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <ul className="subject-list">
        {subjects.map((subject, index) => (
          <li
            key={index}
            onClick={() => onClick(subject)}
            className="subject-item"
          >
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

const statusOrder = ["IN_PROCESS", "NEEDS_ACTION", "COMPLETED", "CANCELLED"];

const StatusDropdown = ({ status, onStatusChange, isOpen, onToggle }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(status);

  const handleConfirm = () => {
    onStatusChange(selectedStatus);
    onToggle();
  };

  return (
    <>
      <button style={{ color: "black " }} onClick={onToggle}>
        {status}
      </button>
      {isOpen && (
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOrder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ color: "blue ", marginRight: "10px" }}
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button style={{ color: "red" }} onClick={onToggle}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const GradeBox = ({ grade, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = React.useState(grade);
  const [change, setChange] = React.useState(false);

  const handleConfirm = () => {
    if (isNaN(selectedStatus)) {
      setSelectedStatus(grade);
    }
    onStatusChange(selectedStatus);
    setChange(false);
  };

  const onCancel = () => {
    setSelectedStatus(grade);
    setChange(false);
  };

  return (
    <>
      <input
        type="number"
        value={selectedStatus}
        onChange={(e) => {
          const newGrade = e.target.value;
          if (newGrade < 0) {
            setSelectedStatus(0);
          } else {
            setSelectedStatus(parseInt(newGrade, 10));
          }
          setChange(true);
        }}
      />
      {change && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{ color: "blue ", marginRight: "10px" }}
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button style={{ color: "red" }} onClick={onCancel}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

const SecondComponent = ({ subject, task }) => {
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [trigger_refresh, setTrigger] = useState(false);

  let tasks = [];
  if (task && task.Tasks) {
    tasks = task.Tasks.items.sort((a, b) => {
      const indexA = statusOrder.indexOf(a.STATUS);
      const indexB = statusOrder.indexOf(b.STATUS);

      if (indexA === -1) {
        return 1;
      } else if (indexB === -1) {
        return -1;
      } else if (indexA < indexB) {
        return -1;
      } else if (indexA > indexB) {
        return 1;
      } else {
        const dueIndexA = new Date(a.DUE).getTime();
        const dueIndexB = new Date(b.DUE).getTime();

        if (dueIndexA === dueIndexB) {
          return 0;
        } else if (dueIndexA < dueIndexB) {
          return -1;
        } else {
          return 1;
        }
      }
    });
  }
  if (task_grade_info) {
    for (let i = 0; i < tasks.length; i++) {
      let id = tasks[i].taskTaskGradeInfoId;

      // Check if the id exists in list2
      let index = task_grade_info.findIndex((item) => item.id === id);

      if (index !== -1) {
        // Add the json information from list2 to list1
        tasks[i] = { ...tasks[i], ...task_grade_info[index] };
        tasks[i].id = tasks[i].taskGradeInfoTaskId;
        // Remove the item from list2
        task_grade_info.splice(index, 1);
        console.log(tasks[i]);
      }
    }
  }

  const handleStatusChange = (index, newStatus) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [index]: newStatus,
    }));
    tasks[index].STATUS = newStatus;
    console.log(tasks[index]);
  };

  const Refresh = () => {
    if (trigger_refresh === false) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  };

  const handleGradeChange = async (index, newGrade) => {
    // tasks[index].current_Grade = newGrade;
    tasks[index].current_Grade = newGrade;
    let new_percentage = (newGrade * tasks[index].task_Weightage) / 100;
    tasks[index].overall_Percentage = new_percentage;
    console.log("🚀 ~ handleGradeChange ~ tasks[index]:", tasks[index]);
    Refresh();
    const updatedValue = await update_grade_task(
      tasks[index].taskTaskGradeInfoId,
      tasks[index].id,
      newGrade,
      new_percentage,
      tasks[index].task_Weightage
    );
    if (!tasks[index].taskTaskGradeInfoId) {
      tasks[index].taskTaskGradeInfoId =
        updatedValue.data.createTaskGradeInfo.id;
    }
    console.log(tasks[index]);
  };

  const handleTaskWeightageChange = async (index, newGrade) => {
    tasks[index].task_Weightage = newGrade;
    if (!tasks[index].current_Grade) {
      tasks[index].current_Grade = 0;
    }
    let new_percentage = (newGrade * tasks[index].current_Grade) / 100;
    tasks[index].overall_Percentage = new_percentage;
    Refresh();
    const updatedValue = await update_grade_task(
      tasks[index].taskTaskGradeInfoId,
      tasks[index].id,
      tasks[index].current_Grade,
      new_percentage,
      newGrade
    );
    if (!tasks[index].taskTaskGradeInfoId) {
      tasks[index].taskTaskGradeInfoId =
        updatedValue.data.createTaskGradeInfo.id;
    }
    console.log(tasks[index]);
  };

  const toggleStatusDropdown = (index) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [index]: !prevStatuses[index],
    }));
  };

  return (
    <div className="main-content">
      <h2 className="bg-white">Selected Subject: {subject}</h2>
      <h2 className="bg-white text-left">
        Current Grade: {(task && task.current_Grade) || 0} Target Grade:{" "}
        {(task && task.target_Grade) || 0}
      </h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>TASKS</th>
              <th>DUE</th>
              <th>STATUS</th>
              <th>GRADE</th>
              <th>OVERALL GRADE</th>
              <th>TASK WEIGHTAGE</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td style={{ width: "500px" }}>{task.SUMMARY}</td>
                <td style={{ width: "300px" }}>{formatLocalTime(task.DUE)}</td>
                <td style={{ width: "150px", textAlign: "center" }}>
                  <StatusDropdown
                    status={selectedStatuses[index] || task.STATUS}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(index, newStatus)
                    }
                    isOpen={selectedStatuses[index]}
                    onToggle={() => toggleStatusDropdown(index)}
                  />
                </td>
                <td style={{ width: "50px", textAlign: "center" }}>
                  <GradeBox
                    grade={task.current_Grade || 0}
                    onStatusChange={(newStatus) =>
                      handleGradeChange(index, newStatus)
                    }
                  />
                </td>
                <td style={{ width: "50px", textAlign: "center" }}>
                  {task.overall_Percentage || 0}
                </td>
                <td style={{ width: "50px", textAlign: "center" }}>
                  <GradeBox
                    grade={task.task_Weightage || 0}
                    onStatusChange={(newStatus) =>
                      handleTaskWeightageChange(index, newStatus)
                    }
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GradeView = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findSubjectByName = (subject_Name) => {
    return subject_list_json.find(
      (subject) => subject.subject_Name === subject_Name
    );
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  useEffect(() => {
    async function fetchSubjects() {
      subject_list_json = await listSubjects();
      task_grade_info = await list_tasks_grade_item();
      console.log(task_grade_info);
      subject_list_json.sort(
        (a, b) => b.Tasks.items.length - a.Tasks.items.length
      );
      console.log(subject_list_json);
      const subject_list = Array.from(
        subject_list_json,
        (subject) => subject.subject_Name
      );
      setSubjects(subject_list);
    }

    fetchSubjects();
  }, []);

  return (
    <div className="container">
      <Sidebar
        subjects={filteredSubjects}
        onClick={handleSubjectClick}
        onSearch={handleSearch}
      />
      <div className="main-content">
        {selectedSubject && (
          <SecondComponent
            subject={selectedSubject}
            task={findSubjectByName(selectedSubject)}
          />
        )}
      </div>
      {/* <button onClick={RenderCalendar}>Render New Component</button> */}
    </div>
  );
};

export default GradeView;
