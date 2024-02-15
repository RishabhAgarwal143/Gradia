import icalendar
import requests
import json
import os

class Subscribing_to_Calendar:

    def __init__(self,calendar_URL,accesstoken,userid, categories_name) -> None:
        self.calendar_URL = calendar_URL
        self.token = accesstoken
        self.userinfoid = userid
        self.category = categories_name
        # self.reading_file(file_name)
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

    def print_calendar_details(self) -> None:
        # print(self.calendar.walk('VCALENDAR'))
        for event in self.calendar.walk('VTIMEZONE'):
            print(event['LAST-MODIFIED'])

    def get_current_schedules(self) -> set:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"

        payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
        }

        response2 = requests.request("POST", url, headers=headers, data=payload)
        # print(response2.text)
        returneditems =(json.loads(response2.text))
        nextToken = returneditems["data"]["listSchedules"]["nextToken"]
        returneditems = returneditems["data"]["listSchedules"]["items"]
        uid_list = []
        dtstamp_list = []
        id_list = []
        for i in returneditems:
            uid_list.append(i["UID"])
            id_list.append(i["id"])
            dtstamp_list.append(i["DTSTAMP"])

        while(nextToken):
            payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(nextToken: \\\"%s\\\") {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"% (nextToken)
            response2 = requests.request("POST", url, headers=headers, data=payload)
            returneditems =(json.loads(response2.text))
            nextToken = returneditems["data"]["listSchedules"]["nextToken"]
            returneditems = returneditems["data"]["listSchedules"]["items"]
            for i in returneditems:
                uid_list.append(i["UID"])
                id_list.append(i["id"])
                dtstamp_list.append(i["DTSTAMP"])

        counter = len(uid_list)
        payload = "{\"query\":\"query ListTasks {\\r\\n    listTasks {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
        }
        response2 = requests.request("POST", url, headers=headers, data=payload)
        # print(response2.text)
        returneditems =(json.loads(response2.text))
        nextToken = returneditems["data"]["listTasks"]["nextToken"]
        returneditems = returneditems["data"]["listTasks"]["items"]
        for i in returneditems:
            uid_list.append(i["UID"])
            id_list.append(i["id"])
            dtstamp_list.append(i["DTSTAMP"])
        while(nextToken):
            payload = "{\"query\":\"query ListTasks {\\r\\n    listTasks(nextToken: \\\"%s\\\") {\\r\\n        nextToken\\r\\n        items {\\r\\n            id\\r\\n            UID\\r\\n            DTSTAMP\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"% (nextToken)
            response2 = requests.request("POST", url, headers=headers, data=payload)
            returneditems =(json.loads(response2.text))
            nextToken = returneditems["data"]["listTasks"]["nextToken"]
            returneditems = returneditems["data"]["listTasks"]["items"]
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
                dtstart = r"\"%s\"" % (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            else:
                dtstart = "null"
            if(event.get('DTEND')):
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
                dtstamp = r"\"%s\"" % event.get('LAST-MODIFIED').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z")
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
                    rrule["UNTIL"] = r"\"%s\"" % event.get('RRULE').get('UNTIL')[0].strftime("%Y-%m-%dT%H:%M:%S.000Z")
                rrule["BYDAYS"] = "null"
                if(event.get('RRULE').get('BYDAY')):
                    rrule["BYDAYS"] = r"\"%s\"" % (",".join(event.get('RRULE').get('BYDAY')))
                rrule["BYMONTH"] = "null"
                if(event.get('RRULE').get('BYMONTH')):
                    rrule["BYMONTH"] = ",".join(event.get('RRULE').get('BYMONTH'))
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
                dtstart = r"\"%s\"" % (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            due = "null"
            if(event.get('DUE')):
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
Token = 'eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjJmN2IzNzJkLThlOTMtNDdhZS05MDg5LWQ1ZDk5MjhkOTg2YiIsImV2ZW50X2lkIjoiYzgwNjMzOGItM2NhYi00YWEzLTg0YzUtYzk3MjM3YWQ4MDUzIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwODAyNDczNiwiZXhwIjoxNzA4MDI4MzM2LCJpYXQiOjE3MDgwMjQ3MzYsImp0aSI6ImI2ODVjZmY4LWZhMGEtNGE4ZS05MzkzLTk5NDgxYjhmODE5MiIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.BJ9gpTLL0e8wwmRO3Pv1CjIDcbxrzyCrys4l9kvhuoVsnOSCdKWArqw7YyyeZA5JQGf1aec6xmYaGzXtlsAJU_7bCxJol5t_mELLPYBREIsZ7_LR43tByDRrzdRfuXTt52shY_0J7ghL7FK49s4df0P7e0Rbmam87hBHL2jFuWVqqA7wQ8HjsXYrM57EOhbYCQW2XmP0C4l__CoFx_-xgyJfaity16kxf1R91Cw0Dzz8SJQIVGt7A20ykXR6y-V22DMKRoLHGhXeoQji5kSPlHtli-fU5gUctalZZ8iMGc1Il6rjTr8N8BjQxNDW0Vi801KBIvDL6vFETEvqqH1OHw'
y = Subscribing_to_Calendar("https://timetable.mypurdue.purdue.edu/Timetabling/export?x=5bqkz1gwruqbr0xfcgr2ks4gdlsnnf4u4",Token,"82cf448d-fc16-409c-82e9-3304d937f840","Purdue TimeTable")
x = Subscribing_to_Calendar("https://purdue.brightspace.com/d2l/le/calendar/feed/user/feed.ics?token=abm22pjnrmcaxnps38b1d",Token,"82cf448d-fc16-409c-82e9-3304d937f840","Assignments List")
# x.add_record_to_database()
# y.add_record_to_database()
# x.create_file("adsfasdf")
# y.add_record_to_database()
# x.get_current_schedules()
# y.print_calendar_details()
# x.print_calendar_details()

