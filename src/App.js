import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./support_local_files/support_func.js";
import { ScheduleCreateForm } from "./ui-components";
async function printlog() {
  const { DateTime } = require("luxon");
  const dt = DateTime.now();
  console.log(dt.zoneName);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>My app</h2>
        <ScheduleCreateForm
          onError={(error) => {
            console.log(`error`, error);
          }}
          onSubmit={(fields) => {
            // Example function to trim all string inputs
            const updatedFields = fields;
            // Object.keys(fields).forEach((key) => {
            //   updatedFields[key] = fields[key];
            //   if (fields[key] == null) {
            //     updatedFields[key] = null;
            //   }
            // });
            // fields["userinfoID"] = commands.cognito_Id;
            console.log(fields === updatedFields);
            console.log(fields);
            console.log(updatedFields);
            return fields;
          }}
        />
        <button onClick={commands.create_user}>Create User</button>
        <button onClick={commands.handleFetchUserAttributes}>Fetch User</button>
        <button onClick={commands.get_item}>Get record</button>
        <button onClick={printlog}>printing userid</button>
        {/* <button onClick={commands.create_schedule}>add Schedules</button> */}
        <button onClick={commands.list_schedule_item}>Print Schedules</button>
        <button onClick={commands.handleSignOut}>Sign out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
