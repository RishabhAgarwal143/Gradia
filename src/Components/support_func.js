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
    const { userId } = await getCurrentUser();
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};

    cognito_Id = userId;

    // console.log(`The username: ${username}`);
    console.log(`The userId: ${cognito_Id}`);
    console.log(`The accessToken: ${accessToken}`);
    // console.log(`The idToken: ${idToken}`);
    // console.log(`The signInDetails: ${signInDetails}`);

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

async function create_temp_user(transformedEvents) {
  await currentAuthenticatedUser(transformedEvents);
  await handleFetchUserAttributes();
  axios
    .post("http://127.0.0.1:5000/api/schedule", transformedEvents)
    .then((response) => {
      console.log("Data sent successfully:");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });

  let tasks = await list_tasks_item();
  axios
    .post("http://127.0.0.1:5000/api/task", tasks)
    .then((response) => {
      console.log("Data sent successfully:");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });

  let subjects = await listSubjects();
  axios
    .post("http://127.0.0.1:5000/api/subjects", subjects)
    .then((response) => {
      console.log("Data sent successfully:");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });

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

export function create_user() {
  let hasbeencalled = false;
  let counter = 4;
  return function (transformedEvents) {
    if (!hasbeencalled) {
      if (counter === 0) {
        hasbeencalled = true;
      }
      counter--;
      create_temp_user(transformedEvents);
      if (counter > 2) {
        subscribedScedule();
      }
    } else {
      console.log("FUCNTION ALREADY CALLED");
    }
  };
}

export async function subscribedScedule() {
  const createSub = client
    .graphql({ query: subscriptions.onCreateSchedule })
    .subscribe({
      next: ({ data }) => {
        axios
          .post("http://127.0.0.1:5000/api/createsubscribe", data)
          .then((response) => {
            console.log("Data sent successfully:");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
        console.log(data);
      },
      error: (error) => console.warn(error),
    });
  console.log(createSub);

  const UpdateSub = client
    .graphql({ query: subscriptions.onUpdateSchedule })
    .subscribe({
      next: ({ data }) => {
        axios
          .post("http://127.0.0.1:5000/api/updatesubscribe", data)
          .then((response) => {
            console.log("Data sent successfully:");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
        console.log(data);
      },
      error: (error) => console.warn(error),
    });
  // console.log(UpdateSub);

  const DeleteSub = client
    .graphql({ query: subscriptions.onDeleteSchedule })
    .subscribe({
      next: ({ data }) => {
        axios
          .post("http://127.0.0.1:5000/api/deletesubscribe", data)
          .then((response) => {
            console.log("Data sent successfully:");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
        console.log(data);
      },
      error: (error) => console.warn(error),
    });
  console.log(DeleteSub);

  const createTask = client
    .graphql({ query: subscriptions.onCreateTask })
    .subscribe({
      next: ({ data }) => {
        axios
          .post("http://127.0.0.1:5000/api/createTask", data)
          .then((response) => {
            console.log("Data sent successfully:");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
        console.log(data);
      },
      error: (error) => console.warn(error),
    });
  console.log(createTask);

  const UpdateTask = client
    .graphql({ query: subscriptions.onUpdateTask })
    .subscribe({
      next: ({ data }) => {
        axios
          .post("http://127.0.0.1:5000/api/updateTask", data)
          .then((response) => {
            console.log("Data sent successfully:");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
        console.log(data);
      },
      error: (error) => console.warn(error),
    });
  console.log(UpdateTask);

  const DeleteTask = client
    .graphql({ query: subscriptions.onDeleteTask })
    .subscribe({
      next: ({ data }) => {
        axios
          .post("http://127.0.0.1:5000/api/deleteTask", data)
          .then((response) => {
            console.log("Data sent successfully:");
          })
          .catch((error) => {
            console.error("Error sending data:", error);
          });
        console.log(data);
      },
      error: (error) => console.warn(error),
    });
  console.log(DeleteTask);
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
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw error; // Rethrow the error if needed
  }
}

export async function list_schedule_item() {
  let items = [];
  let nextToken = null;

  do {
    try {
      const allSchedules = await client.graphql({
        query: queries.listSchedules,
        variables: { nextToken: nextToken },
      });
      const { items: currentItems, nextToken: newNextToken } =
        allSchedules.data.listSchedules;

      items = [...items, ...currentItems];
      console.log("events recieved", items.length);

      nextToken = newNextToken;
    } catch (error) {
      console.error("Error fetching items:", error);
      break; // Exit the loop if there's an error
    }
  } while (nextToken);
  console.log("events recieved", items);
  return items;
}

export const deleteSchedule = async (eventId) => {
  try {
    // Make the GraphQL API call to delete the schedule
    const deletedSchedule1 = await client.graphql({
      query: mutations.deleteSchedule,
      variables: {
        input: {
          id: eventId,
        },
      },
    });

    console.log(deletedSchedule1);
    return deletedSchedule1; // Return the result
  } catch (error) {
    throw new Error("Error deleting schedule: " + error.message); // Throw an error if deletion fails
  }
};

export const listSubjects = async () => {
  let items = [];
  let nextToken = null;
  do {
    try {
      const allTask = await client.graphql({
        query: queries.listSubjects,
        variables: { nextToken: nextToken },
      });
      const { items: currentItems, nextToken: newNextToken } =
        allTask.data.listSubjects;

      items = [...items, ...currentItems];
      console.log("events recieved", items.length);

      nextToken = newNextToken;
    } catch (error) {
      console.error("Error fetching items:", error);
      break; // Exit the loop if there's an error
    }
  } while (nextToken);

  return items;
};

export async function list_tasks_item() {
  let items = [];
  let nextToken = null;
  do {
    try {
      const allTask = await client.graphql({
        query: queries.listTasks,
        variables: { nextToken: nextToken },
      });
      const { items: currentItems, nextToken: newNextToken } =
        allTask.data.listTasks;

      items = [...items, ...currentItems];
      console.log("events recieved", items.length);

      nextToken = newNextToken;
    } catch (error) {
      console.error("Error fetching items:", error);
      break; // Exit the loop if there's an error
    }
  } while (nextToken);

  return items;
}
