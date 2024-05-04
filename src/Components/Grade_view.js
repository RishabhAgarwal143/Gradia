import {
  listSubjects,
  list_tasks_grade_item,
  update_grade_task,
  update_status_task,
  update_tagetGrade_subject,
  // create_taskGradeInfo,
  createNewTask,
  backend_Server_ip,
} from "./support_func";
import AddTaskForm from "./AddTask";
import React, { useState, useEffect } from "react";
// import "./gradeStyles.css";

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
    <div className="w-1/5 p-5 shadow-md overflow-y-auto h-screen">
      <h1 className="mb-3 text-lg font-bold text-white">Subjects</h1>
      <input
        type="text"
        className="w-full p-2 mb-3 border rounded"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <ul className="list-none p-0 m-0">
        {subjects.map((subject, index) => (
          <li
            key={index}
            onClick={() => onClick(subject)}
            className="p-2 cursor-pointer transition duration-300 hover:bg-gray-200 text-white"
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
      <button className="text-black" onClick={onToggle}>
        {status}
      </button>
      {isOpen && (
        <div>
          <select
            className="block mt-1 w-full p-2 border border-gray-300 rounded"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOrder.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="flex justify-between mt-3">
            <button className="text-blue-500 mr-2" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="text-red-500" onClick={onToggle}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const GradeBox = ({
  index,
  grade,
  syllabus_Grade,
  letter_Grade,
  onStatusChange,
}) => {
  // console.log("🚀 ~ GradeBox ~ syllabus_Grade:", syllabus_Grade);
  const [selectedStatus, setSelectedStatus] = React.useState(grade);
  const [change, setChange] = React.useState(false);
  // const [isOpen, SetOpen] = React.useState(false);

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
    <div className="inline-flex">
      <div className="flex">
        <input
          type="number"
          className=" text-white font-bold px-2 py-1 mr-4 rounded w-16"
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
        {syllabus_Grade && (
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setChange(true);
            }}
            className="custom-select text-white ml-2 p-2 border border-gray-300 rounded"
          >
            <option value="" hidden></option>
            {syllabus_Grade.map((category, i) => (
              <option key={i} value={category.category_Grade}>
                {`${category.category_Name} - ${category.category_Grade}`}
              </option>
            ))}
          </select>
        )}
        {letter_Grade && (
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setChange(true);
            }}
            className="custom-select text-white ml-2 p-2 border border-gray-300 rounded"
          >
            <option value="" hidden></option>
            {letter_Grade.map((category, i) => (
              <option key={i} value={category.GradeCutoff}>
                {`${category.LetterValue} ${category.GradeCutoff}`}
              </option>
            ))}
          </select>
        )}
      </div>
      {change && (
        <div className="flex items-center ml-2">
          <button
            className="px-4 py-2 mx-3 rounded bg-blue-500 font-bold"
            onClick={handleConfirm}
          >
            <span className="text-white font-bold">Confirm</span>
          </button>
          <button
            className="px-4 py-2 mx-3 rounded bg-red-500 font-bold"
            onClick={onCancel}
          >
            <span className="text-white font-bold">Cancel</span>
          </button>
        </div>
      )}
    </div>
  );
};

const SecondComponent = ({ subject, task, refreshSubjects }) => {
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [trigger_refresh, setTrigger] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const subject_info = task;
  // let [tasks, setTasks] = useState(task && task.Tasks ? task.Tasks.items : []);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
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
      }
    }
  }

  const handleStatusChange = async (index, newStatus) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [index]: newStatus,
    }));
    tasks[index].STATUS = newStatus;
    console.log(tasks[index]);
    update_status_task(tasks[index].id, newStatus);
    if (newStatus === statusOrder[3]) {
      task.current_Grade = update_grade();
      await update_grade_task(
        tasks[index].taskTaskGradeInfoId,
        tasks[index].id,
        tasks[index].current_Grade,
        tasks[index].overall_Percentage,
        tasks[index].task_Weightage,
        task.current_Grade,
        tasks[index].subjectsID
      );
    }
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
    if (!task.current_Grade) {
      task.current_Grade = 0;
    }
    task.current_Grade = update_grade();

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

  function update_grade() {
    let temp_current_Grade = 0;
    tasks.forEach((task) => {
      if (task.overall_Percentage && task.STATUS !== statusOrder[3]) {
        temp_current_Grade += task.overall_Percentage;
      }
    });
    return temp_current_Grade;
  }

  const handleTaskWeightageChange = async (index, newGrade) => {
    tasks[index].task_Weightage = newGrade;
    if (!tasks[index].current_Grade) {
      tasks[index].current_Grade = 0;
    }
    let new_percentage = (newGrade * tasks[index].current_Grade) / 100;

    tasks[index].overall_Percentage = new_percentage;
    if (!task.current_Grade) {
      task.current_Grade = 0;
    }
    // console.log(update_grade());
    task.current_Grade = update_grade();
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

    const formData = new FormData();
    formData.append("subject_ID", task.id);
    formData.append("file", selectedFile);
    formData.append("userinfoID", task.userinfoID);

    try {
      const response = await fetch(`${backend_Server_ip}/syllabus`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      alert("File uploaded successfully");
      setSelectedFile(null);
      refreshSubjects();
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file");
    }
  };

  const handleTargetGradeChange = (newTargetGrade) => {
    task.target_Grade = newTargetGrade;
    update_tagetGrade_subject(task.id, newTargetGrade);
  };
  const handleAddTask = () => {
    setShowAddTaskForm(true);
  };

  const handleAddTaskSubmit = async (newTaskData) => {
    try {
      const newTask = await createNewTask({
        subjectsID: task.id,
        SUMMARY: newTaskData.SUMMARY,
        DUE: new Date(newTaskData.DUE),
        STATUS: newTaskData.STATUS,
      });
      newTaskData.overall_Percentage =
        (newTaskData.current_Grade * newTaskData.task_Weightage) / 100;
      const response = await update_grade_task(
        null,
        newTask.data.createTask.id,
        newTaskData.current_Grade,
        newTaskData.overall_Percentage,
        newTaskData.task_Weightage,
        task.current_Grade,
        task.id
      );
      console.log("🚀 ~ handleAddTaskSubmit ~ response:", response);
      refreshSubjects();
      task.current_Grade = update_grade();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  const handleCancelAddTask = () => {
    setShowAddTaskForm(false);
  };
  return (
    <div className="main-content h-screen overflow-y-auto">
      <h2 className="text-center text-white text-2xl font-bold">{subject}</h2>

      <div className="flex justify-center items-center text-white p-4 w-50%">
        <h1>
          Current Grade:{" "}
          <span className="bg-blue-500 text-white px-2 py-1  mr-4 rounded-md">
            {(task && task.current_Grade) || 0}
          </span>
        </h1>
        <h1 className="text-white ml-4">
          Target Grade:{" "}
          <GradeBox
            key={subject}
            grade={(task && task.target_Grade) || 0}
            onStatusChange={handleTargetGradeChange}
            letter_Grade={
              subject_info.LetterGrades && subject_info.LetterGrades.items
            }
          />
        </h1>
      </div>

      <button
        onClick={() => document.getElementById("fileInput").click()}
        className="px-4 py-2 mt-4 mr-4 mb-4 rounded bg-blue-500 font-bold"
      >
        <span className="text-white font-bold">Upload File </span>
      </button>
      <input
        type="file"
        id="fileInput"
        className="hidden"
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
        <span className="text-white font-bold">Send File to Server </span>
      </button>
      {selectedFile && (
        <p className="text-blue-500 mt-4">Selected file: {selectedFile.name}</p>
      )}
      <div className="table-container h-[calc(100%-3rem)] overflow-y-auto item-center">
        <table className="table">
          <thead>
            <tr className="sticky top-0 bg-white">
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
              <tr key={index} className="text-white">
                <td className="w-500 p-4">{task.SUMMARY}</td>
                <td className="w-300 p-4">{formatLocalTime(task.DUE)}</td>
                <td className="w-150 p-4 text-center">
                  <StatusDropdown
                    status={selectedStatuses[index] || task.STATUS}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(index, newStatus)
                    }
                    isOpen={selectedStatuses[index]}
                    onToggle={() => toggleStatusDropdown(index)}
                  />
                </td>
                <td className="w-50 p-4 text-center">
                  <GradeBox
                    key={subject}
                    grade={task.current_Grade || 0}
                    onStatusChange={(newStatus) =>
                      handleGradeChange(index, newStatus)
                    }
                  />
                </td>
                <td className="w-50 p-4 text-center">
                  {task.overall_Percentage || 0}
                </td>
                <td className="w-50 p-4 text-center">
                  <GradeBox
                    key={subject}
                    grade={task.task_Weightage || 0}
                    syllabus_Grade={
                      subject_info.SyllabusGradeValues &&
                      subject_info.SyllabusGradeValues.items
                    }
                    onStatusChange={(newStatus) =>
                      handleTaskWeightageChange(index, newStatus)
                    }
                  />{" "}
                </td>
              </tr>
            ))}
            {showAddTaskForm && (
              <AddTaskForm
                subjectsID={subject.id}
                onSubmit={handleAddTaskSubmit}
                onCancel={handleCancelAddTask}
              />
            )}
          </tbody>
        </table>
        <div className="text-center mt-4">
          {!showAddTaskForm && (
            <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              <span className="text-white font-bold">Add Task </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const GradeView = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [forcedRefresh, setforcedRefresh] = useState(false);
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
  }, [forcedRefresh]);

  return (
    <div className="flex h-screen">
      <Sidebar
        subjects={filteredSubjects}
        onClick={handleSubjectClick}
        onSearch={handleSearch}
      />
      <div className="main-content flex-center">
        {selectedSubject && (
          <SecondComponent
            subject={selectedSubject}
            task={findSubjectByName(selectedSubject)}
            refreshSubjects={setforcedRefresh}
          />
        )}
      </div>
      {/* <button onClick={RenderCalendar}>Render New Component</button> */}
    </div>
  );
};

export default GradeView;
