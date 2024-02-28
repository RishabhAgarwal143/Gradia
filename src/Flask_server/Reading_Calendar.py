import icalendar
import requests
import json
import os
import pytz
from datetime import datetime
class Subscribing_to_Calendar:

    def __init__(self,calendar_URL,accesstoken,userid, categories_name) -> None:
        self.calendar_URL = calendar_URL
        self.token = accesstoken
        self.userinfoid = userid
        self.category = categories_name
        # self.reading_file(calendar_URL)
        self.create_file()
        # self.print_calendar_details()

    def create_file(self):
        url = self.calendar_URL
        response = requests.request("GET", url, headers={}, data={})
        self.calendar = icalendar.Calendar.from_ical(response.text)
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        payload = "{\"query\":\"query ListSubscribedCalendars {\\r\\n    listSubscribedCalendars {\\r\\n        items {\\r\\n            Calendar_URL\\r\\n            owner\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}"
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % self.token
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        # print(response.text)
        returneditems =(json.loads(response.text))
        listofurl = (returneditems["data"]["listSubscribedCalendars"]["items"])
        add_to_database = True
        for i in listofurl:
            if(self.calendar_URL in i['Calendar_URL']):
                add_to_database = False
        
        if(add_to_database):
            # print("asd\n")
            payload = "{\"query\":\"mutation CreateSubscribedCalendar {\\r\\n    createSubscribedCalendar(\\r\\n        input: { Calendar_URL: \\\"%s\\\", Calendar_Name: \\\"%s\\\", userinfoID: \\\"%s\\\" }\\r\\n    ) {\\r\\n        id\\r\\n        Calendar_Name\\r\\n        Calendar_URL\\r\\n        userinfoID\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (self.calendar_URL,self.category,self.userinfoid)
            response = requests.request("POST", url, headers=headers, data=payload)
            print(response.text)

    def reading_file(self,file):
        path_to_ics_file = file
        with open(path_to_ics_file) as f:
            self.calendar = icalendar.Calendar.from_ical(f.read())

    def print_calendar_details(self) -> None:
        # print(self.calendar.walk('VCALENDAR'))
        for event in self.calendar.walk('VTIMEZONE'):
            print(event['LAST-MODIFIED'])

    def get_current_schedules(self) -> set:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(limit: 1000) {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
        }

        response2 = requests.request("POST", url, headers=headers, data=payload)
        # print(response2.text)
        returneditems =(json.loads(response2.text))
        returneditems = returneditems["data"]["listSchedules"]["items"]
        print(len(returneditems))
        uid_list = []
        dtstamp_list = []
        id_list = []
        for i in returneditems:
            uid_list.append(i["UID"])
            id_list.append(i["id"])
            dtstamp_list.append(i["DTSTAMP"])

        counter = len(uid_list)
        payload = "{\"query\":\"query ListTasks {\\r\\n    listTasks(limit: 1000) {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
        }
        response2 = requests.request("POST", url, headers=headers, data=payload)
        # print(response2.text)
        returneditems =(json.loads(response2.text))
        returneditems = returneditems["data"]["listTasks"]["items"]

        print(len(returneditems))
        for i in returneditems:
            uid_list.append(i["UID"])
            id_list.append(i["id"])
            dtstamp_list.append(i["DTSTAMP"])

        return uid_list,dtstamp_list,id_list,counter


    def add_record_to_database(self) -> None:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        listofuid,listofstamps,listofid,task_separator = self.get_current_schedules()

        for event in self.calendar.walk('VEVENT'):

            if(str(event.get('UID')) in listofuid):
                if(listofstamps[listofuid.index(event.get('UID'))] and event.get('LAST-MODIFIED') and event.get('LAST-MODIFIED').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z") == listofstamps[listofuid.index(event.get('UID'))]):
                    continue
                else:
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

            uid = event.get('UID')
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
                dtstamp = r"\"%s\"" % (temp.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            else:
                dtstamp = "null"

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
                "RRULE: {\\r\\n                FREQ: %s\\r\\n                INTERVALS: %d\\r\\n                UNTIL: %s\\r\\n                WKST: %s\\r\\n                BYDAYS: %s\\r\\n                BYMONTH: %s\\r\\n                COUNT: %s\\r\\n            }\\r\\n            CATEGORIES: %s\\r\\n            DTSTAMP: %s\\r\\n            UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,(description),location,userinfoId,rrule["FREQ"],rrule["INTERVAL"],rrule["UNTIL"],rrule["WKST"],rrule["BYDAYS"],rrule["BYMONTH"],rrule["COUNT"],categories,dtstamp,uid)
            else:
                if(dtstart == dtend):
                    payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DUE: %s\\r\\n            "\
                    "COMPLETED: %s\\r\\n            "\
                    "STATUS: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "CATEGORIES: %s\\r\\n            "\
                    "PRIORITY: %d\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,categories,"null",userinfoId,location,5,dtstamp,uid)
                elif(dtend == "null"):
                    payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DUE: %s\\r\\n            "\
                    "COMPLETED: %s\\r\\n            "\
                    "STATUS: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "CATEGORIES: %s\\r\\n            "\
                    "PRIORITY: %d\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,"null",dtstart,categories,"null",userinfoId,location,5,dtstamp,uid)
                else:
                    payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DTEND: %s\\r\\n            "\
                    "DESCRIPTION: %s\\r\\n            "\
                    "CATEGORIES: %s\\r\\n            "\
                    "LOCATION: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "RRULE: %s\\r\\n            "\
                    "DTSTAMP: %s\\r\\n            "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,str(description),categories,location,userinfoId,"null",dtstamp,uid)
                
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            response = requests.request("POST", url, headers=headers, data=payload)
            print("line 215" + response.text)

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
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,due,completed,status,userinfoId,categories,priority,dtstamp,uid)
            
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            response = requests.request("POST", url, headers=headers, data=payload)
            print("line 263" +response.text)

if __name__ == '__main__':
    Token = 'eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjA3M2U2MDA1LTE3ZWEtNDdiYy1iNWIwLWRkNTk0N2UzYjYwMSIsImV2ZW50X2lkIjoiOGI0MDJjMzYtNmZiMy00YTVjLWIyMWEtNGJkNGRkZTgwOTMyIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwODY3MzkzNCwiZXhwIjoxNzA4OTg3NTkzLCJpYXQiOjE3MDg5ODM5OTMsImp0aSI6ImE3ZGRjMGExLTFmZTMtNGE1MC1iOGY4LWQyNzBlMmJjZDJkZSIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.rpRwQhojQ5pQ_68EsJjDB0RhtthwiyPt_-jmPT_JIfcU2XaspgEtjBN30P0ug2K6wzHgCmAXXnCNq4R3myPwfAgOtg-5Bf7Jn36eJer8azN-pd19LK3U4hnYVCHSPN3yhmhReW2v3xkjOEvuxXlEM7C_lBOaZYwoylGNksBaEAXfEiSCG5F0i2PpztI0_tL3Q6egfBhCqM6CK6c3bvrMhdxO0OgC7l-4nYxepibOil4-kCsGQm9v-PcW42ZFuhkHs0qEgIsqYeKPcySaEcOJ7JEgM9Z7JEmziIBGgfjUPEM8HeUoy_JKqQFcmJ9ejd63TzVE38DYFudQ3Kt2HnfjGA'
    y = Subscribing_to_Calendar("https://timetable.mypurdue.purdue.edu/Timetabling/export?x=5bqkz1gwruqbr0xfcgr2ks4gdlsnnf4u4",Token,"82cf448d-fc16-409c-82e9-3304d937f840","Purdue TimeTable")
    x = Subscribing_to_Calendar("https://purdue.brightspace.com/d2l/le/calendar/feed/user/feed.ics?token=abm22pjnrmcaxnps38b1d",Token,"82cf448d-fc16-409c-82e9-3304d937f840","Assignments List")
#     # pulkit = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\\quantumcalendar-v1\\src\\support_local_files\\AIFevents.ics",Token,"8019ecdb-3d9e-4659-8ce4-46e2663633a8","AIF Event Calendar")
#     # pulkit.add_record_to_database()
    x.add_record_to_database()
    y.add_record_to_database()

