import requests
import json

url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"

payload = "{\"query\":\"mutation CreateTask {\\r\\n    createTask(\\r\\n        input: {\\r\\n            due_time: \\\"%s\\\"\\r\\n            due_date: \\\"2023-01-14\\\"\\r\\n            description: \\\"testing from gpt\\\"\\r\\n            userinfoID: \\\"267028fa-daf1-44db-898f-69412aa5cf25\\\"\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % ("10:00")
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJraWQiOiJPaHZUYWE3eWhGcnE5OWE5SXd1T1wvNzVGa3VrVDlPSlRzeDBxVmZxQVRUND0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyNjcwMjhmYS1kYWYxLTQ0ZGItODk4Zi02OTQxMmFhNWNmMjUiLCJjb2duaXRvOmdyb3VwcyI6WyJBZG1pbnMiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfakJ2UFRaOFNyIiwiY2xpZW50X2lkIjoiZ29iNWJ0MTBibmtmdTFudmpyc3BwamJjNCIsIm9yaWdpbl9qdGkiOiIyZTc1NTk4OS0xNGYzLTQ2YjEtOTAwMC1mYmI4Y2ExNDc4ZjAiLCJldmVudF9pZCI6IjU4MDBlMzU3LWI5MGItNGM3Ny04N2QzLTE0MDI2M2RhNzc1NyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDUyODc1MDEsImV4cCI6MTcwNTI5NTY0MywiaWF0IjoxNzA1MjkyMDQzLCJqdGkiOiJhZmU3NzA0Ni0yYTE5LTRmY2MtOWQzMy1kNDZjZGQ5NTRmYTYiLCJ1c2VybmFtZSI6IjI2NzAyOGZhLWRhZjEtNDRkYi04OThmLTY5NDEyYWE1Y2YyNSJ9.sTwYknvQ0YloQDdp1PF8CgUINvAQIKGFEzAg5D67EoZBqIyzPvcCklyglaiY8n3ClqVQ7x9IQThgmu81J7NezPmQJkLRMZhCp3W4jubx9Jj7T1jl8VaS3g1p4zRQG0mW5LDfNSTYj1N2y75s7o2G0N_OICBT_-WT5TpkAENfDIRByTOGr0k1--j8XUO6ZypfFlGNZm6TBLpel6lBYUJEdl1pSpirFW1oxreDyv2OiRenOAkKoMBja0TBWLB4NRKpvEO5vH8bUaMGBZkDXSuqgZC7agI2wcrhOZHbkl3_0Vv1KpZgtjSBEew9boN5I_egOh7StHseawPsvUKvLnIcOQ'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)