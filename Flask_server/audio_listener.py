from openai import OpenAI
import os

def initialize():
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
    return client

def transcribe(audio_path):
    client = initialize()
    audio_file = open(audio_path, "rb")
    transcription = client.audio.transcriptions.create(
        model = "whisper-1",
        file=audio_file,
        response_format="json",
        prompt="Transcibe the audio as input to a smart calendar chatbot",
        language="en",
        temperature=0.4
        )
    
    audio_json = transcription.model_dump()
    plain_text = audio_json.get('text')
    # print(transcription)
    return plain_text

if __name__ == "__main__":
    transcribe("Flask_server/audio/uploaded_audio.wav")