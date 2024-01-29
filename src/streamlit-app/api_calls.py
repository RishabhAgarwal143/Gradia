import requests
import http.client
import json
import logging

TOKEN = "eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODM4NDU1ZS04MDI1LTQ0NGEtOWM0ZS1kOTJlYmQ0MjYzZWIiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTJfakJ2UFRaOFNyX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9qQnZQVFo4U3IiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJnb2I1YnQxMGJua2Z1MW52anJzcHBqYmM0Iiwib3JpZ2luX2p0aSI6IjMwMDZmYTliLTc5MmUtNDk5OC1iMTAxLTRlMTI2OTU2YmJkYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MDYyMTI1NDIsImV4cCI6MTcwNjI5NzcwMywiaWF0IjoxNzA2Mjk0MTAzLCJqdGkiOiIyZDc4MjViZS04OTA2LTQ0ZjctOTQ3NS04ZGY5MDM3MTcxOGQiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTAzMzgyNDE4NTEzMjIzMzM0NTQifQ.RpPESH9Zq8EKM4LLBfjFIoaR395i8Nh7fRQumY5L680JaYj-Xvi2wSCXNgNUeTNEIGlRwM38GeSGOB6lTFTJUNkdYFl7d6F6nzTgWnhKQz4ipAMpsv6N8aJibqaiA4gqQ_0N1Z0HzXICc_xdA1u_9a94FtHaslkkN97_FtcJ9ZIZCzmY0YQpvkwkxwj0tbHm70JS4zGMdo_4jGzGTqP8X9WfkhH3nLyZKVj_9xUODkbx5_cVACAn69c-KSOneaJkN5NK2ZUfAN32zLejUtCKyy7JVbD_MxL6fsceJF027ZblQd21NJyxeW3Ufba-6n2qnW5bszPDfPkWMErKo4JysQ"
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {TOKEN}'
}
url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"


def get_actual_time_and_date(n):
    endpoint = 'http://worldtimeapi.org/api/timezone/America/Indiana/Indianapolis'
    response = requests.get(endpoint)
    # Check if the response was successful
    if response.status_code == 200:
        return response.json()
    else:
        return "Error during calling the time_date function"


def add_event_to_calendar(start_time, end_time, event_date, event_name):
    print(
        "Adding event to calendar, start time: " + start_time + ", end time: " + end_time + ", event name: " + event_name)

    # url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
    # UUID FORMAT - look up uuid1
    # ENTITY RELATIONSHIP DIAGRAM AND DATABASE NORMALIZATION
    payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n      " \
              "  input: {\\r\\n            due_time: \\\"%s\\\"\\r\\n           " \
              " due_date: \\\"%s\\\"\\r\\n            description: \\\"%s\\\"\\r\\n" \
              "            userinfoID: \\\"267028fa-daf1-44db-898f-69412aa5cf25\\\"\\r\\n" \
              "        }\\r\\n    ) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" \
              % (end_time, event_date, event_name)

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    return response.json()


def get_schedule(n):
    payload = "{\"query\":\"query MyQuery {\\r\\n  listTasks {\\r\\n    items {\\r\\n      createdAt\\r\\n      due_date\\r\\n      description\\r\\n      due_time\\r\\n      id\\r\\n      owner\\r\\n      updatedAt\\r\\n      userinfoID\\r\\n    }\\r\\n  }\\r\\n}\",\"variables\":{}}"
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()


def modify_event_in_calendar(id, event_date, event_name, end_time):
    payload = "{\"query\":\"mutation MyMutation {\\r\\n  " \
              "updateTask(input: {id: \\\"%s\\\", due_date: " \
              "\\\"%s\\\", description: \\\"%s\\\", due_time: \\\"%s\\\"})" \
              "\\r\\n}\",\"variables\":{}} " \
              % (id, event_date, event_name, end_time)

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.json()

# def main():
#     print(get_actual_time_and_date(1))
#
# if __name__ == "__main__":
#     main()
