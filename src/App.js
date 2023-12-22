import './App.css';
import '@aws-amplify/ui-react/styles.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import {get_item,create_item,handleSignOut, globleuserid, create_schedule} from './support_local_files/support_func.js'

async function printlog(){
  console.log(globleuserid)
}

function App() {
  create_item()
  return (
    <div className="App">
      <header className="App-header">
        <h2>My app</h2>
        <button onClick={get_item}>Get record</button>
        <button onClick={printlog}>printing userid</button>
        <button onClick={create_schedule}>add Schedules</button>
        <button onClick={handleSignOut}>Sign out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
// create_record();
