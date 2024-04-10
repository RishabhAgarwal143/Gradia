// Add your JavaScript code here
import { listSubjects } from "./support_func";
import React, { useState, useEffect } from "react";
import "./styles.css";
// Get a reference to the homework list and grade form
let subject_list_json = [];
const Sidebar = ({ subjects, onClick }) => {
  return (
    <div className="sidebar">
      <h2>
        <b>Subjects</b>
      </h2>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index} onClick={() => onClick(subject)}>
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
};
const SecondComponent = ({ subject, task }) => {
  let tasks = [];
  if (task.Tasks) {
    tasks = task.Tasks.items;
  }

  return (
    <div className="main-content">
      <h2 className="bg-white">Selected Subject: {subject}</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>TASKS</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.SUMMARY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const Grade_view = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

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
      <Sidebar subjects={subjects} onClick={handleSubjectClick} />
      <div className="main-content">
        {selectedSubject && (
          <SecondComponent
            subject={selectedSubject}
            task={findSubjectByName(selectedSubject)}
          />
        )}
        {/* Render your other component here */}
      </div>
    </div>
  );
};

export default Grade_view;
