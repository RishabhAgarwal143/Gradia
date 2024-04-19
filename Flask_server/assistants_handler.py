# You are a helpful AI assistant.
# Your output is to an API.
# Response to user and metadata will be extracted from output json.
# Except for tool calls, create only valid json complying to schema.

import openai
import time
from dotenv import load_dotenv
import re
import os

# Assuming you have a .env file containing OPENAI_API_KEY=<your key> in 
# the same directory. You can get your API key here 
# https://platform.openai.com/api-keys
load_dotenv()

class AssistantHandler:
    def __init__(self) -> None:
        self.client = openai.Client()
        openai.api_key = f'{os.environ["OPENAI_API_KEY"]}'
        self.assistant_id = "asst_dIkH4ABL3uRf0GY3du5lJsRF"

    
    def sendcall(self, prompt):
        # prompt = prompt
        thread = self.client.beta.threads.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        run = self.client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=self.assistant_id
        )

        while run.status != 'completed':
            run = self.client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
            )
            print(run.status)
            time.sleep(0.1)


        thread_messages = self.client.beta.threads.messages.list(thread.id)

        if thread_messages.data:
            content = thread_messages.data[0].content[0].text.value
            cleaned_content = re.sub(r"【\d+†source】", "", content)
            cleaned_content = cleaned_content.strip()
            return cleaned_content
        else:
            return None
        #     print(cleaned_content)
        # return thread_messages
        # for messages in thread_messages:
        #     for content in messages.content:
        #         print(content.text.value)

# // json output schema
# {
#   "$schema": "http://json-schema.org/draft-07/schema#",
#   "type": "object",
#   "properties": {
#     "message": {
#       "type": "object",
#       "properties": {
#         "assistant": {
#           "type": "string",
#           "description": "the response to the user",
#           "example": "I am glad to help!"
#         },
#         "topic": {
#           "type": "string",
#           "description": "subject of recent discussion",
#           "example": "baseball"
#         },
#         "user_mood": {
#           "type": "string",
#           "description": "user is happy, upset, etc",
#           "example": "neutral"
#         }
#       },
#       "required": [
#         "assistant",
#         "topic",
#         "user_mood"
#       ]
#     },
#     "length_of_conversation_turns": {
#       "type": "number",
#        "description": "total user and assistant conversation exchange turns"
#     },
#     "conversation_turns_on_topic": {
#       "type": "number",
#       "description": "number of recent turns engaging newest topic"
#     }
#   },
#   "required": [
#     "message",
#     "length_of_conversation_turns",
#     "conversation_turns_on_topic"
#   ]
# }