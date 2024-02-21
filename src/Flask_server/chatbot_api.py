from openai import OpenAI
import json
import uuid
import openai
import api_calls as ac
import time
import os

openai.api_key = f'{os.environ["OPENAI_API_KEY"]}'
client = OpenAI(api_key=openai.api_key)
assistant_id = "asst_VihgAgN5L4DlshFFnNdxJLMH"

functions = {
    'initialize_payload_user': ac.initialize_payload_user,
    'get_user_time': ac.get_user_time,
    'schedule_new_event': ac.schedule_new_event,
    # 'add_event_to_calendar': ac.add_event_to_calendar,
    # 'modify_event_in_calendar': ac.modify_event_in_calendar,
    # 'get_schedule': ac.get_schedule
}


# Function to call the assistant required functions and return their outputs as JSON strings
def execute_required_functions(required_actions):
    tool_outputs = []
    for tool_call in required_actions.submit_tool_outputs.tool_calls:
        func_name = tool_call.function.name
        args = json.loads(tool_call.function.arguments)

        # Call the corresponding Python function
        if func_name in functions:
            function = functions[func_name]
            result = function(**args)

            # Serialize the function's output to JSON
            result_str = json.dumps(result)

            # Add the result to the list of tool outputs
            tool_outputs.append({
                "tool_call_id": tool_call.id,
                "output": result_str,
            })
    return tool_outputs

class openai_manager():

    def __init__(self) -> None:

        self.initialize_tread()
        pass


    def initialize_tread(self):
        self.assistant = openai.beta.assistants.retrieve(assistant_id)
        thread = client.beta.threads.create(
                metadata={
                    'session_id': str(uuid.uuid4()),
                }
            )
        self.thread_info = thread

    def sendcall(self,user_message) -> str:
        
        print(self.thread_info.id)
        messages = client.beta.threads.messages.create(
                thread_id=self.thread_info.id,
                role="user",
                content=user_message
            )
        
        run = client.beta.threads.runs.create(
                thread_id = self.thread_info.id,
                assistant_id= self.assistant.id,
            )
        
        print(run.status)
        while(run.status != "completed"):

            if(run.status == "requires_action"):
                print(run.required_action)
                tool_outputs = execute_required_functions(run.required_action)
                run = client.beta.threads.runs.submit_tool_outputs(
                    thread_id=self.thread_info.id,
                    run_id= run.id,
                    tool_outputs=tool_outputs
                    )

            elif(run.status == "failed"):
                return "FAILED: The OpenAI API is currently processing too many requests. Please try again later ......"
            else:
                time.sleep(0.5)
                run = client.beta.threads.runs.retrieve(
                        thread_id= self.thread_info.id,
                        run_id=run.id
                        )
            
            print(run.status)
                
        messages = client.beta.threads.messages.list(
            thread_id=self.thread_info.id
        )

        return messages.data[0].content[0].text.value