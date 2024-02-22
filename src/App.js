import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./support_local_files/support_func.js";
import BasicCalendar from "./Components/BaseCalendar.js";

function App() {
  commands.create_user();
  return (
    <div className="App" style={{ height: "100vh", weight: "100vw" }}>
      {/* <header className="App-header"> */}
      <BasicCalendar />

      <button onClick={commands.create_user}>Create User</button>
      {/* <button onClick={commands.handleFetchUserAttributes}>Fetch User</button>
        <button onClick={commands.get_item}>Get record</button>
      <button onClick={printlog}>printing userid</button>
      <button onClick={commands.create_schedule}>add Schedules</button> */}
      <button onClick={commands.list_schedule_item}>Print Schedules</button>
      <button onClick={commands.handleSignOut}>Sign out</button>
      {/* </header> */}
    </div>
  );
}

export default withAuthenticator(App);
