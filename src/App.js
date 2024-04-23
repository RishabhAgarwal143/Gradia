import React, { useState } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./Components/support_func.js";
import BasicCalendar from "./Components/BaseCalendar.js";
import GradeView from "./Components/Grade_view.js";
import Navbar from "./Components/Navigation_bar.jsx";
function App() {
  commands.currentAuthenticatedUser();
  commands.send_data_backend();
  const [showBasicCalendar, setShowBasicCalendar] = useState(true);
  const toggleComponent = () => {
    setShowBasicCalendar(!showBasicCalendar);
  };

  return (
    <div className="App">
      <Navbar
        toggleComponent={toggleComponent}
        handleSignOut={commands.handleSignOut}
        showBasicCalendar={showBasicCalendar}
        className="fixed top-0"
      />


      {showBasicCalendar ? <BasicCalendar /> : <GradeView />}

    </div>
  );
}

export default withAuthenticator(App);
