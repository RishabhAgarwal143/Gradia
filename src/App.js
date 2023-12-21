import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui-react/styles.css'
import {withAuthenticator,AmplifySignOut} from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h2>My app</h2>
          <button onClick={handleSignOut}>Sign out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
