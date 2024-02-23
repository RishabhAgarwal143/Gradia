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

global user_info
global payload
# global headers
# global TOKEN
# global url
global time_converter


def initialize_payload_user(token, user_info_id):
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
    user_timezone = user_info.user_timezone
    user_time = datetime.now(pytz.timezone(user_timezone))
    user_time = user_time.strftime('%Y-%m-%d %H:%M:%S')

    return user_time, user_timezone


def get_sys_time():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


def get_schedule(n, limit=10000, rrule=False):
    global payload
    global user_info

    user_time, user_timezone = get_user_time(1)
    user_time = datetime.strptime(user_time, '%Y-%m-%d %H:%M:%S')
    user_time = user_time - timedelta(days=7)
    user_time = user_time.strftime('%Y-%m-%d %H:%M:%S')
    
    schedule_json = payload.get_schedule_pd(user_time, limit=10000, rrule=False)
    return schedule_json

def add_event_to_calendar(start_time, end_time, event_name, event_description=None, event_location=None):
    global payload
    global user_info
    start_time_utc = time_converter.convert_to_utc(start_time)
    end_time_utc = time_converter.convert_to_utc(end_time)
    payload.schedule_new_event_pd(start_time_utc, end_time_utc, event_name, event_location, event_description)



