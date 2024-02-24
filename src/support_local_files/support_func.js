import { signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import axios from "axios";

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

    const dataToSend = {
      userId: cognito_Id,
      Token: `${accessToken}`,
    }; // Replace with your data
    axios
      .post("http://127.0.0.1:5000/api/data", dataToSend)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
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

export async function create_schedule(event) {
  try {
    console.log("event", event);
    const newSchedule = await client.graphql({
      query: mutations.createSchedule,
      variables: {
        input: event,
      },
    });
    return newSchedule;
  }
  catch (error) {
    console.error("Error creating schedule:", error);
    throw error; // Rethrow the error if needed
  }
}

export async function list_schedule_item() {
  try {
    // List all items
    const allSchedules = await client.graphql({
      query: queries.listSchedules,
      variables: { limit: 1000 },
    });
    console.log(allSchedules);
    return allSchedules;
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
export async function list_tasks_item() {
  try {
    // List all items
    const allTasks = await client.graphql({
      query: queries.listTasks,
      variables: { limit: 1000 },
    });
    console.log(allTasks);
    return allTasks;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error if needed
  }
}


