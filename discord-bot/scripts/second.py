import discord
import json
from transformers import AutoModelForSequenceClassification, pipeline

# Your Discord bot token (Replace 'YOUR_BOT_TOKEN' with your actual bot token)

BOT_TOKEN = ''

# The server ID for the server you want to download messages from
SERVER_ID =""

INPUT_MESSAGES_FILE = "discord_messages.json"

OUTPUT_MESSAGES_FILE = "discord_messages_with_emotion.json"

OUTPUT_STATISTICS_FILE = "discord_statistics.json"

MODEL_NAME = 'jitesh/emotion-english'

intents = discord.Intents.default()
intents.typing = False
intents.presences = False

client = discord.Client(intents=intents)

# Load the emotion classification model
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
classifier = pipeline("text-classification", model=model, tokenizer=MODEL_NAME)


@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

    # Fetch messages after the bot has logged in
    server = client.get_guild(SERVER_ID)
    if server is None:
        print("Could not find the server. Please make sure the bot is a member of the server.")
        await client.close()
        return

    # Load messages from the JSON file
    with open(INPUT_MESSAGES_FILE, "r") as json_file:
        messages_data = json.load(json_file)

    # Process the messages and add emotion information
    messages_with_emotion = process_messages_with_emotion(messages_data)

    # Save messages with emotion to JSON file
    with open(OUTPUT_MESSAGES_FILE, "w") as json_file:
        json.dump(messages_with_emotion, json_file, indent=4)

    # Process the messages to get statistics
    statistics = process_statistics(messages_with_emotion)

    # Save statistics to JSON file
    with open(OUTPUT_STATISTICS_FILE, "w") as json_file:
        json.dump(statistics, json_file, indent=4)

    # After saving, close the bot connection
    await client.close()


def process_messages_with_emotion(messages_data):
    for channel_name, messages in messages_data.items():
        for message in messages:
            text = message["content"]
            # Perform emotion classification using the model
            prediction = classifier(text)
            # Extract the predicted emotion and score from the prediction
            predicted_emotion = prediction[0]['label']
            confidence_score = prediction[0]['score']
            # Add emotion information to the message
            message["emotion"] = {
                "predicted_emotion": predicted_emotion,
                "confidence_score": confidence_score
            }

    return messages_data


def process_statistics(messages_data):
    statistics = {}

    for channel_name, messages in messages_data.items():
        channel_emotions = [message["emotion"]["predicted_emotion"] for message in messages]
        emotion_counts = {emotion: channel_emotions.count(emotion) for emotion in set(channel_emotions)}

        channel_stats = {
            "emotion_counts": emotion_counts,
            "num_messages": len(channel_emotions)
        }

        statistics[channel_name] = channel_stats

    return statistics


if __name__ == "__main__":
    client.run(BOT_TOKEN)
