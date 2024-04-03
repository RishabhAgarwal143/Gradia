/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubjects = /* GraphQL */ `
  subscription OnCreateSubjects(
    $filter: ModelSubscriptionSubjectsFilterInput
    $owner: String
  ) {
    onCreateSubjects(filter: $filter, owner: $owner) {
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userinfoID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateSubjects = /* GraphQL */ `
  subscription OnUpdateSubjects(
    $filter: ModelSubscriptionSubjectsFilterInput
    $owner: String
  ) {
    onUpdateSubjects(filter: $filter, owner: $owner) {
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userinfoID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteSubjects = /* GraphQL */ `
  subscription OnDeleteSubjects(
    $filter: ModelSubscriptionSubjectsFilterInput
    $owner: String
  ) {
    onDeleteSubjects(filter: $filter, owner: $owner) {
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
          owner
          __typename
        }
        nextToken
        __typename
      }
      userinfoID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateTaskGradeInfo = /* GraphQL */ `
  subscription OnCreateTaskGradeInfo(
    $filter: ModelSubscriptionTaskGradeInfoFilterInput
    $owner: String
  ) {
    onCreateTaskGradeInfo(filter: $filter, owner: $owner) {
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
export const onUpdateTaskGradeInfo = /* GraphQL */ `
  subscription OnUpdateTaskGradeInfo(
    $filter: ModelSubscriptionTaskGradeInfoFilterInput
    $owner: String
  ) {
    onUpdateTaskGradeInfo(filter: $filter, owner: $owner) {
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
export const onDeleteTaskGradeInfo = /* GraphQL */ `
  subscription OnDeleteTaskGradeInfo(
    $filter: ModelSubscriptionTaskGradeInfoFilterInput
    $owner: String
  ) {
    onDeleteTaskGradeInfo(filter: $filter, owner: $owner) {
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
export const onCreateScheduleGradeInfo = /* GraphQL */ `
  subscription OnCreateScheduleGradeInfo(
    $filter: ModelSubscriptionScheduleGradeInfoFilterInput
    $owner: String
  ) {
    onCreateScheduleGradeInfo(filter: $filter, owner: $owner) {
      id
      current_Grade
      task_Weightage
      overall_Percentage
      extra_Info
      attended
      Schedule {
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
        ScheduleGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          attended
          Schedule {
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
            scheduleScheduleGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleGradeInfoScheduleId
          owner
          __typename
        }
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
        owner
        __typename
      }
      createdAt
      updatedAt
      scheduleGradeInfoScheduleId
      owner
      __typename
    }
  }
`;
export const onUpdateScheduleGradeInfo = /* GraphQL */ `
  subscription OnUpdateScheduleGradeInfo(
    $filter: ModelSubscriptionScheduleGradeInfoFilterInput
    $owner: String
  ) {
    onUpdateScheduleGradeInfo(filter: $filter, owner: $owner) {
      id
      current_Grade
      task_Weightage
      overall_Percentage
      extra_Info
      attended
      Schedule {
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
        ScheduleGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          attended
          Schedule {
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
            scheduleScheduleGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleGradeInfoScheduleId
          owner
          __typename
        }
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
        owner
        __typename
      }
      createdAt
      updatedAt
      scheduleGradeInfoScheduleId
      owner
      __typename
    }
  }
`;
export const onDeleteScheduleGradeInfo = /* GraphQL */ `
  subscription OnDeleteScheduleGradeInfo(
    $filter: ModelSubscriptionScheduleGradeInfoFilterInput
    $owner: String
  ) {
    onDeleteScheduleGradeInfo(filter: $filter, owner: $owner) {
      id
      current_Grade
      task_Weightage
      overall_Percentage
      extra_Info
      attended
      Schedule {
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
        ScheduleGradeInfo {
          id
          current_Grade
          task_Weightage
          overall_Percentage
          extra_Info
          attended
          Schedule {
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
            scheduleScheduleGradeInfoId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleGradeInfoScheduleId
          owner
          __typename
        }
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
        owner
        __typename
      }
      createdAt
      updatedAt
      scheduleGradeInfoScheduleId
      owner
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
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
      Subjects {
        items {
          id
          subject_Name
          current_Grade
          target_Grade
          Tasks {
            nextToken
            __typename
          }
          Schedules {
            nextToken
            __typename
          }
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
      Subjects {
        items {
          id
          subject_Name
          current_Grade
          target_Grade
          Tasks {
            nextToken
            __typename
          }
          Schedules {
            nextToken
            __typename
          }
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
      Subjects {
        items {
          id
          subject_Name
          current_Grade
          target_Grade
          Tasks {
            nextToken
            __typename
          }
          Schedules {
            nextToken
            __typename
          }
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
      DTSTAMP
      subscribedcalendarID
      subjectsID
      ScheduleGradeInfo {
        id
        current_Grade
        task_Weightage
        overall_Percentage
        extra_Info
        attended
        Schedule {
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
          owner
          __typename
        }
        createdAt
        updatedAt
        scheduleGradeInfoScheduleId
        owner
        __typename
      }
      createdAt
      updatedAt
      scheduleScheduleGradeInfoId
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
      DTSTAMP
      subscribedcalendarID
      subjectsID
      ScheduleGradeInfo {
        id
        current_Grade
        task_Weightage
        overall_Percentage
        extra_Info
        attended
        Schedule {
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
          owner
          __typename
        }
        createdAt
        updatedAt
        scheduleGradeInfoScheduleId
        owner
        __typename
      }
      createdAt
      updatedAt
      scheduleScheduleGradeInfoId
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
      DTSTAMP
      subscribedcalendarID
      subjectsID
      ScheduleGradeInfo {
        id
        current_Grade
        task_Weightage
        overall_Percentage
        extra_Info
        attended
        Schedule {
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
          ScheduleGradeInfo {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            attended
            createdAt
            updatedAt
            scheduleGradeInfoScheduleId
            owner
            __typename
          }
          createdAt
          updatedAt
          scheduleScheduleGradeInfoId
          owner
          __typename
        }
        createdAt
        updatedAt
        scheduleGradeInfoScheduleId
        owner
        __typename
      }
      createdAt
      updatedAt
      scheduleScheduleGradeInfoId
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
