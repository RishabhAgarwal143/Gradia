import icalendar
import requests
import json
import pytz
from datetime import datetime,timezone
import sqlite3
import re

import jwt


def is_cognito_token_expired(access_token):
    try:
        decoded_token = jwt.decode(access_token, algorithms=["RS256"], options={"verify_signature": False})
        expiration_time = datetime.fromtimestamp(decoded_token["exp"])
        current_time = datetime.now()
        if current_time > expiration_time:
            print("Invalid access token.")
            return True  # Token has expired
        else:
            print("Valid Token")
            return False  # Token is still valid
    except jwt.ExpiredSignatureError:
        return True
    except jwt.InvalidTokenError:
        print("Invalid access token.")
        return True


class Subscribing_to_Calendar:


    def __init__(self, calendar_URL, accesstoken,userid, categories_name) -> None:
        self.calendar_URL = calendar_URL
        self.token = accesstoken
        
        if(is_cognito_token_expired(self.token)):
            return
        self.userinfoid = userid
        self.category = categories_name
        self.extract_abbreviations()
        # print(self.check_string("ECE 39595O 29093-017"))
        self.get_calendar_info()
        self.get_subjects_info()
        self.add_record_to_database()
        


    def extract_abbreviations(self):
        conn = sqlite3.connect('Flask_server\database\course_list.db')
        cursor = conn.cursor()
        cursor.execute('''SELECT course_title FROM courses''')
        abbreviations = [row[0] for row in cursor.fetchall()]
        conn.close()
        self.course_options = abbreviations
        
    def check_string(self,string):
        pattern = re.compile(r'\b(?:' + '|'.join(self.course_options) + r')(?:\s|\b)\w{5}')
        matches = pattern.findall(string)
        return matches

    def get_calendar_info(self):
        response = requests.request("GET", self.calendar_URL, headers={}, data={})
        self.calendar = icalendar.Calendar.from_ical(response.text)
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        payload = "{\"query\":\"query ListSubscribedCalendars {\\r\\n    listSubscribedCalendars {\\r\\n        items {\\r\\n            id\\r\\n            Calendar_URL\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}"
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % self.token
        }
        response = requests.request("POST", url, headers=headers, data=payload)

        returneditems =(json.loads(response.text))
        listofurl = (returneditems["data"]["listSubscribedCalendars"]["items"])
        add_to_database = True
        for i in listofurl:
            # print(i['Calendar_URL'])
            if(self.calendar_URL in i['Calendar_URL']):
                self.calendar_id = i['id']
                return
            
        if(add_to_database):
            payload = "{\"query\":\"mutation CreateSubscribedCalendar {\\r\\n    createSubscribedCalendar(\\r\\n        input: { Calendar_URL: \\\"%s\\\", Calendar_Name: \\\"%s\\\", userinfoID: \\\"%s\\\" }\\r\\n    ) {\\r\\n        id\\r\\n        Calendar_Name\\r\\n        Calendar_URL\\r\\n        userinfoID\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (self.calendar_URL,self.category,self.userinfoid)
            response = requests.request("POST", url, headers=headers, data=payload)
            returneditems =(json.loads(response.text))
            self.calendar_id = returneditems["data"]["createSubscribedCalendar"]["id"]


    def get_subjects_info(self):
        
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % self.token
        }
        payload = "{\"query\":\"query ListSubjects {\\r\\n    listSubjects {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            subject_Name\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}"
        response = requests.request("POST", url, headers=headers, data=payload)
        returneditems =(json.loads(response.text))
        subjects = returneditems["data"]["listSubjects"]["items"]
        self.subjects_dict = {}
        for i in subjects:
            self.subjects_dict[i['subject_Name']] = i['id']
        return


    def get_current_schedules(self) -> set:
        
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
        }
        nextToken = "null"
        uid_list = []
        dtstamp_list = []
        id_list = []
        while True:
            payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(nextToken: %s) {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (nextToken)        
            response2 = requests.request("POST", url, headers=headers, data=payload)
            returneditems =(json.loads(response2.text))
            nextToken = returneditems["data"]["listSchedules"]["nextToken"]
            returneditems = returneditems["data"]["listSchedules"]["items"]
            for i in returneditems:
                uid_list.append(i["UID"])
                id_list.append(i["id"])
                dtstamp_list.append(i["DTSTAMP"])
            # print(returneditems["data"]["listSchedules"])
            if(nextToken == None):
                break
            nextToken = r"\"%s\"" % nextToken

        counter = len(uid_list)
        nextToken = "null"
        while True:
            payload = "{\"query\":\"query ListTasks {\\r\\n    listTasks(nextToken: %s) {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (nextToken)
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer %s' % self.token
            }
            response2 = requests.request("POST", url, headers=headers, data=payload)

            returneditems =(json.loads(response2.text))
            nextToken = returneditems["data"]["listTasks"]["nextToken"]
            returneditems = returneditems["data"]["listTasks"]["items"]
            for i in returneditems:
                uid_list.append(i["UID"])
                id_list.append(i["id"])
                dtstamp_list.append(i["DTSTAMP"])
            if(nextToken == None):
                break
            nextToken = r"\"%s\"" % nextToken
        return uid_list,dtstamp_list,id_list,counter


    def add_record_to_database(self) -> None:
        
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        listofuid,listofstamps,listofid,task_separator = self.get_current_schedules()
        print(len(listofuid))

        for event in self.calendar.walk('VEVENT'):
            # print((event.get('UID')) )
            if(str(event.get('UID')) in listofuid):
                if (listofstamps[listofuid.index(event.get('UID'))] and event.get('LAST-MODIFIED') and (event.get('LAST-MODIFIED').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z") != listofstamps[listofuid.index(event.get('UID'))])):
                    if(listofuid.index(event.get('UID')) < task_separator):
                        payload = "{\"query\":\"mutation DeleteSchedule {\\r\\n    deleteSchedule(input: { id: \\\"%s\\\" }) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % str(listofid[listofuid.index(event.get('UID'))])
                    else:
                        payload = "{\"query\":\"mutation DeleteTask {\\r\\n    deleteTask(input: { id: \\\"%s\\\" }) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % str(listofid[listofuid.index(event.get('UID'))])
                        
                    url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
                    headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer %s' % self.token
                    }
                    # print(payload)
                    response = requests.request("POST", url, headers=headers, data=payload)
                    print(response.text)
                else:
                    continue

            uid = str(event.get('UID'))
            userinfoId = self.userinfoid
            if(self.category != "null"):
                categories = r"\"%s\"" % self.category
            if(event.get('SUMMARY')):
                summary_details = r"\"%s\"" % event.get('SUMMARY')
            else:
                summary_details = "null"
            if(event.get('DTSTART')):
                if(isinstance(event.get('DTSTART').dt, datetime)):
                    temp = (event.get('DTSTART').dt.astimezone(pytz.utc))
                    dtstart = r"\"%s\"" % (temp.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
                else:
                    dtstart = r"\"%s\"" % (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            else:
                dtstart = "null"
            if(event.get('DTEND')):
                if(isinstance(event.get('DTEND').dt, datetime)):
                    temp = (event.get('DTEND').dt.astimezone(pytz.utc))
                    dtend = r"\"%s\"" % (temp.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
                else:
                    dtend = r"\"%s\"" % (event.get('DTEND').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            else:
                dtend = "null"
            if(event.get('LOCATION')):
                location = r"\"%s\"" % event.get('LOCATION')
            else:
                location = "null"
            if(event.get('DESCRIPTION')):
                temp = "Description"
                description = r"\"%s\"" % temp
            else:
                description = "null"
            if(event.get('LAST-MODIFIED')):
                temp = (event.get('LAST-MODIFIED').dt.astimezone(pytz.utc))
                last_modified = r"\"%s\"" % (temp.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            else:
                last_modified = "null"

            subject = self.check_string(str(event.get('DESCRIPTION')) + " " + str(event.get('SUMMARY')) + " " + str(event.get('LOCATION')))
            
            subject_id = "null"
            if(subject):
                subject = subject.pop()
                if(subject not in self.subjects_dict):
                    payload = "{\"query\":\"mutation CreateSubjects {\\r\\n    createSubjects(input: { subject_Name: \\\"%s\\\", userinfoID: \\\"%s\\\"}) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" %(subject,self.userinfoid)
                    headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer %s' % self.token
                    }
                    response = requests.request("POST", url, headers=headers, data=payload)
                    returneditems =(json.loads(response.text))
                    subject_id = returneditems["data"]["createSubjects"]["id"]
                    self.subjects_dict[subject] = subject_id
                else:
                    subject_id = self.subjects_dict[subject]
                subject_id =r"\"%s\"" % subject_id

            
            if(event.get('RRULE')):
                rrule = {}
                frequency = event.get('RRULE').get('FREQ')[0]
                interval = 1
                if(event.get('RRULE').get('INTERNVAL')):
                    interval = event.get('RRULE').get('INTERNVAL')
                rrule["FREQ"] = frequency
                rrule["INTERVAL"] = interval
                rrule["UNTIL"] = "null"
                if(event.get('RRULE').get('UNTIL')):
                    temp = event.get('RRULE').get('UNTIL')[0].astimezone(pytz.utc)
                    rrule["UNTIL"] = r"\"%s\"" % temp.strftime("%Y-%m-%dT%H:%M:%S.000Z")
                rrule["BYDAYS"] = "null"
                if(event.get('RRULE').get('BYDAY')):
                    rrule["BYDAYS"] = r"\"%s\"" % (",".join(event.get('RRULE').get('BYDAY')))
                rrule["BYMONTH"] = "null"
                if(event.get('RRULE').get('BYMONTH')):
                    rrule["BYMONTH"] = r"\"%s\"" % ((event.get('RRULE').get('BYMONTH')))
                rrule["WKST"] = "null"
                if(event.get('RRULE').get('WKST')):
                    rrule["WKST"] = r"\"%s\"" % event.get('RRULE').get('WKST')[0]
                rrule["COUNT"] = "null"
                if(event.get('RRULE').get('COUNT')):
                    rrule["COUNT"] = (event.get('RRULE').get('COUNT'))
                payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            SUMMARY: %s\\r\\n            DTSTART: %s\\r\\n            DTEND: %s\\r\\n            DESCRIPTION: %s\\r\\n            LOCATION: %s\\r\\n            userinfoID: \\\"%s\\\"\\r\\n            "\
                "RRULE: {\\r\\n                FREQ: %s\\r\\n                INTERVALS: %d\\r\\n                UNTIL: %s\\r\\n                WKST: %s\\r\\n                BYDAYS: %s\\r\\n                BYMONTH: %s\\r\\n                COUNT: %s\\r\\n            }\\r\\n            subjectsID: %s\\r\\n            subscribedcalendarID: \\\"%s\\\"\\r\\n            DTSTAMP: %s\\r\\n            UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,(description),location,userinfoId,rrule["FREQ"],rrule["INTERVAL"],rrule["UNTIL"],rrule["WKST"],rrule["BYDAYS"],rrule["BYMONTH"],rrule["COUNT"],subject_id,self.calendar_id,last_modified,uid)
            
            else:
                if(dtstart == dtend):
                    if((event.get('DTSTART').dt.astimezone(pytz.utc)) < datetime.now(timezone.utc)):
                        status = "COMPLETED"
                    else:
                        status = "NEEDS_ACTION"
                    # status = r"\"%s\"" % status
                    
                    payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DUE: %s\\r\\n            "\
                    "COMPLETED: %s\\r\\n            "\
                    "STATUS: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "LOCATION: %s\\r\\n            "\
                    "PRIORITY: %d\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "subscribedcalendarID: \\\"%s\\\"\\r\\n            "\
                    "subjectsID: %s\\r\\n        "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,"null",status,userinfoId,location,9,last_modified,self.calendar_id,subject_id,uid)
                elif(dtend == "null"):
                    if((event.get('DTSTART').dt.astimezone(pytz.utc)) < datetime.now(timezone.utc)):
                        status = "COMPLETED"
                    else:
                        status = "NEEDS_ACTION"
                    # status = r"\"%s\"" % status
                    payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DUE: %s\\r\\n            "\
                    "COMPLETED: %s\\r\\n            "\
                    "STATUS: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "LOCATION: %s\\r\\n            "\
                    "PRIORITY: %d\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "subscribedcalendarID: \\\"%s\\\"\\r\\n            "\
                    "subjectsID: %s\\r\\n        }\\r\\n    ) "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,"null",dtstart,"null",status,userinfoId,location,9,last_modified,self.calendar_id,subject_id,uid)
                else:                    
                    payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DTEND: %s\\r\\n            "\
                    "DESCRIPTION: %s\\r\\n            "\
                    "LOCATION: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "UID: \\\"%s\\\"\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "subscribedcalendarID: \\\"%s\\\"\\r\\n            "\
                    "subjectsID: %s\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,"null",location,userinfoId,uid,last_modified,self.calendar_id,subject_id)
                    
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            response = requests.request("POST", url, headers=headers, data=payload)
            # print(response.text)
        for event in self.calendar.walk('VTODO'):
            if(str(event.get('UID')) in listofuid):
                continue
            uid = event.get('UID')
            userinfoId = self.userinfoid
            summary_details = "null"
            if(event.get('SUMMARY')):
                summary_details = r"\"%s\"" % event.get('SUMMARY')
            dtstart = "null"

            if(event.get('DTSTART')):
                if(isinstance(event.get('DTSTART').dt, datetime)):
                    temp = (event.get('DTSTART').dt.astimezone(pytz.utc))
                    dtstart = r"\"%s\"" % (temp.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
                else:
                    dtstart = r"\"%s\"" % (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            if(event.get('DUE')):
                if(isinstance(event.get('DUE').dt, datetime)):
                    temp = (event.get('DUE').dt.astimezone(pytz.utc))
                    due = r"\"%s\"" % (temp.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
                else:
                    due = r"\"%s\"" % (event.get('DUE').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))

            completed = "null"
            if(event.get('COMPLETED')):
                completed = r"\"%s\"" % (event.get('COMPLETED'))
            status = "null"
            if(event.get('STATUS')):
                status = r"\"%s\"" % (event.get('STATUS'))
            priority = "null"
            if(event.get('PRIORITY')):
                priority = (event.get('PRIORITY'))
            categories = "null"
            if(event.get('CATEGORIES')):
                categories = r"\"%s\"" % (event.get('CATEGORIES'))
            
            payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DUE: %s\\r\\n            "\
                    "COMPLETED: %s\\r\\n            "\
                    "STATUS: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "CATEGORIES: %s\\r\\n            "\
                    "PRIORITY: %s\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,due,completed,status,userinfoId,categories,priority,last_modified,uid)
            
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            response = requests.request("POST", url, headers=headers, data=payload)


if __name__ == '__main__':
    Token = 'eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjAxYjk0NmM2LTIyOTQtNGNjYy04OThhLTZmZjQ0MTU4YTFiZiIsImV2ZW50X2lkIjoiZGZjMThiZmEtOWViYi00OGVkLWJlMzUtOTI5YjIxOWNhMTA2IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcxMjgwNDgzNCwiZXhwIjoxNzEzMjE3Njk2LCJpYXQiOjE3MTMyMTQwOTYsImp0aSI6ImFmMDAzNmNjLWZkMjctNDdkNi1iY2Y0LTUzNTljOWJiYTA0NiIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.ouFeLTSuGnZr0rrd2RRwUrIre2CDhI5kFBu8NbwWn6_3pJDo08UU_N83e8F7EoD7r686I__dx1sZvt6Fe_bsUAx43cCzI8hGiKDiNb7WqVhcTNjoj6x3mi54LwAwxjI0aieFgfs6yHYcugUqE4zQKPpsmTiQztvKNi4k2Fyk_GkH0vvodBwLJl_vHxunmRn2mP8lOhfUjFXdVurkjKBQYEGTSca5whJp_YvuRvmNR_3ALbmehath1FlJQaUWdT1nsBqwUuZ187pLhd-qBshcLZsCUIqUZMbJXeSmI-BRT62vX47IU7kHYkTioCGR4XFf4qrzm0yVn0eSsAhY6sp3-Q'
    y = Subscribing_to_Calendar("https://timetable.mypurdue.purdue.edu/Timetabling/export?x=5bqkz1gwruqbr0xfcgr2ks4gdlsnnf4u4",Token,"82cf448d-fc16-409c-82e9-3304d937f840","Purdue TimeTable")
    x = Subscribing_to_Calendar("https://purdue.brightspace.com/d2l/le/calendar/feed/user/feed.ics?token=abm22pjnrmcaxnps38b1d",Token,"82cf448d-fc16-409c-82e9-3304d937f840","Assignments List")
    # print(y.calendar_id)
#     # pulkit = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\\quantumcalendar-v1\\src\\support_local_files\\AIFevents.ics",Token,"8019ecdb-3d9e-4659-8ce4-46e2663633a8","AIF Event Calendar")
#     # pulkit.add_record_to_database()
    # x.add_record_to_database()
    # y.add_record_to_database()

