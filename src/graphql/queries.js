/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getImportance = /* GraphQL */ `
  query GetImportance($id: ID!) {
    getImportance(id: $id) {
      id
      Grade_Percentage
      Task_info
      Expected_Time
      Course
      Additional_Info
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listImportances = /* GraphQL */ `
  query ListImportances(
    $filter: ModelImportanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImportances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Grade_Percentage
        Task_info
        Expected_Time
        Course
        Additional_Info
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSubscribedCalendar = /* GraphQL */ `
  query GetSubscribedCalendar($id: ID!) {
    getSubscribedCalendar(id: $id) {
      id
      Calendar_Name
      Calendar_URL
      userinfoID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listSubscribedCalendars = /* GraphQL */ `
  query ListSubscribedCalendars(
    $filter: ModelSubscribedCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscribedCalendars(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Calendar_Name
        Calendar_URL
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
export const subscribedCalendarsByUserinfoID = /* GraphQL */ `
  query SubscribedCalendarsByUserinfoID(
    $userinfoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubscribedCalendarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subscribedCalendarsByUserinfoID(
      userinfoID: $userinfoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Calendar_Name
        Calendar_URL
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
          Calendar_Name
          Calendar_URL
          userinfoID
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
          Calendar_Name
          Calendar_URL
          userinfoID
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      SubscribedCalendars {
        items {
          id
          Calendar_Name
          Calendar_URL
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
            Calendar_Name
            Calendar_URL
            userinfoID
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
            Calendar_Name
            Calendar_URL
            userinfoID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        SubscribedCalendars {
          items {
            id
            Calendar_Name
            Calendar_URL
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
      CATEGORIES
      DTSTAMP
      confirmed
      Importance {
        id
        Grade_Percentage
        Task_info
        Expected_Time
        Course
        Additional_Info
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      scheduleImportanceId
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
        CATEGORIES
        DTSTAMP
        confirmed
        Importance {
          id
          Grade_Percentage
          Task_info
          Expected_Time
          Course
          Additional_Info
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        scheduleImportanceId
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
        CATEGORIES
        DTSTAMP
        confirmed
        Importance {
          id
          Grade_Percentage
          Task_info
          Expected_Time
          Course
          Additional_Info
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        scheduleImportanceId
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
      UID
      DTSTART
      DUE
      SUMMARY
      userinfoID
      COMPLETED
      STATUS
      CATEGORIES
      PRIORITY
      DTSTAMP
      Importance {
        id
        Grade_Percentage
        Task_info
        Expected_Time
        Course
        Additional_Info
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      taskImportanceId
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
        UID
        DTSTART
        DUE
        SUMMARY
        userinfoID
        COMPLETED
        STATUS
        CATEGORIES
        PRIORITY
        DTSTAMP
        Importance {
          id
          Grade_Percentage
          Task_info
          Expected_Time
          Course
          Additional_Info
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        taskImportanceId
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
        UID
        DTSTART
        DUE
        SUMMARY
        userinfoID
        COMPLETED
        STATUS
        CATEGORIES
        PRIORITY
        DTSTAMP
        Importance {
          id
          Grade_Percentage
          Task_info
          Expected_Time
          Course
          Additional_Info
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        taskImportanceId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
