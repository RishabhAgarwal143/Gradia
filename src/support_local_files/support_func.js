import { signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchUserAttributes } from "aws-amplify/auth";

export var cognito_Id;
var CurrentUsersEmail;
export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};

    cognito_Id = userId;

    console.log(`The username: ${username}`);
    console.log(`The userId: ${cognito_Id}`);
    console.log(`The accessToken: ${accessToken}`);
    console.log(`The idToken: ${idToken}`);
    console.log(`The signInDetails: ${signInDetails}`);
  } catch (err) {
    console.log(err);
  }
}

export async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
    CurrentUsersEmail = userAttributes.email;
  } catch (error) {
    console.log(error);
  }
}

const client = generateClient();
export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
export async function get_item() {
  const allTodos = await client.graphql({ query: queries.listUserinfos });
  console.log(allTodos);
}

export async function create_user() {
  await currentAuthenticatedUser();
  await handleFetchUserAttributes();
  try {
    const oneTodo = await client.graphql({
      query: queries.getUserinfo,
      variables: { id: cognito_Id },
    });
    if (oneTodo.data.getUserinfo == null) {
      console.log(`trying to create ${cognito_Id}`);
      const todoDetails = {
        name: "LocalMachine",
        email: CurrentUsersEmail,
        id: cognito_Id,
      };

      await client.graphql({
        query: mutations.createUserinfo,
        variables: { input: todoDetails },
      });
      console.log("item created");
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function create_schedule() {
//   await client.graphql({
//     query: mutations.createSchedule,
//     variables: {
//       input: {
//         start_time: "12:30",
//         end_time: "14:30",
//         date: "2023-12-21",
//         description: "testing from local",
//         userinfoID: cognito_Id,
//       },
//     },
//   });
// }

export async function list_schedule_item() {
  const allTodos = await client.graphql({ query: queries.listSchedules });
  console.log(allTodos);
}
