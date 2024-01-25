import requests

# Set up your API key and endpoint
api_key = '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'
endpoint = 'https://chat.openai.com/g/g-soWisM1Qo-syllabus-parser'

# Prepare headers and data for the API call
headers = {
    'Authorization': f'Bearer {api_key}'
}
data = {
    'prompt': 'Translate the following English text to French: Hello, how are you?',
    'max_tokens': 60
}

# Make the API call
response = requests.post(endpoint, headers=headers, json=data)

# Print the response from the model
print(response.json())