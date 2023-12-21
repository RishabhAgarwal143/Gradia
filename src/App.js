import './App.css';
import '@aws-amplify/ui-react/styles.css'
import { withAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/api";
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

const client = generateClient()

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
async function get_item() {

  const allTodos = await client.graphql({ query: queries.listUserinfos });
  console.log(allTodos)

  const oneTodo = await client.graphql({
    query: queries.getUserinfo,
    variables: { id: '6f499207-1e98-401b-aab2-8472399a7644' }
  });
  console.log(oneTodo)
}

async function create_item(){
  const todoDetails = {
    name: 'Todo 2',
    email: 'local@test.com',
    
  };
  
  const newTodo = await client.graphql({
    query: mutations.createUserinfo,
    variables: { input: todoDetails }
  });
  console.log(newTodo)
}


function App() {

  // create_item();
  return (
    <div className="App">
      <header className="App-header">
        <h2>My app</h2>
        <button onClick={get_item}>Get record</button>
        <button onClick={create_item}>create record</button>
        <button onClick={handleSignOut}>Sign out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
// create_record();
