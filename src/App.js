import React, { useState } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./Components/support_func.js";
import BasicCalendar from "./Components/BaseCalendar.js";
import GradeView from "./Components/Grade_view.js";

function App() {
  commands.currentAuthenticatedUser();
  commands.send_data_backend();
  const [showBasicCalendar, setShowBasicCalendar] = useState(true);
  const toggleComponent = () => {
    setShowBasicCalendar(!showBasicCalendar);
  };

  return (
    <div className="App">
      <button
        className=" px-4 py-2 m-4 bg-blue-500 text-white rounded font-bold"
        onClick={toggleComponent}
      >
        <span className="text-white font-bold">
          {showBasicCalendar ? "Show GradeView" : "Show BasicCalendar"}{" "}
        </span>
      </button>
      {showBasicCalendar ? <BasicCalendar /> : <GradeView />}
      <button onClick={commands.handleSignOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);
