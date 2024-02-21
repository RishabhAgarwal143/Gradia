/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateImportance = /* GraphQL */ `
  subscription OnCreateImportance(
    $filter: ModelSubscriptionImportanceFilterInput
  ) {
    onCreateImportance(filter: $filter) {
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
export const onUpdateImportance = /* GraphQL */ `
  subscription OnUpdateImportance(
    $filter: ModelSubscriptionImportanceFilterInput
  ) {
    onUpdateImportance(filter: $filter) {
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
export const onDeleteImportance = /* GraphQL */ `
  subscription OnDeleteImportance(
    $filter: ModelSubscriptionImportanceFilterInput
  ) {
    onDeleteImportance(filter: $filter) {
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
export const onCreateSubscribedCalendar = /* GraphQL */ `
  subscription OnCreateSubscribedCalendar(
    $filter: ModelSubscriptionSubscribedCalendarFilterInput
    $owner: String
  ) {
    onCreateSubscribedCalendar(filter: $filter, owner: $owner) {
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
export const onUpdateSubscribedCalendar = /* GraphQL */ `
  subscription OnUpdateSubscribedCalendar(
    $filter: ModelSubscriptionSubscribedCalendarFilterInput
    $owner: String
  ) {
    onUpdateSubscribedCalendar(filter: $filter, owner: $owner) {
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
export const onDeleteSubscribedCalendar = /* GraphQL */ `
  subscription OnDeleteSubscribedCalendar(
    $filter: ModelSubscriptionSubscribedCalendarFilterInput
    $owner: String
  ) {
    onDeleteSubscribedCalendar(filter: $filter, owner: $owner) {
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
export const onCreateUserinfo = /* GraphQL */ `
  subscription OnCreateUserinfo(
    $filter: ModelSubscriptionUserinfoFilterInput
    $owner: String
  ) {
    onCreateUserinfo(filter: $filter, owner: $owner) {
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
export const onUpdateUserinfo = /* GraphQL */ `
  subscription OnUpdateUserinfo(
    $filter: ModelSubscriptionUserinfoFilterInput
    $owner: String
  ) {
    onUpdateUserinfo(filter: $filter, owner: $owner) {
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
export const onDeleteUserinfo = /* GraphQL */ `
  subscription OnDeleteUserinfo(
    $filter: ModelSubscriptionUserinfoFilterInput
    $owner: String
  ) {
    onDeleteUserinfo(filter: $filter, owner: $owner) {
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
export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onCreateSchedule(filter: $filter, owner: $owner) {
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
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onUpdateSchedule(filter: $filter, owner: $owner) {
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
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule(
    $filter: ModelSubscriptionScheduleFilterInput
    $owner: String
  ) {
    onDeleteSchedule(filter: $filter, owner: $owner) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onCreateTask(filter: $filter, owner: $owner) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onUpdateTask(filter: $filter, owner: $owner) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask(
    $filter: ModelSubscriptionTaskFilterInput
    $owner: String
  ) {
    onDeleteTask(filter: $filter, owner: $owner) {
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
