/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserWorkTim = /* GraphQL */ `
  mutation CreateUserWorkTim(
    $input: CreateUserWorkTimInput!
    $condition: ModelUserWorkTimConditionInput
  ) {
    createUserWorkTim(input: $input, condition: $condition) {
      id
      Monday_start
      Monday_end
      Tuesday_start
      Tuesday_end
      Wednesday_start
      Wednesday_end
      Thurday_start
      Thurday_end
      Friday_start
      Friday_end
      Saturday_start
      Saturday_end
      Sunday_start
      Sunday_end
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserWorkTim = /* GraphQL */ `
  mutation UpdateUserWorkTim(
    $input: UpdateUserWorkTimInput!
    $condition: ModelUserWorkTimConditionInput
  ) {
    updateUserWorkTim(input: $input, condition: $condition) {
      id
      Monday_start
      Monday_end
      Tuesday_start
      Tuesday_end
      Wednesday_start
      Wednesday_end
      Thurday_start
      Thurday_end
      Friday_start
      Friday_end
      Saturday_start
      Saturday_end
      Sunday_start
      Sunday_end
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserWorkTim = /* GraphQL */ `
  mutation DeleteUserWorkTim(
    $input: DeleteUserWorkTimInput!
    $condition: ModelUserWorkTimConditionInput
  ) {
    deleteUserWorkTim(input: $input, condition: $condition) {
      id
      Monday_start
      Monday_end
      Tuesday_start
      Tuesday_end
      Wednesday_start
      Wednesday_end
      Thurday_start
      Thurday_end
      Friday_start
      Friday_end
      Saturday_start
      Saturday_end
      Sunday_start
      Sunday_end
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSubjects = /* GraphQL */ `
  mutation CreateSubjects(
    $input: CreateSubjectsInput!
    $condition: ModelSubjectsConditionInput
  ) {
    createSubjects(input: $input, condition: $condition) {
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
      subject_Difficulty
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateSubjects = /* GraphQL */ `
  mutation UpdateSubjects(
    $input: UpdateSubjectsInput!
    $condition: ModelSubjectsConditionInput
  ) {
    updateSubjects(input: $input, condition: $condition) {
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
      subject_Difficulty
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteSubjects = /* GraphQL */ `
  mutation DeleteSubjects(
    $input: DeleteSubjectsInput!
    $condition: ModelSubjectsConditionInput
  ) {
    deleteSubjects(input: $input, condition: $condition) {
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
      subject_Difficulty
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createTaskGradeInfo = /* GraphQL */ `
  mutation CreateTaskGradeInfo(
    $input: CreateTaskGradeInfoInput!
    $condition: ModelTaskGradeInfoConditionInput
  ) {
    createTaskGradeInfo(input: $input, condition: $condition) {
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
export const updateTaskGradeInfo = /* GraphQL */ `
  mutation UpdateTaskGradeInfo(
    $input: UpdateTaskGradeInfoInput!
    $condition: ModelTaskGradeInfoConditionInput
  ) {
    updateTaskGradeInfo(input: $input, condition: $condition) {
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
export const deleteTaskGradeInfo = /* GraphQL */ `
  mutation DeleteTaskGradeInfo(
    $input: DeleteTaskGradeInfoInput!
    $condition: ModelTaskGradeInfoConditionInput
  ) {
    deleteTaskGradeInfo(input: $input, condition: $condition) {
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
export const createScheduleGradeInfo = /* GraphQL */ `
  mutation CreateScheduleGradeInfo(
    $input: CreateScheduleGradeInfoInput!
    $condition: ModelScheduleGradeInfoConditionInput
  ) {
    createScheduleGradeInfo(input: $input, condition: $condition) {
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
export const updateScheduleGradeInfo = /* GraphQL */ `
  mutation UpdateScheduleGradeInfo(
    $input: UpdateScheduleGradeInfoInput!
    $condition: ModelScheduleGradeInfoConditionInput
  ) {
    updateScheduleGradeInfo(input: $input, condition: $condition) {
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
export const deleteScheduleGradeInfo = /* GraphQL */ `
  mutation DeleteScheduleGradeInfo(
    $input: DeleteScheduleGradeInfoInput!
    $condition: ModelScheduleGradeInfoConditionInput
  ) {
    deleteScheduleGradeInfo(input: $input, condition: $condition) {
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
          subject_Difficulty
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      UserWorkTim {
        id
        Monday_start
        Monday_end
        Tuesday_start
        Tuesday_end
        Wednesday_start
        Wednesday_end
        Thurday_start
        Thurday_end
        Friday_start
        Friday_end
        Saturday_start
        Saturday_end
        Sunday_start
        Sunday_end
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userinfoUserWorkTimId
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
          subject_Difficulty
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      UserWorkTim {
        id
        Monday_start
        Monday_end
        Tuesday_start
        Tuesday_end
        Wednesday_start
        Wednesday_end
        Thurday_start
        Thurday_end
        Friday_start
        Friday_end
        Saturday_start
        Saturday_end
        Sunday_start
        Sunday_end
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userinfoUserWorkTimId
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
          subject_Difficulty
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      UserWorkTim {
        id
        Monday_start
        Monday_end
        Tuesday_start
        Tuesday_end
        Wednesday_start
        Wednesday_end
        Thurday_start
        Thurday_end
        Friday_start
        Friday_end
        Saturday_start
        Saturday_end
        Sunday_start
        Sunday_end
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      userinfoUserWorkTimId
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
