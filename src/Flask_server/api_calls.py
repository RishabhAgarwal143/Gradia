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
global headers
global TOKEN
global url
global time_converter


def initialize_payload_user(token,user_infoId):
    TOKEN = token

    user_id = user_infoId
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {TOKEN}'
    }
    url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
    init_payload = "{\"query\":\"query ListSchedules {\\r\\n    getUserinfo(id: \\\"%s\\\") {\\r\\n        id\\r\\n        name\\r\\n        email\\r\\n        Timezone\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" %user_id

    response = requests.request("POST", url, headers=headers, data=init_payload)
    json_response = response.json()

    user_timezone = json_response['data']['getUserinfo']['Timezone']
    user_id = json_response['data']['getUserinfo']['id']
    user_email = json_response['data']['getUserinfo']['email']
    user_name = json_response['data']['getUserinfo']['name']
    global user_info
    user_info = UserInfo(user_id, user_timezone, user_email, user_name)
    global payload
    payload = Payload(url, headers, user_timezone)

    global time_converter
    time_converter = TimeConverter(user_timezone)


def get_user_time(n):
    global user_info
    user_timezone = user_info.user_timezone
    user_time = datetime.now(pytz.timezone(user_timezone))
    user_time = user_time.strftime('%Y-%m-%d %H:%M:%S')

    return user_time

def get_sys_time():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

