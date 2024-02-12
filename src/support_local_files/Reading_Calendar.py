import icalendar
import requests
import json

class Subscribing_to_Calendar:

    def __init__(self,file_name,accesstoken,userid) -> None:
        self.file = file_name
        self.token = accesstoken
        self.reading_file(file_name)
        self.userinfoid = userid
        # self.print_calendar_details()

    def reading_file(self,file) -> None:
        path_to_ics_file = file
        with open(path_to_ics_file) as f:
            self.calendar = icalendar.Calendar.from_ical(f.read())
        
    def print_calendar_details(self) -> None:
        for event in self.calendar.walk('VEVENT'):
            if(event.get('RRULE')):
                print((event.get('RRULE').get('UNTIL')[0].strftime(("%Y-%m-%dT%H:%M:%S.000Z"))))

    def get_current_schedules(self) -> set:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"

        payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules {\\r\\n        nextToken\\r\\n        items {\\r\\n            UID\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"
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
        for i in returneditems:
            uid_list.append(i["UID"])
        while(nextToken):
            payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(nextToken: \\\"%s\\\") {\\r\\n        nextToken\\r\\n        items {\\r\\n            UID\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"% (nextToken)
            response2 = requests.request("POST", url, headers=headers, data=payload)
            returneditems =(json.loads(response2.text))
            nextToken = returneditems["data"]["listSchedules"]["nextToken"]
            returneditems = returneditems["data"]["listSchedules"]["items"]
            for i in returneditems:
                uid_list.append(i["UID"])

        payload = "{\"query\":\"query ListTasks {\\r\\n    listTasks {\\r\\n        nextToken\\r\\n        items {\\r\\n            UID\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"
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
        while(nextToken):
            payload = "{\"query\":\"query ListTasks {\\r\\n    listTasks(nextToken: \\\"%s\\\") {\\r\\n        nextToken\\r\\n        items {\\r\\n            UID\\r\\n        }\\r\\n    }\\r\\n}\\r\\n\\r\\n\",\"variables\":{}}"% (nextToken)
            response2 = requests.request("POST", url, headers=headers, data=payload)
            returneditems =(json.loads(response2.text))
            nextToken = returneditems["data"]["listTasks"]["nextToken"]
            returneditems = returneditems["data"]["listTasks"]["items"]
            for i in returneditems:
                uid_list.append(i["UID"])

        return uid_list


    def add_record_to_database(self) -> None:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        listofuid = self.get_current_schedules()

        for event in self.calendar.walk('VEVENT'):

            if(str(event.get('UID')) in listofuid):
                continue
            uid = event.get('UID')
            userinfoId = self.userinfoid
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
                "RRULE: {\\r\\n                FREQ: %s\\r\\n                INTERVALS: %d\\r\\n                UNTIL: %s\\r\\n                WKST: %s\\r\\n                BYDAYS: %s\\r\\n                BYMONTH: %s\\r\\n                COUNT: %s\\r\\n            }\\r\\n            UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,(description),location,userinfoId,rrule["FREQ"],rrule["INTERVAL"],rrule["UNTIL"],rrule["WKST"],rrule["BYDAYS"],rrule["BYMONTH"],rrule["COUNT"],uid)
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
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,"null","null",userinfoId,"null",5,uid)
                else:
                    payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DTEND: %s\\r\\n            "\
                    "DESCRIPTION: %s\\r\\n            "\
                    "LOCATION: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "RRULE: %s\\r\\n            "\
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,str(description),location,userinfoId,"null",uid)
                
            # print(payload)
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            
            response = requests.request("POST", url, headers=headers, data=payload)
            print(response.text)

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
                    "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DUE\\r\\n        COMPLETED\\r\\n        STATUS\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,due,completed,status,userinfoId,categories,priority,uid)
            
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            
            response = requests.request("POST", url, headers=headers, data=payload)
            print(response.text)

Token = 'eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjBkMTVhMmExLTBhNmUtNDIyYy05ZmEyLTI3Nzc5MjgzMGRhZiIsImV2ZW50X2lkIjoiZTExYmVkN2MtOWQxMi00YjMxLWI1ZmEtZGYzYjYwYmJmNTIxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwNzQxOTQ2NSwiZXhwIjoxNzA3NzgyMzUxLCJpYXQiOjE3MDc3Nzg3NTEsImp0aSI6IjE0ZTMyZjI3LTFkYzYtNDM5YS05ODE0LWYwMDVmZmZlNTc0OSIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.q0LMfaQjct6pi79ltxxKy5I4861zf1BQ6sswgmnmCUV-DJ-o7T29GmKkvgUYUYRVQaUMZx62J4idcKf_PdeOUSnXzS3stJjFATfAziuj09edr2BGDLtfztsa6dn-ppjEE08H7RSNqOnMzHU6W3C0if49Nblxt8XXdcD1_Cx89LnlaFp8ePHxRpq8M2AxvRkHnpmDJRNJwlohA5u57mn4HLUeiDzGfj_r-rURG_ObaWmaLxFdcVgOxAevKyfTVp17TyFChOp_IGjRNYOsCb9hywFFkBiFCOfDRTFM73PhElmXvatbk5YU4cmq1rhSz0e0dYNOpeb6Pq2RnII_NRkeQw'
x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\events.ics",Token,"82cf448d-fc16-409c-82e9-3304d937f840")
# x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\feed.ics",Token,"82cf448d-fc16-409c-82e9-3304d937f840")
# x.get_current_schedules()
# x.print_calendar_details()
x.add_record_to_database()

