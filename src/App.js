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
    <div>
      <button onClick={toggleComponent}>
        {showBasicCalendar ? "Show GradeView" : "Show BasicCalendar"}
      </button>
      {showBasicCalendar ? <BasicCalendar /> : <GradeView />}
    </div>
  );
}

export default withAuthenticator(App);
