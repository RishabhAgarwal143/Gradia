import pytz
import requests
import http.client
import json
import logging
from datetime import datetime
from datetime import timedelta
import sys

TOKEN = "eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODM4NDU1ZS04MDI1LTQ0NGEtOWM0ZS1kOTJlYmQ0MjYzZWIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfakJ2UFRaOFNyX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjMwMDZmYTliLTc5MmUtNDk5OC1iMTAxLTRlMTI2OTU2YmJkYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MDYyMTI1NDIsImV4cCI6MTcwNjgxNjQ5MiwiaWF0IjoxNzA2ODEyODkyLCJqdGkiOiI3MDIyY2UzOS05NTM2LTQ4NTctYWViYS1hMTI1YTkwZjQ1ZTUiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTAzMzgyNDE4NTEzMjIzMzM0NTQifQ.CVts7FYiSZeWpF2lHNK7rUNiULq-HIgxKtNK_jDBEGNGknR6UtBoz6l6fEsNLoLcg37mvp79arlXbARlnekAduT6P7JoNXYAXAzY2LlJn4PsBRwmHUNtzCNymrjUO56iTTLpHS-zjUp_uc7plXC5QDG-qU-7RO1bJYUpePQw03xEEL30CROZeHH_XxYCKYw6LmI-nemuc8tua4ac8gUmyerXk127u9fRAkudN_x9qj94axpsDE79ca0sSz1dWjODJDTDuVgZjiSdiqsGjyHSAb9gPqr-AuzN_hPXTpRMatqt3u4YemlE0gmctOTNryIrU4dCCStve2V_YDU_ZtkWTA"
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {TOKEN}'
}
url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"


class UserInfo:
    def __init__(self, user_id, user_timezone, email, name):
        self.user_id = user_id
        self.user_timezone = user_timezone
        self.email = email
        self.name = name


class TimeConverter:
    def __init__(self, user_timezone):
        self.user_timezone = user_timezone

    def get_user_time(self):
        sys_time = datetime.now(pytz.timezone('UTC'))
        user_time = sys_time.astimezone(pytz.timezone(self.user_timezone))
        return user_time.strftime('%Y-%m-%d %H:%M:%S')

    def convert_utc_to_user_tz(self, utc_time):
        user_dt = utc_time.astimezone(pytz.timezone(self.user_timezone))
        return user_dt

    def convert_user_to_utc_tz(self, user_time):
        user_dt = datetime.strptime(user_time, '%Y-%m-%d %H:%M:%S').astimezone(pytz.timezone(self.user_timezone))
        return user_dt.astimezone(pytz.utc)

    def convert_utc_time_to_ics_format(utc_time):
        # convert datetime.datetime(2024, 2, 11, 15, 44, 24, tzinfo=<UTC>) to ics format
        # return time.strftime('%Y%m%dT%H%M%SZ')
        return utc_time.strftime('%Y-%m-%dT%H:%M:%S.000Z')

    def convert_ics_time_to_utc_format(utc_time):
        dt = datetime.strptime(utc_time, '%Y-%m-%dT%H:%M:%S.000Z')
        return dt.strftime('%Y-%m-%d %H:%M:%S')


class Payload:
    def __init__(self, url, headers, timezone):
        self.url = url
        self.headers = headers
        # self.payload = payload
        # self.token = token
        self.token = TOKEN
        self.userInfoID = "267028fa-daf1-44db-898f-69412aa5cf25"
        self.timezone = timezone

    def get_schedule(self):
        payload = "{\"query\":\"query MyQuery {\\r\\n  listTasks {\\r\\n    items {\\r\\n      createdAt\\r\\n      due_date\\r\\n      description\\r\\n      due_time\\r\\n      id\\r\\n      owner\\r\\n      updatedAt\\r\\n      userinfoID\\r\\n    }\\r\\n  }\\r\\n}\",\"variables\":{}}"
        response = requests.request("POST", self.url, headers=self.headers, data=payload)
        return response.json()

    def schedule_new_event_pd(self, start_time_utc, end_time_utc, event_name_utc, location=None, description=None):
        summary_details = event_name_utc
        dtstart = start_time_utc
        dtend = end_time_utc
        userinfoId = self.userInfoID
        description = description
        location = location

        payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            " \
                  "SUMMARY: \\\"%s\\\"\\r\\n            " \
                  "DTSTART: \\\"%s\\\"\\r\\n            " \
                  "DTEND: \\\"%s\\\"\\r\\n            " \
                  "DESCRIPTION: \\\"%s\\\"\\r\\n            " \
                  "userinfoID: \\\"%s\\\"\\r\\n            " \
                  "LOCATION: \\\"%s\\\"\\r\\n        " \
                  "}\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    }" \
                  "\\r\\n}\\r\\n\",\"variables\":{}}" % (
                      summary_details, dtstart, dtend, description, userinfoId, location)

        response = requests.request("POST", self.url, headers=self.headers, data=payload)
        print(response.text)
        return response
