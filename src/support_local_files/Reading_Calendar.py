import icalendar
import requests
import json
import datetime

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
            print(str(event.get('RRULE').get('FREQ')[0]))

    def add_record_to_database(self) -> None:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        for event in self.calendar.walk('VEVENT'):
            summary_details = event.get('SUMMARY')
            dtstart = (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            dtend = (event.get('DTEND').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            description = "Description"
            userinfoId = "82cf448d-fc16-409c-82e9-3304d937f840"
            location = event.get('LOCATION')
            frequency = event.get('RRULE').get('FREQ')
            
            payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            SUMMARY: \\\"testing\\\"\\r\\n            DTSTART: \\\"2024-01-27T04:59:00.000Z\\\"\\r\\n            DTEND: \\\"2024-01-27T04:59:00.000Z\\\"\\r\\n            DESCRIPTION: \\\"testing postman\\\"\\r\\n            LOCATION: \\\"postman\\\"\\r\\n            userinfoID: \\\"82cf448d-fc16-409c-82e9-3304d937f840\\\"\\r\\n            RRULE: {\\r\\n                FREQ: \\\"WEEKLY\\\"\\r\\n                UNTIL: \\\"2024-05-27T04:59:00.000Z\\\"\\r\\n                BYDAYS: [MO, TU, WE]\\r\\n                WKST: MO\\r\\n            }\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}"

            payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: \\\"%s\\\"\\r\\n            "\
                    "DTSTART: \\\"%s\\\"\\r\\n            "\
                    "DTEND: \\\"%s\\\"\\r\\n            "\
                    "DESCRIPTION: \\\"%s\\\"\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "LOCATION: \\\"%s\\\"\\r\\n        "\
                    "RRULE: {\\r\\n                FREQ: \\\"WEEKLY\\\"\\r\\n                "\
                    "UNTIL: \\\"2024-05-27T04:59:00.000Z\\\"\\r\\n                "\
                    "BYDAYS: [MO, TU, WE]\\r\\n                "\
                    "WKST: MO\\r\\n            }\\r\\n        "\
                    "}\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    }"\
                    "\\r\\n}\\r\\n\",\"variables\":{}}" % (summary_details,dtstart,dtend,description,userinfoId,location)
            
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4MmNmNDQ4ZC1mYzE2LTQwOWMtODJlOS0zMzA0ZDkzN2Y4NDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjlkNGNiMjFlLWRlYzMtNDM3Yi1iZWU0LTE4MmQ3MzA0YWM5MyIsImV2ZW50X2lkIjoiMDA0NGQ5YzctOTM1OC00MjQ5LWIxNWMtNzZmNzVhZGVkOWY3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcwNzA4MDI0OSwiZXhwIjoxNzA3MDkzMDE1LCJpYXQiOjE3MDcwODk0MTUsImp0aSI6ImFkZWFmZjNhLWFkYmYtNDE3MC05MGQwLThiM2MwNmY0M2Y0YSIsInVzZXJuYW1lIjoiODJjZjQ0OGQtZmMxNi00MDljLTgyZTktMzMwNGQ5MzdmODQwIn0.RryKnCfCFdTi-kd0nPXQbxAP6lwDmjTUePI4FILGoOwL1IKrp9W0ixBvdfoWWs3adxiIZKjzAzASkng2TBAh1C2pfCBPBariNek3ekXjNp8IUEGhwyky7xxos3gWvbKTZrB5ZuTse-sCjne35FxmBAwggemQs-nOS0h5v5k4tiUt0il60rBGyDTy8LWwfO5EctAakVhU56-_7L8mpy3fwbs2SHZatd_8KQBO1RXXxKgCGTKkvhWQWY_BaS755J7WQBdCd55FS_bbsx2Q_xAp1pqAOWKDD7Q5WfSYy45s310mvidxj6Z6jGnDo9KQvwllScQesFLPnR87JZy5Sd1Icg'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            print(response.text)


x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\events.ics","sdafsdf")
x.print_calendar_details()
# x.add_record_to_database()
