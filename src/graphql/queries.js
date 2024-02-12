/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserinfo = /* GraphQL */ `
  query GetUserinfo($id: ID!) {
    getUserinfo(id: $id) {
      id
      name
      email
      Timezone
      Schedules {
        items {
          id
          SUMMARY
          DTSTART
          DTEND
          DESCRIPTION
          LOCATION
          userinfoID
          RRULE {
            FREQ
            INTERVALS
            UNTIL
            WKST
            BYDAYS
            BYMONTH
            COUNT
            __typename
          }
          UID
          isTask
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
          id
          due_time
          due_date
          description
          userinfoID
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
        Timezone
        Schedules {
          items {
            id
            SUMMARY
            DTSTART
            DTEND
            DESCRIPTION
            LOCATION
            userinfoID
            UID
            isTask
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
            id
            due_time
            due_date
            description
            userinfoID
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
      id
      SUMMARY
      DTSTART
      DTEND
      DESCRIPTION
      LOCATION
      userinfoID
      RRULE {
        FREQ
        INTERVALS
        UNTIL
        WKST
        BYDAYS
        BYMONTH
        COUNT
        __typename
      }
      UID
      isTask
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
        id
        SUMMARY
        DTSTART
        DTEND
        DESCRIPTION
        LOCATION
        userinfoID
        RRULE {
          FREQ
          INTERVALS
          UNTIL
          WKST
          BYDAYS
          BYMONTH
          COUNT
          __typename
        }
        UID
        isTask
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
        id
        SUMMARY
        DTSTART
        DTEND
        DESCRIPTION
        LOCATION
        userinfoID
        RRULE {
          FREQ
          INTERVALS
          UNTIL
          WKST
          BYDAYS
          BYMONTH
          COUNT
          __typename
        }
        UID
        isTask
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
      id
      due_time
      due_date
      description
      userinfoID
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
        id
        due_time
        due_date
        description
        userinfoID
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
        id
        due_time
        due_date
        description
        userinfoID
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
