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
export var access_Token;
var CurrentUsersEmail;

// export const backend_Server_ip = "3.21.98.42";
export const backend_Server_ip = "https://gradia.onrender.com";
// export const backend_Server_ip = "http://142.93.75.16:5000";
// export const backend_Server_ip = "http://142.93.75.16:5000";

export async function currentAuthenticatedUser() {
  try {
    const { userId } = await getCurrentUser();
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};

    cognito_Id = userId;
    access_Token = `${accessToken}`;

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
      .post(`${backend_Server_ip}/api/data`, dataToSend)
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

async function create_temp_user(transformedEvents, callback) {
  // await currentAuthenticatedUser();
  await handleFetchUserAttributes();
  axios
    .post(`${backend_Server_ip}/api/schedule`, transformedEvents)
    .then((response) => {
      console.log("Data sent successfully:");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
  if (transformedEvents.length !== 0) {
    const oneTodo = await client.graphql({
      query: queries.getUserinfo,
      variables: { id: cognito_Id },
    });

    axios
      .post(`${backend_Server_ip}/api/update_calendars`, oneTodo)
      .then((response) => {
        console.log("Data sent successfully:");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    axios
      .post(`${backend_Server_ip}/api/personalization`, oneTodo)
      .then((response) => {
        console.log("Data sent successfully:");
        callback();
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  }
}

export async function send_data_backend() {
  let tasks = await list_tasks_item();
  axios
    .post(`${backend_Server_ip}/api/task`, tasks)
    .then((response) => {
      console.log("Data sent successfully:");
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });

  let subjects = await listSubjects();
  axios
    .post(`${backend_Server_ip}/api/subjects`, subjects)
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
    handleFetchUserAttributes();
    if (oneTodo.data.getUserinfo == null) {
      const { DateTime } = require("luxon");
      const dt = DateTime.now();
      console.log(dt.zoneName);
      console.log(`trying to ${cognito_Id}`);
      console.log("🚀 ~ send_data_backend ~ oneTodo:", cognito_Id);
      const todoDetails = {
        name: "LocalMachine",
        email: CurrentUsersEmail,
        id: cognito_Id,
        Timezone: dt.zoneName,
      };
      console.log("🚀 ~ send_data_backend ~ todoDetails:", todoDetails);

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
  return function (transformedEvents, callback) {
    if (!hasbeencalled) {
      if (counter === 0) {
        hasbeencalled = true;
      }
      counter--;
      create_temp_user(transformedEvents, callback);

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
          .post(`${backend_Server_ip}/api/createsubscribe`, data)
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
          .post(`${backend_Server_ip}/api/updatesubscribe`, data)
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

  client.graphql({ query: subscriptions.onUpdateTaskGradeInfo }).subscribe({
    next: ({ data }) => {
      data.userinfoID = cognito_Id;
      console.log("🚀 ~ client.graphql ~ data:", data);
      axios
        .post(`${backend_Server_ip}/api/updatetaskGrade`, data)
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

  const DeleteSub = client
    .graphql({ query: subscriptions.onDeleteSchedule })
    .subscribe({
      next: ({ data }) => {
        axios
          .post(`${backend_Server_ip}/api/deletesubscribe`, data)
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
          .post(`${backend_Server_ip}/api/createTask`, data)
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
          .post(`${backend_Server_ip}/api/updateTask`, data)
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

  client.graphql({ query: subscriptions.onDeleteTask }).subscribe({
    next: ({ data }) => {
      axios
        .post(`${backend_Server_ip}/api/deleteTask`, data)
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

  client.graphql({ query: subscriptions.onUpdateSubjects }).subscribe({
    next: ({ data }) => {
      axios
        .post(`${backend_Server_ip}/api/updatesubjects`, data)
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

export async function create_task(event) {
  try {
    console.log("event", event);
    const newTask = await client.graphql({
      query: mutations.createTask,
      variables: {
        input: event,
      },
    });
    return newTask;
  } catch (error) {
    console.error("Error creating Task:", error);
    throw error; // Rethrow the error if needed
  }
}

export async function update_task(event) {
  try {
    console.log("event", event);
    const newTask = await client.graphql({
      query: mutations.updateTask,
      variables: {
        input: event,
      },
    });
    return newTask;
  } catch (error) {
    console.error("Error updating Task:", error);
    throw error; // Rethrow the error if needed
  }
}

export async function delete_task(event_id) {
  try {
    await client.graphql({
      query: mutations.deleteTask,
      variables: {
        input: {
          id: event_id,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting Task:", error);
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

export async function listSubjects() {
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
}

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

export async function list_tasks_grade_item() {
  let items = [];
  let nextToken = null;
  do {
    try {
      const allTask = await client.graphql({
        query: queries.listTaskGradeInfos,
        variables: { nextToken: nextToken },
      });
      const { items: currentItems, nextToken: newNextToken } =
        allTask.data.listTaskGradeInfos;

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

export async function update_grade_task(
  taskgrade_id,
  taskid,
  current_Grade,
  overall_Percentage,
  task_Weightage,
  total_subject_grade,
  subjectId
) {
  let task_query;
  let TaskGradeInfo;
  if (taskgrade_id) {
    task_query = mutations.updateTaskGradeInfo;
    TaskGradeInfo = await client.graphql({
      query: task_query,
      variables: {
        input: {
          id: taskgrade_id,
          current_Grade: current_Grade,
          task_Weightage: task_Weightage,
          overall_Percentage: overall_Percentage,
          taskGradeInfoTaskId: taskid,
        },
      },
    });
  } else {
    task_query = mutations.createTaskGradeInfo;
    TaskGradeInfo = await client.graphql({
      query: task_query,
      variables: {
        input: {
          current_Grade: current_Grade,
          task_Weightage: task_Weightage,
          overall_Percentage: overall_Percentage,
          taskGradeInfoTaskId: taskid,
        },
      },
    });
  }
  console.log(current_Grade, task_Weightage, overall_Percentage, taskid);
  try {
    if (!taskgrade_id) {
      const updatedTask = await client.graphql({
        query: mutations.updateTask,
        variables: {
          input: {
            id: taskid,
            taskTaskGradeInfoId: TaskGradeInfo.data.createTaskGradeInfo.id,
          },
        },
      });
      console.log(updatedTask);
    }

    await client.graphql({
      query: mutations.updateSubjects,
      variables: {
        input: {
          id: subjectId,
          current_Grade: total_subject_grade,
        },
      },
    });

    return TaskGradeInfo;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

export async function update_status_task(taskid, newStatus) {
  try {
    await client.graphql({
      query: mutations.updateTask,
      variables: {
        input: {
          STATUS: newStatus,
          id: taskid,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

export async function update_tagetGrade_subject(subjectid, newStatus) {
  try {
    await client.graphql({
      query: mutations.updateSubjects,
      variables: {
        input: {
          target_Grade: newStatus,
          id: subjectid,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

export async function createNewTask(taskData) {
  try {
    console.log(taskData.STATUS);
    const newTask = await client.graphql({
      query: mutations.createTask,
      variables: {
        input: {
          DUE: taskData.DUE,
          SUMMARY: taskData.SUMMARY,
          userinfoID: cognito_Id,
          STATUS: taskData.STATUS,
          subjectsID: taskData.subjectsID,
          TaskGradeInfo: taskData.TaskGradeInfo,
        },
      },
    });
    console.log("New task created:", newTask);
    return newTask;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
}

export async function create_taskGradeInfo(taskData) {
  try {
    const newTask = await client.graphql({
      query: mutations.createTaskGradeInfo,
      variables: {
        input: {
          current_Grade: taskData.current_Grade,
          overall_Percentage: taskData.overall_Percentage,
          task_Weightage: taskData.task_Weightage,
          taskGradeInfoTaskId: taskData.taskId,
        },
      },
    });
    return newTask;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
}
export async function createUserWorkTim(workTimes) {
  try {
    const newUserWorkTim = await client.graphql({
      query: mutations.createUserWorkTim,
      variables: {
        input: {
          Monday_start: workTimes.Monday_start,
          Monday_end: workTimes.Monday_end,
          Tuesday_start: workTimes.Tuesday_start,
          Tuesday_end: workTimes.Tuesday_end,
          Wednesday_start: workTimes.Wednesday_start,
          Wednesday_end: workTimes.Wednesday_end,
          Thursday_start: workTimes.Thursday_start,
          Thursday_end: workTimes.Thursday_end,
          Friday_start: workTimes.Friday_start,
          Friday_end: workTimes.Friday_end,
          Saturday_start: workTimes.Saturday_start,
          Saturday_end: workTimes.Saturday_end,
          Sunday_start: workTimes.Sunday_start,
          Sunday_end: workTimes.Sunday_end,
        },
      },
    });
    return newUserWorkTim;
  } catch (error) {
    console.error("Error creating user work times:", error);
    throw error;
  }
}
