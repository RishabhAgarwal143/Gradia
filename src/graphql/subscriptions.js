/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserinfo = /* GraphQL */ `
  subscription OnCreateUserinfo($filter: ModelSubscriptionUserinfoFilterInput) {
    onCreateUserinfo(filter: $filter) {
      id
      name
      email
      Schedules {
        nextToken
        __typename
      }
      Tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserinfo = /* GraphQL */ `
  subscription OnUpdateUserinfo($filter: ModelSubscriptionUserinfoFilterInput) {
    onUpdateUserinfo(filter: $filter) {
      id
      name
      email
      Schedules {
        nextToken
        __typename
      }
      Tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserinfo = /* GraphQL */ `
  subscription OnDeleteUserinfo($filter: ModelSubscriptionUserinfoFilterInput) {
    onDeleteUserinfo(filter: $filter) {
      id
      name
      email
      Schedules {
        nextToken
        __typename
      }
      Tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onCreateSchedule(filter: $filter) {
      time
      date
      description
      userinfoID
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onUpdateSchedule(filter: $filter) {
      time
      date
      description
      userinfoID
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onDeleteSchedule(filter: $filter) {
      time
      date
      description
      userinfoID
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
      time
      date
      description
      userinfoID
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
      time
      date
      description
      userinfoID
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
      time
      date
      description
      userinfoID
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
