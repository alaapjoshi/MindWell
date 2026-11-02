import json

# Load JSON data from file
with open('discord_messages_with_emotion.json', 'r') as file:
    data = json.load(file)

# Initialize dictionaries to store the count and cumulative confidence scores for each emotion per author
emotion_counts = {}
emotion_confidences = {}

# Loop through all channels and messages
for channel in data:
    for message in data[channel]:
        author = message['author']
        emotion = message['emotion']['predicted_emotion']
        confidence = message['emotion']['confidence_score']

        # Increment the count for the emotion for the author
        emotion_counts.setdefault(author, {}).setdefault(emotion, 0)
        emotion_counts[author][emotion] += 1

        # Sum up the cumulative confidence scores for the emotion for the author
        emotion_confidences.setdefault(author, {}).setdefault(emotion, 0)
        emotion_confidences[author][emotion] += confidence

# Find the person with the most neutral and cheeky messages
most_neutral_person = max(emotion_confidences.keys(), key=lambda x: emotion_confidences[x].get('anger', 0))
most_cheeky_person = max(emotion_confidences.keys(), key=lambda x: emotion_confidences[x].get('joy', 0))

# Get the message count for each person
message_counts = {author: sum(emotion_counts[author].values()) for author in emotion_counts}

print(f"Person with the most angry messages: {most_neutral_person}")
print(f"Number of angry messages: {message_counts[most_neutral_person]}")
print(f"Person with the most happy messages: {most_cheeky_person}")
print(f"Number of happy messages: {message_counts[most_cheeky_person]}")

with open('result.txt', 'a') as outfile:
    # Write the results to the file
    outfile.write(f"Person with the most angry messages: @{most_neutral_person}\n")
    outfile.write(f"Number of angry messages: {message_counts[most_neutral_person]}\n")
    outfile.write(f"Person with the most happy messages: @{most_cheeky_person}\n")
    outfile.write(f"Number of happy messages: {message_counts[most_cheeky_person]}\n")

print("Results have been added to the file.")