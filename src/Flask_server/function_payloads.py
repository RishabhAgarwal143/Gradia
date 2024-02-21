import pytz
import requests
import http.client
import json
import logging
from datetime import datetime
from datetime import timedelta
import sys

TOKEN ="eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6ImRjY2U2ZDE4LTdhZDktNDMzYy1hZDM1LTQ5ZjQyMjZmZjUyZiIsImV2ZW50X2lkIjoiZWMxMzNkNjQtZjQzNi00M2RkLTlmOTgtNDUyNjNiNDJjOWQxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwODAyMzQ2MywiZXhwIjoxNzA4MDI3MDYzLCJpYXQiOjE3MDgwMjM0NjMsImp0aSI6IjU4OTQxNzI5LTMxYzYtNDkzMS05NDg1LTlhYTc3MGNjMzI4ZSIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.ajhR9fZ3-mF5BdUZg_76OYYiDz1SQZrJBioG-vggadRmdBAgneV98JGsNbDvLJfCB_BaXjRp8NL5nwf0gZAR96GRLS74um812UKFoCKJArgtc-Bb8SM43pn1ilx3l6_-DRG_4kjF2N2XBuyafj9DyON5WWCE-9zAZ0a7lP70mXOEYc7i5qorxsCZQZ_GqKKb8rthfDkUIiuP0SzORY-NpuXe6WLSc3eGTP9JgNoEHXI6pKC-7rPi0qDfIfVkrVyTA-liGQY6xmiF5kVbn8kNlVZdS7ZPQJFrDEyndisgTM7ZLwr5ylJzw0gif--pi397GfJ20jJS1lFCpmRxj7p2IA"
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

    def get_schedule_pd(self):
        payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules {\\r\\n        nextToken\\r\\n        " \
                  "items {\\r\\n            id\\r\\n            SUMMARY\\r\\n            DTSTART\\r\\n            " \
                  "DTEND\\r\\n            DESCRIPTION\\r\\n            LOCATION\\r\\n            userinfoID\\r\\n    " \
                  "        UID\\r\\n            CATEGORIES\\r\\n            DTSTAMP\\r\\n            createdAt\\r\\n   " \
                  "         updatedAt\\r\\n            owner\\r\\n            RRULE {\\r\\n                FREQ\\r\\n" \
                  "                INTERVALS\\r\\n                UNTIL\\r\\n                WKST\\r\\n                " \
                  "BYDAYS\\r\\n                BYMONTH\\r\\n                COUNT\\r\\n            }\\r\\n        " \
                  "}\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}"

        response = requests.request("POST", self.url, headers=self.headers, data=payload)
        itemsDict =(json.loads(response.text))
        nextToken = itemsDict["data"]["listSchedules"]["nextToken"]

        while (nextToken):
            nextPayload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(nextToken: \\\"%s\\\")" \
                           " {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n          " \
                           "  SUMMARY\\r\\n            DTSTART\\r\\n            DTEND\\r\\n            " \
                           "DESCRIPTION\\r\\n            LOCATION\\r\\n            userinfoID\\r\\n       " \
                           "     UID\\r\\n            CATEGORIES\\r\\n            DTSTAMP\\r\\n            " \
                           "createdAt\\r\\n            updatedAt\\r\\n            owner\\r\\n            RRULE {\\r\\n " \
                           "               FREQ\\r\\n                INTERVALS\\r\\n                UNTIL\\r\\n    " \
                           "            WKST\\r\\n                BYDAYS\\r\\n                BYMONTH\\r\\n         " \
                           "       COUNT\\r\\n            }\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" \
                           % nextToken

            nextResponse = requests.request("POST", self.url, headers=self.headers, data=nextPayload)
            nextToken = (json.loads(nextResponse.text))["data"]["listSchedules"]["nextToken"]
            itemsDict2 = (json.loads(nextResponse.text))
            itemsDict["data"]["listSchedules"]["items"] += itemsDict2["data"]["listSchedules"]["items"]

        # print(itemsDict)
        print("TOTAL ITEMS RETRIEVED: ", len(itemsDict))
        return itemsDict
        # return response.json()

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
        return response.json()
