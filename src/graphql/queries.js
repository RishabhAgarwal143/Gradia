/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLetterGrade = /* GraphQL */ `
  query GetLetterGrade($id: ID!) {
    getLetterGrade(id: $id) {
      id
      LetterValue
      GradeCutoff
      subjectsID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listLetterGrades = /* GraphQL */ `
  query ListLetterGrades(
    $filter: ModelLetterGradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLetterGrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        LetterValue
        GradeCutoff
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
export const letterGradesBySubjectsID = /* GraphQL */ `
  query LetterGradesBySubjectsID(
    $subjectsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLetterGradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    letterGradesBySubjectsID(
      subjectsID: $subjectsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        LetterValue
        GradeCutoff
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
export const getSyllabusGradeValues = /* GraphQL */ `
  query GetSyllabusGradeValues($id: ID!) {
    getSyllabusGradeValues(id: $id) {
      id
      category_Name
      category_Grade
      Tasks_associated
      each_Task_weightage
      subjectsID
      TaskGradeInfos {
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
            LOCATION
            createdAt
            updatedAt
            taskTaskGradeInfoId
            owner
            __typename
          }
          syllabusgradevaluesID
          createdAt
          updatedAt
          taskGradeInfoTaskId
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
export const listSyllabusGradeValues = /* GraphQL */ `
  query ListSyllabusGradeValues(
    $filter: ModelSyllabusGradeValuesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSyllabusGradeValues(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category_Name
        category_Grade
        Tasks_associated
        each_Task_weightage
        subjectsID
        TaskGradeInfos {
          items {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            time_Taken
            syllabusgradevaluesID
            createdAt
            updatedAt
            taskGradeInfoTaskId
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
export const syllabusGradeValuesBySubjectsID = /* GraphQL */ `
  query SyllabusGradeValuesBySubjectsID(
    $subjectsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSyllabusGradeValuesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    syllabusGradeValuesBySubjectsID(
      subjectsID: $subjectsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        category_Name
        category_Grade
        Tasks_associated
        each_Task_weightage
        subjectsID
        TaskGradeInfos {
          items {
            id
            current_Grade
            task_Weightage
            overall_Percentage
            extra_Info
            time_Taken
            syllabusgradevaluesID
            createdAt
            updatedAt
            taskGradeInfoTaskId
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
export const getScheduleGradeInfo = /* GraphQL */ `
  query GetScheduleGradeInfo($id: ID!) {
    getScheduleGradeInfo(id: $id) {
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
            personalized_task
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
        personalized_task
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
export const listScheduleGradeInfos = /* GraphQL */ `
  query ListScheduleGradeInfos(
    $filter: ModelScheduleGradeInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScheduleGradeInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          personalized_task
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
      nextToken
      __typename
    }
  }
`;
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
            syllabusgradevaluesID
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
          personalized_task
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
      SyllabusGradeValues {
        items {
          id
          category_Name
          category_Grade
          Tasks_associated
          each_Task_weightage
          subjectsID
          TaskGradeInfos {
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
      LetterGrades {
        items {
          id
          LetterValue
          GradeCutoff
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
            personalized_task
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
        SyllabusGradeValues {
          items {
            id
            category_Name
            category_Grade
            Tasks_associated
            each_Task_weightage
            subjectsID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        LetterGrades {
          items {
            id
            LetterValue
            GradeCutoff
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
export const subjectsByUserinfoID = /* GraphQL */ `
  query SubjectsByUserinfoID(
    $userinfoID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subjectsByUserinfoID(
      userinfoID: $userinfoID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
            personalized_task
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
        SyllabusGradeValues {
          items {
            id
            category_Name
            category_Grade
            Tasks_associated
            each_Task_weightage
            subjectsID
            createdAt
            updatedAt
            owner
            __typename
          }
          nextToken
          __typename
        }
        LetterGrades {
          items {
            id
            LetterValue
            GradeCutoff
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
            syllabusgradevaluesID
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
        syllabusgradevaluesID
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
          syllabusgradevaluesID
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
          syllabusgradevaluesID
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
          syllabusgradevaluesID
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
          syllabusgradevaluesID
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
          syllabusgradevaluesID
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
      syllabusgradevaluesID
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
            syllabusgradevaluesID
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
        syllabusgradevaluesID
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
export const taskGradeInfosBySyllabusgradevaluesID = /* GraphQL */ `
  query TaskGradeInfosBySyllabusgradevaluesID(
    $syllabusgradevaluesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTaskGradeInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    taskGradeInfosBySyllabusgradevaluesID(
      syllabusgradevaluesID: $syllabusgradevaluesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
            syllabusgradevaluesID
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
        syllabusgradevaluesID
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
          personalized_task
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
            syllabusgradevaluesID
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
          SyllabusGradeValues {
            nextToken
            __typename
          }
          LetterGrades {
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
        owner
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
            DTSTAMP
            subscribedcalendarID
            subjectsID
            personalized_task
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
        Subjects {
          items {
            id
            subject_Name
            current_Grade
            target_Grade
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
          owner
          __typename
        }
        createdAt
        updatedAt
        userinfoUserWorkTimId
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
          personalized_task
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
      personalized_task
      createdAt
      updatedAt
      scheduleScheduleGradeInfoId
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
            personalized_task
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
        personalized_task
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
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
            personalized_task
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
        personalized_task
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
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
            personalized_task
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
        personalized_task
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
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
            personalized_task
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
        personalized_task
        createdAt
        updatedAt
        scheduleScheduleGradeInfoId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserWorkTim = /* GraphQL */ `
  query GetUserWorkTim($id: ID!) {
    getUserWorkTim(id: $id) {
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
      owner
      __typename
    }
  }
`;
export const listUserWorkTims = /* GraphQL */ `
  query ListUserWorkTims(
    $filter: ModelUserWorkTimFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserWorkTims(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          personalized_task
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
            syllabusgradevaluesID
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
            personalized_task
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
            personalized_task
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
