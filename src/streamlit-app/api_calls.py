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


def initialize_payload_user(n):
    TOKEN = "eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODM4NDU1ZS04MDI1LTQ0NGEtOWM0ZS1kOTJlYmQ0MjYzZWIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfakJ2UFRaOFNyX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjMwMDZmYTliLTc5MmUtNDk5OC1iMTAxLTRlMTI2OTU2YmJkYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MDYyMTI1NDIsImV4cCI6MTcwNzc4MDY0NSwiaWF0IjoxNzA3Nzc3MDQ1LCJqdGkiOiJhMzQ2NWEyMS0zYzEzLTQ0MDAtOGZhOC0yNTA1NDc4NGY1ZWYiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTAzMzgyNDE4NTEzMjIzMzM0NTQifQ.q55p9OcfX3tnBwdhIGb9sjVdEtNlHfkk5kyyyXWhVK46CPygfp_FeLOFYhpObgxefO2KjZ4obt2FSLLC-_N0s3cYotlyPBUdBk7uEQ3nM_a0ypSdSI4JDn3DJYwRYBhtVAYg3kHgMZ_gZw7khTuiKaelFbMUTcxbI0Ox24_nXON-zvQtSj7cPdpYkGe6zhz4Gp06NoKu28GOniTTIx3EU4x5_ZDqV3b2MtmyefdPjwLGAxp1DV2Zsx32JpaGC57lQ6YR1yq8dxkNSdzP3fPrzNiwcYh2JU8jGYYfsgCt_hqnF6_cYbGShxZYxg4PraFHrJgjZAIYamJ5H1x5bzHNXg"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {TOKEN}'
    }
    user_id = "0838455e-8025-444a-9c4e-d92ebd4263eb"
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

