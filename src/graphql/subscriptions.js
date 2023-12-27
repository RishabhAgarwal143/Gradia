/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserinfo = /* GraphQL */ `
  subscription OnCreateUserinfo(
    $filter: ModelSubscriptionUserinfoFilterInput
    $owner: String
  ) {
    onCreateUserinfo(filter: $filter, owner: $owner) {
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
export const onUpdateUserinfo = /* GraphQL */ `
  subscription OnUpdateUserinfo(
    $filter: ModelSubscriptionUserinfoFilterInput
    $owner: String
  ) {
    onUpdateUserinfo(filter: $filter, owner: $owner) {
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
export const onDeleteUserinfo = /* GraphQL */ `
  subscription OnDeleteUserinfo(
    $filter: ModelSubscriptionUserinfoFilterInput
    $owner: String
  ) {
    onDeleteUserinfo(filter: $filter, owner: $owner) {
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
export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onCreateSchedule(filter: $filter, owner: $owner) {
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
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onUpdateSchedule(filter: $filter, owner: $owner) {
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
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onDeleteSchedule(filter: $filter, owner: $owner) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onCreateTask(filter: $filter, owner: $owner) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onUpdateTask(filter: $filter, owner: $owner) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onDeleteTask(filter: $filter, owner: $owner) {
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
