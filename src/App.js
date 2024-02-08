import "./App.css";
// import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import * as commands from "./support_local_files/support_func.js";
import BasicCalendar from "./Components/BaseCalendar.js";

// import { TaskCreateForm } from "./ui-components";
async function printlog() {
  console.log(commands.cognito_Id);
}

function App() {
  return (
    <div className="App" style={{ height: '100vh', weight: '100vw' }}>
      {/* <header className="App-header"> */}
      <BasicCalendar />
        {/* <TaskCreateForm
          onSubmit={(fields) => {
            // Example function to trim all string inputs
            const updatedFields = {}
            Object.keys(fields).forEach(key => {
              if (typeof fields[key] === 'string') {
                updatedFields[key] = fields[key].trim()
              } else {
                updatedFields[key] = fields[key]
              }
            })
            updatedFields['userinfoID'] = JSON.stringify(commands.cognito_Id)
            console.log(updatedFields)
            return updatedFields
          }}
        /> */}
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
