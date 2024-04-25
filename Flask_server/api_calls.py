import pytz
import requests
import http.client
import json
import logging
import datetime
import sys
from function_payloads import Payload
from function_payloads import TimeConverter
from function_payloads import UserInfo
import pandas as pd
import database_queries
from task_scheduling import assign_task

global user_info
global payload
global time_converter


def _convert_dt_to_str(time_dt):
    time_str = time_dt.strftime("%Y-%m-%d %H:%M:%S")
    return time_str

def _convert_str_to_dt(time_str):
    time_dt = datetime.datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S")
    return time_dt


def _convert_usertime_str_to_utc_str(userinfo_id, user_time_str):

    user = database_queries.get_user_info(userinfo_id)
    timezone = user.user_timezone
    timezone = pytz.timezone(timezone)
    user_time_obj  = _convert_str_to_dt(user_time_str)
    utc_time_obj = user_time_obj.astimezone(pytz.utc)
    utc_time_str = utc_time_obj.strftime("%Y-%m-%d %H:%M:%S")

    return utc_time_str


def _convert_utc_str_to_usertime_str(userinfo_id, utc_time, timezone_str):

    utc_time_obj = _convert_str_to_dt(utc_time)

    utc_timezone = pytz.utc


    user_time_obj  = utc_timezone.localize(utc_time_obj).astimezone(pytz.timezone(timezone_str))
    user_time_str = user_time_obj.strftime("%Y-%m-%d %H:%M:%S")


    # # convert to user's timezone
    # timezone = pytz.timezone(timezone_str)
    # user_time_obj = utc_time_obj.astimezone(timezone)
    # print("USER TIME OBJ", user_time_obj)
    # user_time_str = user_time_obj.strftime("%Y-%m-%d %H:%M:%S")

    return user_time_str

    # timezone should be datetime.timedelta
    # timezone = pytz.timezone(timezone_str)
    # timezone_dt = timezone.utcoffset(datetime.datetime.now())

    # timezone = pytz.timezone(timezone_str)
    
    # user_time_obj = utc_time_obj.astimezone(datetime.timezone(timezone_dt))
    # user_time_str = user_time_obj.strftime("%Y-%m-%d %H:%M:%S")

    return user_time_str



def add_schedule_to_payload_schedules(schedule):
    global payload
    global time_converter
    global user_info
    data_dicts = []
    # data_dicts.append(schedule[0])
    out_dict = schedule['onCreateSchedule']


    id = out_dict['id']
    ids = set(payload.schedules['id'])
    if id in ids:
        return

    data_dicts.append(out_dict)
    print("ADDING:", data_dicts)
    df = pd.DataFrame(data_dicts)


    df.drop(columns=['RRULE', 'UID', 'CATEGORIES', 'DTSTAMP','Importance', '__typename', 'scheduleImportanceId'], inplace=True)
    df.rename(columns={'DTSTART': 'start', 'DTEND': 'end', 'SUMMARY': 'title', 'DESCRIPTION': 'description', 'LOCATION': 'location'}, inplace=True)

    df['start'] = pd.to_datetime(df['start'])
    df['end'] = pd.to_datetime(df['end'])
    
    df['isNew'] = False

    # print("COMBINED SCHEDULES", payload.schedules)
    df = df[payload.schedules.columns]

    payload.schedules = pd.concat([payload.schedules, df], ignore_index=True)
    payload.schedules = payload.schedules.sort_values(by='start', ascending=False)

    print("AFTER ADDING", payload.schedules)

    print("ADDED")


def delete_schedule_from_payload_schedules(schedule):
    global payload
    global time_converter
    global user_info
    data_dicts = []
    # data_dicts.append(schedule[0])
    out_dict = schedule['onDeleteSchedule']
    print(out_dict)
    print(type(out_dict))

    id = out_dict['id']
    ids = set(payload.schedules['id'])
    if id not in ids:
        return

    payload.schedules = payload.schedules[payload.schedules['id'] != id]
    print("DELETED")


def get_user_time(n,userinfoID):

    user = database_queries.get_user_info(userinfoID)
    # if(not user.user_timezone):
    #     user.get_timezone()
    user_timezone = user.user_timezone
    user_time = datetime.datetime.now(pytz.timezone(user_timezone))
    user_time_t = user_time.strftime('%Y-%m-%d %H:%M:%S %A')
    
    return user_time_t, user_timezone

def get_time_offset(days, userinfoID):
    user = database_queries.get_user_info(userinfoID)
    user_timezone = user.user_timezone
    user_timezone_tz = pytz.timezone(user_timezone)
    tz_offset = user_timezone_tz.utcoffset(datetime.datetime.now()).total_seconds()
    time_delta = datetime.timedelta(seconds=tz_offset)
    time = datetime.datetime.now(pytz.timezone(user_timezone)) + datetime.timedelta(days=days)
    time = time + time_delta
    time_str = time.strftime('%Y-%m-%d %H:%M:%S')
    return time_str, user_timezone


def get_sys_time():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def convert_time_to_utc(time,userinfoID):
    
    user = database_queries.get_user_info(userinfoID)
    # if(not user.user_timezone):
    #     user.get_timezone()
    timezone = pytz.timezone(user.user_timezone)
    time = datetime.datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
    localized_start_time = timezone.localize(time)
    utc_start_time = localized_start_time.astimezone(pytz.utc)
    utc_str = utc_start_time.strftime('%Y-%m-%d %H:%M:%S')
    return utc_str




def _get_schedule_range_df(start_time, end_time, userinfoID):

    # Convert localized time to UTC
    utc_start_time = convert_time_to_utc(start_time, userinfoID)
    utc_end_time = convert_time_to_utc(end_time, userinfoID)
    schedules = database_queries.get_schedule_range(userinfoID, utc_start_time, utc_end_time)
    result = []
    # session = database_queries.create_session(userinfoID)
    for schedule in schedules:
        result.append(schedule.dict_representation())
    # session.close()
    return result

def _get_schedule_range_usertime(start_time, end_time, userinfoID):
    schedules = _get_schedule_range_df(start_time, end_time, userinfoID)

    # convert schedules to user's timezone
    user_data = database_queries.get_user_info(userinfoID)
    user_timezone = user_data.user_timezone

    user_timezone_tz = pytz.timezone(user_timezone)
    tz_offset = user_timezone_tz.utcoffset(datetime.datetime.now()).total_seconds()

    time_delta = datetime.timedelta(seconds=tz_offset)

    for sidx in range(len(schedules)):
        # convert to dt object
        schedules[sidx]["DTSTART"] = _convert_utc_str_to_usertime_str(userinfoID, schedules[sidx]["DTSTART"], user_timezone)
        schedules[sidx]["DTEND"] = _convert_utc_str_to_usertime_str(userinfoID, schedules[sidx]["DTEND"], user_timezone)


    return schedules
    


def get_schedule_range(start_time, end_time, userinfoID):
    # start_time: %Y-%m-%d %H:%M:%S
    # end_time: %Y-%m-%d %H:%M:%S
    # start_time and end_time are in user's timezone
    # dataframe containing all the schedules in utc

    user_data = database_queries.get_user_info(userinfoID)
    user_timezone = user_data.user_timezone

    user_timezone_tz = pytz.timezone(user_timezone)
    tz_offset = user_timezone_tz.utcoffset(datetime.datetime.now()).total_seconds()
    time_delta = datetime.timedelta(seconds=tz_offset)

    start_date_utc = _convert_usertime_str_to_utc_str(userinfoID, start_time)
    end_date_utc = _convert_usertime_str_to_utc_str(userinfoID, end_time)

    schedules = database_queries.get_schedule_range(userinfoID, start_date_utc, end_date_utc)
        
    result = ""
    for schedule in schedules:
        start_time_usertime = schedule.DTSTART + time_delta
        end_time_usertime = schedule.DTEND + time_delta

        schedule.DTSTART = start_time_usertime
        schedule.DTEND = end_time_usertime

        result += schedule.__repr__()
        result += "\n"
 
    return result


def add_event_to_calendar(start_time, end_time, event_name, userinfoID, event_description=None, event_location=None):
    
    existing_events = _get_schedule_range_df(start_time, end_time, userinfoID)
    temp_d = dict()
    
    temp_d["SUMMARY"] = event_name
    temp_d["DTSTART"] = start_time
    temp_d["DTEND"] = end_time
    temp_d["LOCATION"] = event_location
    temp_d["DESCRIPTION"] = event_description
    temp_d["userinfoID"] = userinfoID


    
    if existing_events:
        rescheduled_events = []
        personalized_flag = False
        for event in existing_events:
            if event["personalized_task"] == "true":
                personalized_flag = True
                existing_events.remove(event)
        
        if personalized_flag:
            timeslots = [start_time, end_time]
            rescheduled_events = assign_task(userinfoID, timeslots, True)
            rescheduled_events = [schedule.dict_representation() for schedule in rescheduled_events]
            
        else:
            timeslots = []
            rescheduled_events = []

        # print("CONFLICT", event_add)
        return ["CONFLICT", [temp_d], existing_events, rescheduled_events]
    else:
        # print("ADD_EVENT", event_add)
        return ["ADD", [temp_d], []]
    

def delete_events_in_range(start_time, end_time, userinfoID):
    
    # existing_events = _get_schedule_range_df(start_time, end_time,userinfoID)

    existing_events = _get_schedule_range_usertime(start_time, end_time, userinfoID)
    is_personalized = False
    for event in existing_events:
        print(event)
        if event["personalized_task"] == "true":
            is_personalized = True
            existing_events.remove(event)
                
    if is_personalized:
        timeslots = [start_time, end_time]
    else:
        timeslots = []


    if is_personalized:
        rescheduled_events = assign_task(userinfoID, timeslots, True)
    else:
        rescheduled_events = []

    if existing_events or len(rescheduled_events) >=1:
        rescheduled_events = [schedule.dict_representation() for schedule in rescheduled_events]
        print("DELETED", existing_events)
        return ["DELETED", [], existing_events, rescheduled_events]
    else:
        print("NO_EVENTS")
        return ["NO_EVENTS", [], []]


def update_event(event_id, userinfoID, new_start_time=None, new_end_time=None, event_description=None, event_name=None, event_location=None):

    session = database_queries.create_session(userinfoID)
    user_data = database_queries.get_user_info(userinfoID)

    to_update = database_queries.get_schedule_by_id(event_id, session) 
    to_update_dict = to_update.dict_representation()
    is_personalized = False

    event_name = event_name if event_name else to_update_dict["SUMMARY"]

    if not new_start_time:
        new_start_time = _convert_utc_str_to_usertime_str(userinfoID, to_update_dict["DTSTART"], user_data.user_timezone)
        
    if not new_end_time:
        new_end_time = _convert_utc_str_to_usertime_str(userinfoID, to_update_dict["DTEND"], user_data.user_timezone)


    existing_events = _get_schedule_range_usertime(new_start_time, new_end_time, userinfoID)
    for event in existing_events:
        if event["id"] == event_id:
            existing_events.remove(event)
        
        if event["personalized_task"] == "true":
            is_personalized = True
            existing_events.remove(event)


    # print("NEW START TIME", new_start_time)
    # print("NEW END TIME", new_end_time)


    event_description = event_description if event_description else to_update_dict["DESCRIPTION"]
    event_location = event_location if event_location else to_update_dict["LOCATION"]

    temp_d = dict()
    temp_d["id"] = event_id
    temp_d["SUMMARY"] = event_name
    temp_d["DTSTART"] = new_start_time
    temp_d["DTEND"] = new_end_time
    temp_d["DESCRIPTION"] = event_description
    temp_d["LOCATION"] = event_location
    temp_d["userinfoID"] = userinfoID


        
    if existing_events or is_personalized:
        rescheduled_events = []
        if is_personalized:
            timeslots = [new_start_time, new_end_time]
        
            rescheduled_events = assign_task(userinfoID, timeslots, True)
            rescheduled_events = [schedule.dict_representation() for schedule in rescheduled_events]
        return ["CONFLICT", [temp_d], [to_update_dict].extend(existing_events), rescheduled_events]
    # else:
    print("UPDATE", temp_d, to_update_dict)
    return ["UPDATE", [temp_d], [to_update_dict], []]

def delete_event_id(event_id, userinfoID):

    session = database_queries.create_session(userinfoID)
    event = database_queries.get_schedule_by_id(event_id, session)

    event_dict = event.dict_representation()

    if event_dict["personalized_task"] == "true":
        timeslots = [event_dict["DTSTART"], event_dict["DTEND"]]
        rescheduled_events = assign_task(userinfoID, timeslots, True)
        rescheduled_events = [schedule.dict_representation() for schedule in rescheduled_events]
    else:
        rescheduled_events = []


    # convert to user's timezone
    user_data = database_queries.get_user_info(userinfoID)
    user_timezone = user_data.user_timezone

    session.close()

    return ["DELETED", [], [event_dict], rescheduled_events]


def create_task(end_time, task_name, userinfoID, subject_id=None, task_description=None, task_location=None):
    # when the user asks for a reminder, and a task has only a end time/date, then we create a task

    temp_d = dict()
    temp_d["SUMMARY"] = task_name
    temp_d["DTSTART"] = None
    temp_d["DUE"] = end_time
    temp_d["DESCRIPTION"] = task_description if task_description else None
    temp_d["LOCATION"] = task_location if task_location else None
    temp_d["STATUS"] = "NEEDS_ACTION"
    temp_d["PRIORITY"] = 9
    temp_d["subjectsID"] = subject_id if subject_id else None
    temp_d["userinfoID"] = userinfoID
    

    return ["ADD_TASK", temp_d, []]

    

def get_tasks_range(start_time, end_time, userinfoID):
    # todo
    session = database_queries.create_session(userinfoID)
    user_data = database_queries.get_user_info(userinfoID)
    user_timezone = user_data.user_timezone

    user_timezone_tz = pytz.timezone(user_timezone)
    tz_offset = user_timezone_tz.utcoffset(datetime.datetime.now()).total_seconds()
    time_delta = datetime.timedelta(seconds=tz_offset)

    start_date_utc = _convert_usertime_str_to_utc_str(userinfoID, start_time)
    end_date_utc = _convert_usertime_str_to_utc_str(userinfoID, end_time)

    tasks = database_queries.get_task_range(userinfoID, start_date_utc, end_date_utc)
        
    result = ""
    for task in tasks:
        start_time_usertime = task.DUE + time_delta
        end_time_usertime = task.DUE + time_delta

        task.DUE = start_time_usertime
        task.DUE = end_time_usertime

        result += task.__repr__()
        result += "\n"
 
    return result
    

def update_task(task_id, status, userinfoID, end_time=None, task_name=None, task_description=None, task_location=None):
    # todo
    session = database_queries.create_session(userinfoID)
    to_update = database_queries.get_task_by_id(task_id, session)
    to_update_dict = to_update.dict_representation()

    temp_d = dict()
    temp_d["SUMMARY"] = task_name if task_name else to_update_dict["SUMMARY"]
    temp_d["DUE"] = end_time if end_time else to_update_dict["DUE"]
    temp_d["LOCATION"] = task_location if task_location else to_update_dict["LOCATION"]
    temp_d["DESCRIPTION"] = task_description if task_description else to_update_dict["DESCRIPTION"]
    temp_d["STATUS"] = status
    temp_d["userinfoID"] = userinfoID

    print("TO_UPDATE_DICT", to_update_dict)

    return ["UPDATE_TASK", temp_d, to_update_dict, None]

def delete_task(task_id, userinfoID):
    session = database_queries.create_session(userinfoID)
    task = database_queries.get_task_by_id(task_id, session)
    task_dict = task.dict_representation()

    return ["DELETE_TASK", [], [task_dict], None]

def analyze_grade():
    # todo
    return 0

def rework_caendar():
    # TODO:
    return 0


def get_all_subjects(userinfoID):
    session = database_queries.create_session(userinfoID)
    subjects = database_queries.get_all_subjects(userinfoID)
    result = ""
    for subject in subjects:
        result += subject.__repr__()
        result += "\n"
    session.close()
    return result

def get_subject_from_id(subject_id, userinfoID):
    session = database_queries.create_session(userinfoID)
    subject = database_queries.get_subject_from_id(userinfoID, subject_id)

    session.close()
    return subject.__repr__()

def get_schedule_subject_range(start_time, end_time, subject_id, userinfoID):
    session = database_queries.create_session(userinfoID)
    user_data = database_queries.get_user_info(userinfoID)
    user_timezone = user_data.user_timezone

    user_timezone_tz = pytz.timezone(user_timezone)
    tz_offset = user_timezone_tz.utcoffset(datetime.datetime.now()).total_seconds()
    time_delta = datetime.timedelta(seconds=tz_offset)

    start_date_utc = _convert_usertime_str_to_utc_str(userinfoID, start_time)
    end_date_utc = _convert_usertime_str_to_utc_str(userinfoID, end_time)

    schedules = database_queries.get_schedule_subject_range(userinfoID, subject_id, start_date_utc, end_date_utc)
        
    result = ""
    for schedule in schedules:
        start_time_usertime = schedule.DTSTART + time_delta
        end_time_usertime = schedule.DTEND + time_delta

        schedule.DTSTART = start_time_usertime
        schedule.DTEND = end_time_usertime

        result += schedule.__repr__()
        result += "\n"
 
    return result

def get_task_subject_range(start_time, end_time, subject_id, userinfoID):
    session = database_queries.create_session(userinfoID)
    user_data = database_queries.get_user_info(userinfoID)
    user_timezone = user_data.user_timezone

    user_timezone_tz = pytz.timezone(user_timezone)
    tz_offset = user_timezone_tz.utcoffset(datetime.datetime.now()).total_seconds()
    time_delta = datetime.timedelta(seconds=tz_offset)

    start_date_utc = _convert_usertime_str_to_utc_str(userinfoID, start_time)
    end_date_utc = _convert_usertime_str_to_utc_str(userinfoID, end_time)

    tasks = database_queries.get_task_subject_range(userinfoID, subject_id, start_date_utc, end_date_utc)

    result = ""
    for task in tasks:
        task.DUE = task.DUE + time_delta
        result += task.__repr__()
        result += "\n"

    return result


def add_syllabus_grades(category_Name,category_Grade,subject_ID,userinfoID):
    
    user = database_queries.get_user_info(userinfoID)
    
    url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
    payload = "{\"query\":\"mutation CreateSyllabusGradeValues {\\r\\n    createSyllabusGradeValues(\\r\\n        "\
            "input: {\\r\\n            category_Name: \\\"%s\\\"\\r\\n            "\
            "category_Grade: %f\\r\\n            Tasks_associated: 0\\r\\n            each_Task_weightage: null\\r\\n            "\
            "subjectsID: \\\"%s\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (category_Name, round(category_Grade,2),subject_ID)
    headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {user.access_Token}'
            }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    
    
def add_letter_grades(LetterValue,GradeCutoff,subject_ID,userinfoID):
    
    user = database_queries.get_user_info(userinfoID)
    
    url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
    payload = "{\"query\":\"mutation CreateLetterGrade {\\r\\n    createLetterGrade(\\r\\n        "\
            "input: {\\r\\n            LetterValue: \\\"%s\\\"\\r\\n            "\
            "GradeCutoff: %f\\r\\n            "\
            "subjectsID: \\\"%s\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (LetterValue, round(GradeCutoff,2),subject_ID)
    headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {user.access_Token}'
            }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

