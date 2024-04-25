import React, { useState } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./Components/support_func.js";
import BasicCalendar from "./Components/BaseCalendar.js";
import GradeView from "./Components/Grade_view.js";
import Navbar from "./Components/Navigation_bar.jsx";
import WorkTimeForm from "./Components/Worktime.jsx";
function App() {
  commands.currentAuthenticatedUser();
  commands.send_data_backend();
  const [showBasicCalendar, setShowBasicCalendar] = useState(true);
  const [showWorkTimeForm, setShowWorkTimeForm] = useState(false);
  const toggleComponent = () => {
    setShowBasicCalendar(!showBasicCalendar);
  };
  // const handleUserTimes = () => {
  //   commands.update_user_times();
  // };
  const handleUserTimes = () => {
    setShowWorkTimeForm(true);
  };

  const handleCloseWorkTimeForm = () => {
    setShowWorkTimeForm(false);
  };
  return (
    <div className="App">
      <Navbar
        toggleComponent={toggleComponent}
        handleSignOut={commands.handleSignOut}
        showBasicCalendar={showBasicCalendar}
        handleUserTimes={handleUserTimes}
      />


      {showBasicCalendar ? <BasicCalendar /> : <GradeView />}
      {showWorkTimeForm && (
        <WorkTimeForm onClose={handleCloseWorkTimeForm} />
      )}

    </div>
  );
}

export default withAuthenticator(App);
