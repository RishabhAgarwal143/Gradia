/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserinfo = /* GraphQL */ `
  mutation CreateUserinfo(
    $input: CreateUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    createUserinfo(input: $input, condition: $condition) {
      id
      name
      email
      Schedules {
        items {
          start_time
          end_time
          description
          userinfoID
          date
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Tasks {
        items {
          due_time
          due_date
          description
          userinfoID
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateUserinfo = /* GraphQL */ `
  mutation UpdateUserinfo(
    $input: UpdateUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    updateUserinfo(input: $input, condition: $condition) {
      id
      name
      email
      Schedules {
        items {
          start_time
          end_time
          description
          userinfoID
          date
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Tasks {
        items {
          due_time
          due_date
          description
          userinfoID
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteUserinfo = /* GraphQL */ `
  mutation DeleteUserinfo(
    $input: DeleteUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    deleteUserinfo(input: $input, condition: $condition) {
      id
      name
      email
      Schedules {
        items {
          start_time
          end_time
          description
          userinfoID
          date
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Tasks {
        items {
          due_time
          due_date
          description
          userinfoID
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
      start_time
      end_time
      description
      userinfoID
      date
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
      start_time
      end_time
      description
      userinfoID
      date
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
      start_time
      end_time
      description
      userinfoID
      date
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      due_time
      due_date
      description
      userinfoID
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      due_time
      due_date
      description
      userinfoID
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      due_time
      due_date
      description
      userinfoID
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
