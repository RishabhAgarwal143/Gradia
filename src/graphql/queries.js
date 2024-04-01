/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubjects = /* GraphQL */ `
  query GetSubjects($id: ID!) {
    getSubjects(id: $id) {
      id
      subject_Name
      current_Grade
      target_Grade
      Tasks {
        items {
          id
          UID
          DTSTART
          DUE
          SUMMARY
          userinfoID
          COMPLETED
          STATUS
          PRIORITY
          DTSTAMP
          subscribedcalendarID
          DESCRIPTION
          subjectsID
          TaskGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            time_Taken
            createdAt
            updatedAt
            taskGradeInfoTaskId
            owner
            __typename
          }
          LOCATION
          createdAt
          updatedAt
          taskTaskGradeInfoId
          owner
          __typename
        }
        nextToken
        __typename
      }
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
          DTSTAMP
          subscribedcalendarID
          subjectsID
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
export const listSubjects = /* GraphQL */ `
  query ListSubjects(
    $filter: ModelSubjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        subject_Name
        current_Grade
        target_Grade
        Tasks {
          items {
            id
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          nextToken
          __typename
        }
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
            DTSTAMP
            subscribedcalendarID
            subjectsID
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
export const getTaskGradeInfo = /* GraphQL */ `
  query GetTaskGradeInfo($id: ID!) {
    getTaskGradeInfo(id: $id) {
      id
      current_Grade
      task_Weightage
      overall_Percentage
      extra_Info
      time_Taken
      Task {
        id
        UID
        DTSTART
        DUE
        SUMMARY
        userinfoID
        COMPLETED
        STATUS
        PRIORITY
        DTSTAMP
        subscribedcalendarID
        DESCRIPTION
        subjectsID
        TaskGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          time_Taken
          Task {
            id
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          taskGradeInfoTaskId
          owner
          __typename
        }
        LOCATION
        createdAt
        updatedAt
        taskTaskGradeInfoId
        owner
        __typename
      }
      createdAt
      updatedAt
      taskGradeInfoTaskId
      owner
      __typename
    }
  }
`;
export const listTaskGradeInfos = /* GraphQL */ `
  query ListTaskGradeInfos(
    $filter: ModelTaskGradeInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskGradeInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        current_Grade
        task_Weightage
        overall_Percentage
        extra_Info
        time_Taken
        Task {
          id
          UID
          DTSTART
          DUE
          SUMMARY
          userinfoID
          COMPLETED
          STATUS
          PRIORITY
          DTSTAMP
          subscribedcalendarID
          DESCRIPTION
          subjectsID
          TaskGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            time_Taken
            createdAt
            updatedAt
            taskGradeInfoTaskId
            owner
            __typename
          }
          LOCATION
          createdAt
          updatedAt
          taskTaskGradeInfoId
          owner
          __typename
        }
        createdAt
        updatedAt
        taskGradeInfoTaskId
        owner
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
          DTSTAMP
          subscribedcalendarID
          subjectsID
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
          UID
          DTSTART
          DUE
          SUMMARY
          userinfoID
          COMPLETED
          STATUS
          PRIORITY
          DTSTAMP
          subscribedcalendarID
          DESCRIPTION
          subjectsID
          TaskGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            time_Taken
            createdAt
            updatedAt
            taskGradeInfoTaskId
            owner
            __typename
          }
          LOCATION
          createdAt
          updatedAt
          taskTaskGradeInfoId
          owner
          __typename
        }
        nextToken
        __typename
      }
      LAST_MODIFIED
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
            DTSTAMP
            subscribedcalendarID
            subjectsID
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
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          nextToken
          __typename
        }
        LAST_MODIFIED
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
            DTSTAMP
            subscribedcalendarID
            subjectsID
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
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          nextToken
          __typename
        }
        LAST_MODIFIED
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
          Schedules {
            nextToken
            __typename
          }
          Tasks {
            nextToken
            __typename
          }
          LAST_MODIFIED
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
          Schedules {
            nextToken
            __typename
          }
          Tasks {
            nextToken
            __typename
          }
          LAST_MODIFIED
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
          Schedules {
            nextToken
            __typename
          }
          Tasks {
            nextToken
            __typename
          }
          LAST_MODIFIED
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
            LAST_MODIFIED
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
            LAST_MODIFIED
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
            LAST_MODIFIED
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
      DTSTAMP
      subscribedcalendarID
      subjectsID
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
        DTSTAMP
        subscribedcalendarID
        subjectsID
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
        DTSTAMP
        subscribedcalendarID
        subjectsID
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
export const schedulesBySubscribedcalendarID = /* GraphQL */ `
  query SchedulesBySubscribedcalendarID(
    $subscribedcalendarID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    schedulesBySubscribedcalendarID(
      subscribedcalendarID: $subscribedcalendarID
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
        DTSTAMP
        subscribedcalendarID
        subjectsID
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
export const schedulesBySubjectsID = /* GraphQL */ `
  query SchedulesBySubjectsID(
    $subjectsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    schedulesBySubjectsID(
      subjectsID: $subjectsID
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
        DTSTAMP
        subscribedcalendarID
        subjectsID
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
      UID
      DTSTART
      DUE
      SUMMARY
      userinfoID
      COMPLETED
      STATUS
      PRIORITY
      DTSTAMP
      subscribedcalendarID
      DESCRIPTION
      subjectsID
      TaskGradeInfo {
        id
        current_Grade
        task_Weightage
        overall_Percentage
        extra_Info
        time_Taken
        Task {
          id
          UID
          DTSTART
          DUE
          SUMMARY
          userinfoID
          COMPLETED
          STATUS
          PRIORITY
          DTSTAMP
          subscribedcalendarID
          DESCRIPTION
          subjectsID
          TaskGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            time_Taken
            createdAt
            updatedAt
            taskGradeInfoTaskId
            owner
            __typename
          }
          LOCATION
          createdAt
          updatedAt
          taskTaskGradeInfoId
          owner
          __typename
        }
        createdAt
        updatedAt
        taskGradeInfoTaskId
        owner
        __typename
      }
      LOCATION
      createdAt
      updatedAt
      taskTaskGradeInfoId
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
        PRIORITY
        DTSTAMP
        subscribedcalendarID
        DESCRIPTION
        subjectsID
        TaskGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          time_Taken
          Task {
            id
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          taskGradeInfoTaskId
          owner
          __typename
        }
        LOCATION
        createdAt
        updatedAt
        taskTaskGradeInfoId
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
        PRIORITY
        DTSTAMP
        subscribedcalendarID
        DESCRIPTION
        subjectsID
        TaskGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          time_Taken
          Task {
            id
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          taskGradeInfoTaskId
          owner
          __typename
        }
        LOCATION
        createdAt
        updatedAt
        taskTaskGradeInfoId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tasksBySubscribedcalendarID = /* GraphQL */ `
  query TasksBySubscribedcalendarID(
    $subscribedcalendarID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksBySubscribedcalendarID(
      subscribedcalendarID: $subscribedcalendarID
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
        PRIORITY
        DTSTAMP
        subscribedcalendarID
        DESCRIPTION
        subjectsID
        TaskGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          time_Taken
          Task {
            id
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          taskGradeInfoTaskId
          owner
          __typename
        }
        LOCATION
        createdAt
        updatedAt
        taskTaskGradeInfoId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const tasksBySubjectsID = /* GraphQL */ `
  query TasksBySubjectsID(
    $subjectsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tasksBySubjectsID(
      subjectsID: $subjectsID
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
        PRIORITY
        DTSTAMP
        subscribedcalendarID
        DESCRIPTION
        subjectsID
        TaskGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          time_Taken
          Task {
            id
            UID
            DTSTART
            DUE
            SUMMARY
            userinfoID
            COMPLETED
            STATUS
            PRIORITY
            DTSTAMP
            subscribedcalendarID
            DESCRIPTION
            subjectsID
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          taskGradeInfoTaskId
          owner
          __typename
        }
        LOCATION
        createdAt
        updatedAt
        taskTaskGradeInfoId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
