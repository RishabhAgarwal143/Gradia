/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createImportance = /* GraphQL */ `
  mutation CreateImportance(
    $input: CreateImportanceInput!
    $condition: ModelImportanceConditionInput
  ) {
    createImportance(input: $input, condition: $condition) {
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
export const updateImportance = /* GraphQL */ `
  mutation UpdateImportance(
    $input: UpdateImportanceInput!
    $condition: ModelImportanceConditionInput
  ) {
    updateImportance(input: $input, condition: $condition) {
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
export const deleteImportance = /* GraphQL */ `
  mutation DeleteImportance(
    $input: DeleteImportanceInput!
    $condition: ModelImportanceConditionInput
  ) {
    deleteImportance(input: $input, condition: $condition) {
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
export const createSubscribedCalendar = /* GraphQL */ `
  mutation CreateSubscribedCalendar(
    $input: CreateSubscribedCalendarInput!
    $condition: ModelSubscribedCalendarConditionInput
  ) {
    createSubscribedCalendar(input: $input, condition: $condition) {
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
export const updateSubscribedCalendar = /* GraphQL */ `
  mutation UpdateSubscribedCalendar(
    $input: UpdateSubscribedCalendarInput!
    $condition: ModelSubscribedCalendarConditionInput
  ) {
    updateSubscribedCalendar(input: $input, condition: $condition) {
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
export const deleteSubscribedCalendar = /* GraphQL */ `
  mutation DeleteSubscribedCalendar(
    $input: DeleteSubscribedCalendarInput!
    $condition: ModelSubscribedCalendarConditionInput
  ) {
    deleteSubscribedCalendar(input: $input, condition: $condition) {
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
export const createUserinfo = /* GraphQL */ `
  mutation CreateUserinfo(
    $input: CreateUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    createUserinfo(input: $input, condition: $condition) {
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
export const updateUserinfo = /* GraphQL */ `
  mutation UpdateUserinfo(
    $input: UpdateUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    updateUserinfo(input: $input, condition: $condition) {
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
export const deleteUserinfo = /* GraphQL */ `
  mutation DeleteUserinfo(
    $input: DeleteUserinfoInput!
    $condition: ModelUserinfoConditionInput
  ) {
    deleteUserinfo(input: $input, condition: $condition) {
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
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
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
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
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
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
