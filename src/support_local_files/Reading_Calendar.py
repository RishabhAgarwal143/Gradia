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
            print(str(event.get('DESCRIPTION')).replace("\\","\\\\"))

    def add_record_to_database(self) -> None:
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        for event in self.calendar.walk('VEVENT'):
            # summary_details = "Testing ID"
            # dtstart = "2024-01-29T07:37:00.000Z"
            # dtend = "2024-01-29T10:37:00.000Z"
            # description = "Testing"
            # userinfoId = "204bba8a-b2ca-4872-ae6b-1e519daef372"
            # location = "ECE368OfficeHours"
            
            summary_details = event.get('SUMMARY')
            dtstart = "2024-01-29T07:37:00.000Z"
            dtend = "2024-01-29T10:37:00.000Z"
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
            'Authorization': 'Bearer eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDRiYmE4YS1iMmNhLTQ4NzItYWU2Yi0xZTUxOWRhZWYzNzIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfakJ2UFRaOFNyX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6ImNmM2JiYzJhLWFlN2EtNDIzNy1iMTRkLWNlNTU1MmQzYzg3NCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MDYyMDg2NDIsImV4cCI6MTcwNjU5NDM1MiwiaWF0IjoxNzA2NTkwNzUyLCJqdGkiOiJkOWViY2QyMS0wN2JmLTRiNmItOGQyMS1hNDNhYmI3YjZmMjEiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMDY3NzEyMTAwMjM1NjMzNzczMjMifQ.VpWmEf2923spl29z8qpiSA-_cFWy3EraeXJ92W51nC8QSMFIJiyfSR-ZdBskeC6wSJlPzMiEOkGucQ-x__Rsp_JTHxT9tWBVlzVWZNvqQ6qLilTq9RLDF52VhIrbmpo7YUMd4eDP_0T53K-LZGVXpzQZjbKM9CkgDN2IMm3dbN99COHvIkInEYxL73dOyJWm08H1gfXCXahx1YlRuPQO60ZLkwNWlAM1O7cP8ctvUNJEJNC07yC4XKY-N4k3yWv6u89xTYDnDJu1LQNpiZpG1xPt8mnOlswZYyrv23eK3n41yLjtZyoOGDAqVkVoiouL5xN8xMWafbepK7AiG107Kg'
            }

            response = requests.request("POST", url, headers=headers, data=payload)

            print(response.text)


x = Subscribing_to_Calendar("C:\Rishabh\Homeworks\\49595O\quantumcalendar-v1\src\support_local_files\\feed.ics","sdafsdf")
# x.print_calendar_details()
x.add_record_to_database()
