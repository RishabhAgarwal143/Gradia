import pytz
import requests
import http.client
import json
import logging
from datetime import datetime
from datetime import timedelta
from dateutil.rrule import rrulestr
from datetime import datetime
import sys


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
    def __init__(self, url, headers, timezone, token, user_info_id):
        self.url = url
        self.headers = headers
        # self.payload = payload
        # self.token = token
        self.token = token
        self.user_info_id = user_info_id
        self.timezone = timezone
        self.schedules = None


    def get_schedule_pd(self, user_time="1800-01-01 00:00:01", limit=1000, rrule=False):
        # if not rrule:
        #     start_filter = "{ DTSTART: { gt: \\\"%s\\\" } }" % user_time
        # else:
        start_filter = "null"
        limit = 1000

        payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(filter: %s,\
                    limit: %d) {\\r\\n        items {\\r\\n            id\\r\\n            SUMMARY\\r\\n          \
                    DTSTART\\r\\n    DTEND\\r\\n            DESCRIPTION\\r\\n            LOCATION\\r\\n            \
                        RRULE {\\r\\n                FREQ\\r\\n                INTERVALS\\r\\n                UNTIL\\r\\n \
                        WKST\\r\\n                BYDAYS\\r\\n                BYMONTH\\r\\n                COUNT\\r\\n    \
                        }\\r\\n            UID\\r\\n            CATEGORIES\\r\\n            Importance {\\r\\n             \
                        id\\r\\n                Grade_Percentage\\r\\n                Task_info\\r\\n            \
                        Expected_Time\\r\\n                Course\\r\\n                Additional_Info\\r\\n           \
                        createdAt\\r\\n                updatedAt\\r\\n            }\\r\\n            updatedAt\\r\\n       \
                        scheduleImportanceId\\r\\n        }\\r\\n        nextToken\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (start_filter, limit)
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % self.token
        }

        # print(headers)
        response = requests.request("POST", self.url, headers=headers, data=payload)


        # print(response.text)

        return response.json()

