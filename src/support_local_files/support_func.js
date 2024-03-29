import { signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
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
      const { DateTime } = require("luxon");
      const dt = DateTime.now();
      console.log(dt.zoneName);
      console.log(`trying to ${cognito_Id}`);
      const todoDetails = {
        name: "LocalMachine",
        email: CurrentUsersEmail,
        id: cognito_Id,
        Timezone: dt.zoneName,
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

export async function subscribedScedule() {
  const createSub = client
    .graphql({ query: subscriptions.onCreateSchedule })
    .subscribe({
      next: ({ data }) => console.log(data),
      error: (error) => console.warn(error),
    });
  console.log(createSub);

  const UpdateSub = client
    .graphql({ query: subscriptions.onUpdateSchedule })
    .subscribe({
      next: ({ data }) => console.log(data),
      error: (error) => console.warn(error),
    });
  console.log(UpdateSub);

  const DeleteSub = client
    .graphql({ query: subscriptions.onDeleteSchedule })
    .subscribe({
      next: ({ data }) => console.log(data),
      error: (error) => console.warn(error),
    });
  console.log(DeleteSub);
  return [createSub, UpdateSub, DeleteSub];
}

export async function create_schedule() {
  await client.graphql({
    query: mutations.createSchedule,
    variables: {
      input: {
        SUMMARY: "Lorem ipsum dolor sit amet",
        DTSTART: "1970-01-01T12:30:23.999Z",
        DTEND: "1970-01-01T12:30:23.999Z",
        DESCRIPTION: "Lorem ipsum dolor sit amet",
        LOCATION: "Lorem ipsum dolor sit amet",
        userinfoID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        RRULE: /* Provide a Repeatdata instance here */ "",
      },
    },
  });
}

export async function list_schedule_item() {
  try {
    console.log("here");
    const allTodos = await client.graphql({ query: queries.listSchedules });
    console.log(allTodos);
    return allTodos;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error if needed
  }
}
export const deleteSchedule = async (eventId) => {
  try {
    // Make the GraphQL API call to delete the schedule
    const deletedSchedule = await client.graphql({
      query: mutations.deleteSchedule,
      variables: {
        input: {
          id: eventId,
        },
      },
    });
    return deletedSchedule; // Return the result
  } catch (error) {
    throw new Error("Error deleting schedule: " + error.message); // Throw an error if deletion fails
  }
};

// List all items
export const listTasks = async () => {
  try {
    // Make the GraphQL API call to delete the schedule
    const allTasks = await client.graphql({
      query: queries.listTasks,
    });
    return allTasks; // Return the result
  } catch (error) {
    throw new Error("Error getting tasks: " + error.message); // Throw an error if deletion fails
  }
};
