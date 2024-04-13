import os
from openai import OpenAI
from moviepy.editor import *
from moviepy.audio.io.AudioFileClip import AudioFileClip
from moviepy.audio.AudioClip import AudioArrayClip
import numpy as np
import json
client = OpenAI(api_key="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")

# response = client.chat.completions.create(
#   model="gpt-3.5-turbo-0125",
#   response_format={ "type": "text" },
#   messages=[
#     {"role": "system", "content": "You are a helpful assistant designed to output strings."},
#     {"role": "user", "content": "Who won the world series in 2020?"}
#   ]
# )
# chat_input= response.choices[0].message.content

# response = client.audio.speech.create(
#     model="tts-1",
#     voice="alloy",
#     input=chat_input,
# )

list_of_tuples = []

with open('goaltimes2.json', 'r') as file:
    for line in file:
        # Split each line by whitespace and convert the parts to floats
        parts = line.split()
        if len(parts) == 2:
            tuple_data = (float(parts[0]), float(parts[1]))
            list_of_tuples.append(tuple_data)

print(list_of_tuples)
# Load the video and audio clips
array = list_of_tuples
left_player="Spencer"
right_player="Ethan"
video_clip = VideoFileClip("test17.mp4")
image_clip = ImageClip("scorebar.png")
right_score = 0
left_score = 0
text = str(right_score)+"|"+str(left_score)
text_clip = TextClip(text, fontsize=100, color='white', font='Arial', method='caption')
# Set the duration of the image clip to match the duration of the video clip
image_clip = image_clip.set_duration(video_clip.duration)
text_clip = text_clip.set_duration(array[0][0])
# Position the image in the center of the video clip
x_pos = (video_clip.w - image_clip.w) // 2
y_pos = (video_clip.h - image_clip.h) // 2
# Extract the audio data from the audio clip
video_duration = video_clip.duration
delay_duration = 0
text_delay = 0
video_clip = CompositeVideoClip([video_clip,image_clip.set_position((160,721)), text_clip.set_position((880, 840)).set_start(0)])
for i in range(len(array)):
    delay_duration = array[i][0]
    text_delay = text_delay+delay_duration
    if array[i][1] == 0:
        right_score = right_score+1
        response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "text" },
        messages=[
            {"role": "system", "content": "You are a hyped up basketball commentator who speaks in 5 words or less."},
            {"role": "user", "content": "React to "+right_player+" scoring bringing the score to "+str(left_score)+"-"+str(right_score)}
        ]
        )
        chat_input= response.choices[0].message.content
        print(chat_input)
        response = client.audio.speech.create(
            model="tts-1",
            voice="echo",
            input=chat_input,
        )

        response.stream_to_file("output.mp3")
    else:
        left_score = left_score+1
        response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={ "type": "text" },
        messages=[
            {"role": "system", "content": "You are a hyped up basketball commentator who speaks in 5 words or less."},
            {"role": "user", "content": "React to "+left_player+" scoring bringing the score to "+str(left_score)+"-"+str(right_score)}
        ]
        )
        chat_input= response.choices[0].message.content
        print(chat_input)
        response = client.audio.speech.create(
            model="tts-1",
            voice="echo",
            input=chat_input,
        )
        response.stream_to_file("output.mp3")
    audio_clip = AudioFileClip("output.mp3")
    audio_duration = audio_clip.duration
    text = str(right_score)+"|"+str(left_score)
    text_clip = TextClip(text, fontsize=100, color='white', font='Arial', method='caption')
    if i+1<len(array):
        text_clip = text_clip.set_duration(array[i+1][0]-text_delay)
    else:
        text_clip = text_clip.set_duration(text_delay-array[i][0])
    video_clip = video_clip.set_audio(CompositeAudioClip([video_clip.audio, audio_clip.set_start(delay_duration)]))
    video_clip = CompositeVideoClip([video_clip, text_clip.set_position((880, 840)).set_start(delay_duration)])
# image_clip.set_position((x_pos, y_pos)).set_start(delay_duration),
# # Duration of the audio clip in seconds
# audio_duration = audio_clip.duration

# # Duration of the delay before the audio starts playing
# delay_duration = 5  # in seconds

video_clip.duration = video_duration

# Write the video with the modified audio
video_clip.write_videofile("output_video2.mp4", codec="libx264", audio_codec="aac")