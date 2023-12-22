import { signOut } from 'aws-amplify/auth';
import { generateClient } from "aws-amplify/api";
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

const client = generateClient()
export var globleuserid
export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
export async function get_item() {

  const allTodos = await client.graphql({ query: queries.listUserinfos });
  console.log(allTodos)

  const oneTodo = await client.graphql({
    query: queries.getUserinfo,
    variables: { id: '6f499207-1e98-401b-aab2-8472399a7644' }
  });
  console.log(oneTodo)
}

export async function create_item(){
  const todoDetails = {
    name: 'Todo 2',
    email: 'local@test.com',
  };
  
  const newTodo = await client.graphql({
    query: mutations.createUserinfo,
    variables: { input: todoDetails }
  });
  // const temp = JSON.parse(newTodo)
  globleuserid = newTodo.data.createUserinfo.id
  // create_schedule();
  console.log(newTodo)
}

export async function create_schedule(userid){
  await client.graphql({
    query: mutations.createSchedule,
    variables: {input :  {
      time: '12:30',
      date: '2023-12-21',
      description: 'testing from local',
      userinfoID: globleuserid
    }}
  })
}

