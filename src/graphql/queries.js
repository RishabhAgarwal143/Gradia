/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserinfo = /* GraphQL */ `
  query GetUserinfo($id: ID!) {
    getUserinfo(id: $id) {
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
export const listUserinfos = /* GraphQL */ `
  query ListUserinfos(
    $filter: ModelUserinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getSchedule = /* GraphQL */ `
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
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
export const listSchedules = /* GraphQL */ `
  query ListSchedules(
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const schedulesByUserinfoID = /* GraphQL */ `
  query SchedulesByUserinfoID(
    $userinfoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    schedulesByUserinfoID(
      userinfoID: $userinfoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const tasksByUserinfoID = /* GraphQL */ `
  query TasksByUserinfoID(
    $userinfoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksByUserinfoID(
      userinfoID: $userinfoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
