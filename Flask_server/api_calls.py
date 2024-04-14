import pytz
import requests
import http.client
import json
import logging
from datetime import datetime
from datetime import timedelta
import sys
from function_payloads import Payload
from function_payloads import TimeConverter
from function_payloads import UserInfo
import pandas as pd
import database_queries

global user_info
global payload
global time_converter


def set_schedules(schedules):
    
    global payload
    # convert list of json to just one json
    data_dicts = []
    ct = 0

    for schedule in schedules:
        data_dicts.append(schedule)

    df = pd.DataFrame(data_dicts)

    # # Convert start, end column to datetime type
    df['start'] = pd.to_datetime(df['start'])
    df['end'] = pd.to_datetime(df['end'])

    # Sort DataFrame by 'start' column
    df_sorted = df.sort_values(by='start', ascending=False)
    payload.schedules = df_sorted

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

    # print("COLUMNS:", df.columns)
    # print(df.head())

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
    user_time = datetime.now(pytz.timezone(user_timezone))
    user_time_t = user_time.strftime('%Y-%m-%d %H:%M:%S %A')
    
    return user_time_t, user_timezone


def get_sys_time():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


# def _convert_time_column(column):
#     return column.apply(lambda x: time_converter.convert_utc_to_user_tz(x))

# def _convert_time_column_utc(column):
#     return column.apply(lambda x: time_converter.convert_user_to_utc_tz(x))


def convert_time_to_utc(time,userinfoID):
    
    user = database_queries.get_user_info(userinfoID)
    # if(not user.user_timezone):
    #     user.get_timezone()
    timezone = pytz.timezone(user.user_timezone)
    time = datetime.strptime(time, "%Y-%m-%d %H:%M:%S")
    localized_start_time = timezone.localize(time)
    utc_start_time = localized_start_time.astimezone(pytz.utc)
    utc_str = utc_start_time.strftime('%Y-%m-%d %H:%M:%S')
    return utc_str


def _get_schedule_range_df(start_time, end_time,userinfoID):

    # Convert localized time to UTC
    utc_start_time = convert_time_to_utc(start_time,userinfoID)
    utc_end_time = convert_time_to_utc(end_time,userinfoID)
    schedules = database_queries.get_schedule_range(userinfoID,utc_start_time,utc_end_time)
    result = []
    for schedule in schedules:
        result.append(schedule.dict_representation())
    
    return result


def get_schedule_range(start_time, end_time,userinfoID):
    # start_time: %Y-%m-%d %H:%M:%S
    # end_time: %Y-%m-%d %H:%M:%S
    # start_time and end_time are in user's timezone
    # dataframe containing all the schedules in utc
    
    schedules = database_queries.get_schedule_range(userinfoID,start_time,end_time)
    result = ""
    for schedule in schedules:
        result += schedule.__repr__()
        result += "\n"

    return result



def add_event_to_calendar(start_time, end_time, event_name, userinfoID,event_description=None, event_location=None):
    
    
    existing_events = _get_schedule_range_df(start_time, end_time,userinfoID)
    temp_d = dict()
    
    temp_d["SUMMARY"] = event_name
    temp_d["DTSTART"] = start_time
    temp_d["DTEND"] = end_time
    temp_d["LOCATION"] = event_location
    temp_d["DESCRIPTION"] = event_description
    temp_d["userinfoID"] = userinfoID

    print(existing_events)
    
    if existing_events:
        # print("CONFLICT", event_add)
        return ["CONFLICT", temp_d, existing_events]
    else:
        # print("ADD_EVENT", event_add)
        return ["ADD", temp_d, None]
    

def delete_events_in_range(start_time, end_time,userinfoID):
    # print("TRYING TO DELETE FROM", payload.schedules)
    
    existing_events = _get_schedule_range_df(start_time, end_time,userinfoID)
    if existing_events:
        print("DELETED", existing_events)
        return ["DELETED", existing_events]
    else:
        print("NO_EVENTS")
        return ["NO_EVENTS", None]



