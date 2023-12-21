import './App.css';
import '@aws-amplify/ui-react/styles.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/api";
import * as queries from './graphql/queries';

const client = generateClient()

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
async function create_item() {

  const allTodos = await client.graphql({ query: queries.listUserinfos });
  console.log(allTodos)

  const oneTodo = await client.graphql({
    query: queries.getUserinfo,
    variables: { id: '9deba1aa-5e2b-4902-a984-b2b8de0c876d' }
  });
  console.log(oneTodo)
}



function App() {

  // create_item();
  return (
    <div className="App">
      <header className="App-header">
        <h2>My app</h2>
        <button onClick={create_item}>Create record</button>
        <button onClick={handleSignOut}>Sign out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
// create_record();
