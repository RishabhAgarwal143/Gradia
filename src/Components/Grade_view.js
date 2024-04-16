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

const GradeBox = ({ index, grade, onStatusChange }) => {
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

  // setSelectedStatus(grade);
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
  const [selectedFile, setSelectedFile] = useState(null);

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
    let old_percentage = 0;
    if (tasks[index].overall_Percentage) {
      old_percentage = tasks[index].overall_Percentage;
    }
    tasks[index].overall_Percentage = new_percentage;
    console.log("🚀 ~ handleGradeChange ~ tasks[index]:", tasks[index]);
    if (!task.current_Grade) {
      task.current_Grade = 0;
    }
    task.current_Grade += new_percentage - old_percentage;

    Refresh();
    const updatedValue = await update_grade_task(
      tasks[index].taskTaskGradeInfoId,
      tasks[index].id,
      newGrade,
      new_percentage,
      tasks[index].task_Weightage,
      task.current_Grade,
      tasks[index].subjectsID
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
    let old_percentage = 0;
    if (tasks[index].overall_Percentage) {
      old_percentage = tasks[index].overall_Percentage;
    }
    tasks[index].overall_Percentage = new_percentage;
    if (!task.current_Grade) {
      task.current_Grade = 0;
    }
    task.current_Grade += new_percentage - old_percentage;
    Refresh();
    const updatedValue = await update_grade_task(
      tasks[index].taskTaskGradeInfoId,
      tasks[index].id,
      tasks[index].current_Grade,
      new_percentage,
      newGrade,
      task.current_Grade,
      tasks[index].subjectsID
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

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    console.log("🚀 ~ handleFileUpload ~ selectedFile:", selectedFile);
    const formData = new FormData();
    formData.append("subject_ID", task.id);
    formData.append("file", selectedFile);
    formData.append("userinfoID", task.userinfoID);

    try {
      const response = await fetch("http://127.0.0.1:5000/syllabus", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      alert("File uploaded successfully");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="main-content">
      <h2 className="bg-white">Selected Subject: {subject}</h2>
      <h2 className="bg-white text-left">
        Current Grade: {(task && task.current_Grade) || 0} Target Grade:{" "}
        {(task && task.target_Grade) || 0}
      </h2>
      <button
        onClick={() => document.getElementById("fileInput").click()}
        style={{
          padding: "10px",
          margin: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload File
      </button>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(event) => setSelectedFile(event.target.files[0])}
      />
      <button
        onClick={handleFileUpload}
        style={{
          padding: "10px",
          margin: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send File to Server
      </button>
      {selectedFile && (
        <p style={{ color: "blue" }}>Selected file: {selectedFile.name}</p>
      )}
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
                    key={subject}
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
                    key={subject}
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
