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
    TOKEN = "eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6ImMzZmNiNjA5LTJkYzQtNGRkYi1hMzkwLWIxOWI4ZmQ5NDRlYiIsImV2ZW50X2lkIjoiYjhkZDIxNTItNDRiZC00Y2Y3LWFjMjYtYTY5OTYwNWIzYzdiIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwODIwNDA5MiwiZXhwIjoxNzA4Mzc2NzE5LCJpYXQiOjE3MDgzNzMxMTksImp0aSI6ImUwOWVlZmYxLWE1YTktNDNiNy1hNTExLWU2MWI5ODI5M2FmNyIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.szankMiKTvkRSY6tz4kHZRvwds8CmUcAPnw9CXiHJ_XseLIur6nHjBaRVKjL-ZV4axJXYruORER4OPezUGOnwpFjTqT-YDU0uFcqdHyCiFVaN6l4nfbQ1FgP0fPZJql57UNYJylUuTLtMf_p-r99WKILE9qPOcB6abGlyzvvI2YHK0sc5PWiYSL4fNTtoOmPKZH3d3FOJD4i-qXTlEqIzeuokMz8OKCWOZDG1SO9M33IihVC79vWoDm-GbU_rIjDN7gMW-WbXtKjMeeQ-FZP84ok3zFCttw_M2ml0JifbpsYJE-7-3Bbs4V9D6PP27kvdexEwnOSJDYH1pya23vWQg"
    user_id = "82cf448d-fc16-409c-82e9-3304d937f840"
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

