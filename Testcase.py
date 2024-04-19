import requests
import openai
import json
import icalendar
import time
import os
import unittest
from dotenv import load_dotenv

class Testing_DB(unittest.TestCase):
    
    def test_Write_Read_DB(self) -> None:

        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        headers = {
        'Content-Type': 'application/json',
        'x-api-key': f'{os.environ["API_KEY"]}'
        }

        payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            SUMMARY: \\\"testing\\\"\\r\\n            DTSTART: \\\"2024-01-27T04:59:00.000Z\\\"\\r\\n            DTEND: \\\"2024-01-27T04:59:00.000Z\\\"\\r\\n            DESCRIPTION: \\\"testing postman\\\"\\r\\n            LOCATION: \\\"postman\\\"\\r\\n            userinfoID: \\\"82cf448d-fc16-409c-82e9-3304d937f840\\\"\\r\\n            RRULE: {\\r\\n                FREQ: WEEKLY\\r\\n                UNTIL: \\\"2024-05-27T04:59:00.000Z\\\"\\r\\n                BYDAYS: \\\"MO,WE\\\"\\r\\n                WKST: \\\"MO\\\"\\r\\n                INTERVALS: 1\\r\\n            }\\r\\n        }\\r\\n    ) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}"

        response = requests.request("POST", url, headers=headers, data=payload)
        createitems =(json.loads(response.text))
        id = createitems["data"]["createSchedule"]["id"]

        time.sleep(20)

        payload = "{\"query\":\"query ListSchedules {\\r\\n    listSchedules(\\r\\n        filter: {\\r\\n            userinfoID: { eq: \\\"82cf448d-fc16-409c-82e9-3304d937f840\\\" }\\r\\n            "\
        "id: { eq: \\\"%s\\\" }\\r\\n        }\\r\\n    ) {\\r\\n        items {\\r\\n            id\\r\\n            SUMMARY\\r\\n            DTSTART\\r\\n            DTEND\\r\\n            DESCRIPTION\\r\\n            LOCATION\\r\\n            userinfoID\\r\\n        "\
        "}\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" % (id)

        response2 = requests.request("POST", url, headers=headers, data=payload)
        returneditems =(json.loads(response2.text))
        print(returneditems)
        returneditems = returneditems["data"]["listSchedules"]["items"][0]

        self.assertTrue(returneditems["id"] == id)
        self.assertTrue(returneditems["SUMMARY"] == "testing")
        self.assertTrue(returneditems["DTSTART"] == "2024-01-27T04:59:00.000Z")
        self.assertTrue(returneditems["DTEND"] == "2024-01-27T04:59:00.000Z")
        self.assertTrue(returneditems["DESCRIPTION"] == "testing postman")
        self.assertTrue(returneditems["LOCATION"] == "postman")
        self.assertTrue(returneditems["userinfoID"] == "82cf448d-fc16-409c-82e9-3304d937f840")

        payload = "{\"query\":\"mutation DeleteSchedule {\\r\\n    deleteSchedule(input: { id: \\\"%s\\\" }) {\\r\\n        id\\r\\n        owner\\r\\n    }\\r\\n}\",\"variables\":{}}" % (id)

        response3 = requests.request("POST", url, headers=headers, data=payload)
        
        returneditems2 =(json.loads(response3.text))
        returneditems2 = returneditems2["data"]["deleteSchedule"]


        self.assertTrue(returneditems2["id"] == id)

        
if(__name__ == "__main__"):
    load_dotenv()
    unittest.main()