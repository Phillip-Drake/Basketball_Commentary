import os
from openai import OpenAI
from moviepy.editor import *
from moviepy.audio.io.AudioFileClip import AudioFileClip
from moviepy.audio.AudioClip import AudioArrayClip
import numpy as np
# client = OpenAI(api_key="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")

# response = client.audio.speech.create(
#     model="tts-1",
#     voice="alloy",
#     input="Lisan All Guy Ib.",
# )

# response.stream_to_file("output.mp3")

# Load the video and audio clips
array = [(5,1),(10,0)]
video_clip = VideoFileClip("SuperCoolGuy.mp4")
audio_clip = AudioFileClip("output.mp3")
image_clip = ImageClip("worm.png")
right_score = 0
left_score = 0
text = str(right_score)+"-"+str(left_score)
text_clip = TextClip(text, fontsize=40, color='white', font='Arial', method='caption')
# Set the duration of the image clip to match the duration of the video clip
image_clip = image_clip.set_duration(2)
text_clip = text_clip.set_duration(array[0][0])
# Position the image in the center of the video clip
x_pos = (video_clip.w - image_clip.w) // 2
y_pos = (video_clip.h - image_clip.h) // 2
# Extract the audio data from the audio clip
audio_data = audio_clip.to_soundarray()
audio_duration = audio_clip.duration
video_duration = video_clip.duration
delay_duration = 0
video_clip = CompositeVideoClip([video_clip, text_clip.set_position((x_pos, y_pos)).set_start(0)])
for i in array:
    text_delay = delay_duration
    delay_duration = i[0]
    if i[1] == 0:
        right_score = right_score+1
    else:
        left_score = left_score+1
    text = str(right_score)+"-"+str(left_score)
    text_clip = TextClip(text, fontsize=40, color='white', font='Arial', method='caption')
    text_clip = text_clip.set_duration(i[0]-text_delay)
    video_clip = video_clip.set_audio(CompositeAudioClip([video_clip.audio, audio_clip.set_start(delay_duration)]))
    video_clip = CompositeVideoClip([video_clip, image_clip.set_position((x_pos, y_pos)).set_start(delay_duration), text_clip.set_position((x_pos, y_pos)).set_start(delay_duration)])

# # Duration of the audio clip in seconds
# audio_duration = audio_clip.duration

# # Duration of the delay before the audio starts playing
# delay_duration = 5  # in seconds

video_clip.duration = video_duration

# Write the video with the modified audio
video_clip.write_videofile("output_video.mp4", codec="libx264", audio_codec="aac")