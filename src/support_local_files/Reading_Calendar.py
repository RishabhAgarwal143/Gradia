import icalendar
import requests
import json

class Subscribing_to_Calendar:

    def __init__(self,file_name,accesstoken) -> None:
        self.file = file_name
        self.token = accesstoken
        self.reading_file(file_name)
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

        return uid_list


    def add_record_to_database(self) -> None:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        listofuid = self.get_current_schedules()

        for event in self.calendar.walk('VEVENT'):

            if(str(event.get('UID')) in listofuid):
                continue
            summary_details = event.get('SUMMARY')
            dtstart = (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            dtend = (event.get('DTEND').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            description = "Descprition"
            userinfoId = "82cf448d-fc16-409c-82e9-3304d937f840"
            location = event.get('LOCATION')
            uid = event.get('UID')
            if(event.get('RRULE')):
                rrule = {}
                frequency = event.get('RRULE').get('FREQ')[0]
                if(event.get('RRULE').get('INTERNVAL')):
                    interval = event.get('RRULE').get('INTERNVAL')
                else:
                    interval = 1
                rrule["FREQ"] = frequency
                rrule["INTERVAL"] = interval
                if(event.get('RRULE').get('UNTIL')):
                    rrule["UNTIL"] = r"\"%s\"" % event.get('RRULE').get('UNTIL')[0].strftime("%Y-%m-%dT%H:%M:%S.000Z")
                else:
                    rrule["UNTIL"] = "null"
                if(event.get('RRULE').get('BYDAY')):
                    rrule["BYDAYS"] = r"\"%s\"" % (",".join(event.get('RRULE').get('BYDAY')))
                else:
                    rrule["BYDAYS"] = "null"
                if(event.get('RRULE').get('BYMONTH')):
                    rrule["BYMONTH"] = ",".join(event.get('RRULE').get('BYMONTH'))
                else:
                    rrule["BYMONTH"] = "null"
                if(event.get('RRULE').get('WKST')):
                    # rrule["WKST"] = event.get('RRULE').get('WKST')[0]
                    rrule["WKST"] = r"\"%s\"" % event.get('RRULE').get('WKST')[0]
                else:
                    rrule["WKST"] = "null"
                if(event.get('RRULE').get('COUNT')):
                    rrule["COUNT"] = (event.get('RRULE').get('COUNT'))
                else:
                    rrule["COUNT"] = "null"
                payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            isTask: false\\r\\n            SUMMARY: \\\"%s\\\"\\r\\n            DTSTART: \\\"%s\\\"\\r\\n            DTEND: \\\"%s\\\"\\r\\n            DESCRIPTION: \\\"%s\\\"\\r\\n            LOCATION: \\\"%s\\\"\\r\\n            userinfoID: \\\"%s\\\"\\r\\n            "\
                "RRULE: {\\r\\n                FREQ: %s\\r\\n                INTERVALS: %d\\r\\n                UNTIL: %s\\r\\n                WKST: %s\\r\\n                BYDAYS: %s\\r\\n                BYMONTH: %s\\r\\n                COUNT: %s\\r\\n            }\\r\\n            UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                "}\\r\\n}\\r\\n\",\"variables\":{}}" %(summary_details,dtstart,dtend,(description),location,userinfoId,rrule["FREQ"],rrule["INTERVAL"],rrule["UNTIL"],rrule["WKST"],rrule["BYDAYS"],rrule["BYMONTH"],rrule["COUNT"],uid)
            else:
                bool_task = "false"
                if(dtstart == dtend):
                    bool_task = "true"
                payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                "isTask: %s\\r\\n            "\
                "SUMMARY: \\\"%s\\\"\\r\\n            "\
                "DTSTART: \\\"%s\\\"\\r\\n            "\
                "DTEND: \\\"%s\\\"\\r\\n            "\
                "DESCRIPTION: \\\"%s\\\"\\r\\n            "\
                "LOCATION: \\\"%s\\\"\\r\\n            "\
                "userinfoID: \\\"%s\\\"\\r\\n            "\
                "RRULE: %s\\r\\n            "\
                "UID: \\\"%s\\\"\\r\\n        }\\r\\n    ) "\
                "{\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        UID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    "\
                "}\\r\\n}\\r\\n\",\"variables\":{}}" %(bool_task,summary_details,dtstart,dtend,str(description),location,userinfoId,"null",uid)
                
            print(payload)
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer %s' % self.token
            }
            
            response = requests.request("POST", url, headers=headers, data=payload)
            print(response.text)

Token = 'eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjBkMTVhMmExLTBhNmUtNDIyYy05ZmEyLTI3Nzc5MjgzMGRhZiIsImV2ZW50X2lkIjoiZTExYmVkN2MtOWQxMi00YjMxLWI1ZmEtZGYzYjYwYmJmNTIxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwNzQxOTQ2NSwiZXhwIjoxNzA3NzA5MTUyLCJpYXQiOjE3MDc3MDU1NTIsImp0aSI6IjBmMGYxNzUwLTdlZDItNDUxMC05Mzc1LTQyMzNkZGE2MWE5MSIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.qct19YimD1H5lu7BZ_YOJL65p5CVkiF1rE4NV-pquGKYBRgUl7xJLFKsV8mgDEALDnQZDhFoE3mNrzC440ZrL6s-iL-5UJm780JMGouCDN3831p125qf2iRce4GwcKK_xGRlHvt_8fWZu5M-okPiGzR_Rz0zTu9zYy9MrhnwwXVE0HtE2mkg9kn3jyE71m6K6yQTvd0tx9TFZOhqPdVWFo8fs8jdtOYYSYTe8ZnZ3dvd5UXHYns-bqgKclJ8J_17Pfc5esMBZNaYjbgv540D8JFpS0pcd-lfiUUvWpyvEZlcLQpTQ5ZBhMLryKQvP6vSebXnl9wiviNMnfIujCIAWA'
x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\events.ics",Token)
# x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\feed.ics",Token)
# x.get_current_schedules()
# x.print_calendar_details()
x.add_record_to_database()

