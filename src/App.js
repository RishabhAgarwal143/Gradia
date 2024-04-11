import React, { useState } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./Components/support_func.js";
import BasicCalendar from "./Components/BaseCalendar.js";
import GradeView from "./Components/Grade_view.js";

function App() {
  const [showBasicCalendar, setShowBasicCalendar] = useState(true);

  const toggleComponent = () => {
    setShowBasicCalendar(!showBasicCalendar);
  };

  return (
    <div className="App" style={{ height: "100vh", weight: "100vw" }}>
      <button onClick={toggleComponent}>
        {showBasicCalendar ? "Show GradeView" : "Show BasicCalendar"}
      </button>
      {showBasicCalendar ? <BasicCalendar /> : <GradeView />}
      <button onClick={commands.handleSignOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);
