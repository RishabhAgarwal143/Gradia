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
    df_sorted = df.sort_values(by='start')
    payload.schedules = df_sorted



def schedule_range_df(user_start_time, user_end_time):
    global payload
    global time_converter
    user_start_time_utc = time_converter.convert_user_to_utc_tz(user_start_time)
    user_end_time_utc = time_converter.convert_user_to_utc_tz(user_end_time)


    schedule_range = payload.schedules[(payload.schedules['start'] <= user_end_time_utc) & (payload.schedules['end'] >= user_start_time_utc)]

    return schedule_range


def initialize_payload_user(token, user_info_id,schedule):

    TOKEN = token
    user_id = user_info_id

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {TOKEN}'
    }
    url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
    init_payload = "{\"query\":\"query ListSchedules {\\r\\n    getUserinfo(id: \\\"%s\\\") {\\r\\n        id\\r\\n        name\\r\\n        email\\r\\n        Timezone\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" %user_id

    response = requests.request("POST", url, headers=headers, data=init_payload)
    # print(response.text)
    json_response = response.json()

    user_timezone = json_response['data']['getUserinfo']['Timezone']
    user_id = json_response['data']['getUserinfo']['id']
    user_email = json_response['data']['getUserinfo']['email']
    user_name = json_response['data']['getUserinfo']['name']
    global user_info
    user_info = UserInfo(user_id, user_timezone, user_email, user_name)
    global payload
    payload = Payload(url, headers, user_timezone, TOKEN, user_info_id)
    # print("INITIALIZE PAYLOAD USER")
    if(schedule != None):
        set_schedules(schedule)


    # rrule_schedules = payload.get_rrule_schedules()

    # print(user_schedule_json)
    # print(len(user_schedule_json['data']['listSchedules']['items']))

    # iterate through the schedules and get the schedules that have rrule
    # rrule_schedule = []
    # for schedule in rrule_schedules['data']['listSchedules']['items']:
    #     if schedule['RRULE']:
    #         rrule_schedule.append(schedule)
    #     # print(schedule)

    # payload.rrule_schedules = rrule_schedule

    

    global time_converter
    time_converter = TimeConverter(user_timezone)


def get_user_time(n):
    global user_info
    global time_converter
    user_timezone = user_info.user_timezone
    user_time = datetime.now(pytz.timezone(user_timezone))
    user_time_t = user_time.strftime('%Y-%m-%d %H:%M:%S %A')
    
    return user_time_t, user_timezone


def get_sys_time():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


def _convert_time_column(column):
    return column.apply(lambda x: time_converter.convert_utc_to_user_tz(x))

def _convert_time_column_utc(column):
    return column.apply(lambda x: time_converter.convert_user_to_utc_tz(x))

def _get_schedule_range_df(start_time, end_time):
    global payload
    df_range = schedule_range_df(start_time, end_time)
    df_range.loc[:, ['start', 'end']] = df_range[['start', 'end']].apply(_convert_time_column)

    return df_range


def get_schedule_range(start_time, end_time):
    # start_time: %Y-%m-%d %H:%M:%S
    # end_time: %Y-%m-%d %H:%M:%S
    # start_time and end_time are in user's timezone
    # dataframe containing all the schedules in utc

    df_range = _get_schedule_range_df(start_time, end_time)

    # convert to json
    schedule_json = df_range.to_json(orient='records')
    return schedule_json


def _conflict_detector(conflict):
    return _df_to_json(conflict)


def _df_to_json(df):
    # convert df to json format DTSTART, DTEND, SUMMARY, DESCRIPTION, LOCATION
    new_df = df.copy()

    new_df.rename(columns={'start': 'DTSTART', 'end': 'DTEND', 'title': 'SUMMARY', 'description': 'DESCRIPTION', 'location': 'LOCATION'}, inplace=True)

    # drop id, createdAt, updatedAt, owner
    new_df = new_df.drop(columns= ['id', 'createdAt', 'updatedAt', 'owner'])

    # do strftime to convert to %Y-%m-%d %H:%M:%S
    new_df['DTSTART'] = new_df['DTSTART'].dt.strftime('%Y-%m-%d %H:%M:%S')
    new_df['DTEND'] = new_df['DTEND'].dt.strftime('%Y-%m-%d %H:%M:%S')

    # returns list of conflicting events
    return new_df.to_json(orient='records')

    

def add_event_to_calendar(start_time, end_time, event_name, event_description=None, event_location=None):
    global payload
    global user_info

    existing_events = _get_schedule_range_df(start_time, end_time)
    temp_d = dict()


    # convert time from %Y-%m-%d %H:%M:%S to utc %Y-%m-%d %H:%M:%S

    start_time = time_converter.convert_user_to_utc_tz(start_time).strftime('%Y-%m-%d %H:%M:%S')
    end_time = time_converter.convert_user_to_utc_tz(end_time).strftime('%Y-%m-%d %H:%M:%S')


    temp_d["SUMMARY"] = event_name
    temp_d["DTSTART"] = start_time
    temp_d["DTEND"] = end_time
    temp_d["LOCATION"] = event_location
    temp_d["DESCRIPTION"] = event_description
    temp_d["userinfoID"] = user_info.user_id

    event_add = json.dumps(temp_d)
    
    if not existing_events.empty:
        conflicting_events = _conflict_detector(existing_events)
        return event_add, conflicting_events
    else:
        return event_add, None
    





