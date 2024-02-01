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
            print(str(event.get('DESCRIPTION')).replace("\\","\\\\"))

    def add_record_to_database(self) -> None:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        for event in self.calendar.walk('VEVENT'):
            summary_details = event.get('SUMMARY')
            dtstart = (event.get('DTSTART').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            dtend = (event.get('DTEND').dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"))
            description = "Description"
            userinfoId = "204bba8a-b2ca-4872-ae6b-1e519daef372"
            location = event.get('LOCATION')

            payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: \\\"%s\\\"\\r\\n            "\
                    "DTSTART: \\\"%s\\\"\\r\\n            "\
                    "DTEND: \\\"%s\\\"\\r\\n            "\
                    "DESCRIPTION: \\\"%s\\\"\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "LOCATION: \\\"%s\\\"\\r\\n        "\
                    "}\\r\\n    ) {\\r\\n        id\\r\\n        SUMMARY\\r\\n        DTSTART\\r\\n        DTEND\\r\\n        DESCRIPTION\\r\\n        LOCATION\\r\\n        userinfoID\\r\\n        createdAt\\r\\n        updatedAt\\r\\n        owner\\r\\n    }"\
                    "\\r\\n}\\r\\n\",\"variables\":{}}" % (summary_details,dtstart,dtend,description,userinfoId,location)
            
            headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDRiYmE4YS1iMmNhLTQ4NzItYWU2Yi0xZTUxOWRhZWYzNzIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfakJ2UFRaOFNyX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6ImNmM2JiYzJhLWFlN2EtNDIzNy1iMTRkLWNlNTU1MmQzYzg3NCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MDYyMDg2NDIsImV4cCI6MTcwNjgxMjg1MCwiaWF0IjoxNzA2ODA5MjUwLCJqdGkiOiIyMDlmYTljMC00NGY3LTQ1NWUtOWI5MC02MDBjMDczYWMyNTciLCJ1c2VybmFtZSI6Imdvb2dsZV8xMDY3NzEyMTAwMjM1NjMzNzczMjMifQ.pq0UjITi4puG4SOyNEnZlqf4oib0a-5ComHtdqckJc0eRjEtetFCLd950qU3smD7IXnDy4-3dswndne-5aQ0OgDrwK6kJC45qKbZvs1CnsaWbFbHJX6_98Ae0jAbsJOwISkoekf2y5dSocwLG3Q7ScHwf7KdAN6OW1l8B0Gq4BcMs5clngLSpn845mpW2HRQ59sCpCDxbBE4-8diNdwleOtyNXyHv2awjpyzbxj0OAMYnkOlpriC0bch2ON4-SzWxn5jRWY_sB5hwQinpWTMmiwkJb7SqboO8FIbyFIMCcJYV75cnURLPyACLyvvy2_IScrlx9fsm2EakNFzr-deiA'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            print(response.text)


x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\feed.ics","sdafsdf")
# x.print_calendar_details()
x.add_record_to_database()
