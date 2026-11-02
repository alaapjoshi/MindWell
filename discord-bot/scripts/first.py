import discord
import json
from transformers import AutoModelForSequenceClassification, pipeline



BOT_TOKEN = ''

# The server ID for the server you want to download messages from
SERVER_ID = ""  # Replace with your actual server ID

# Output file name
OUTPUT_FILE = "discord_messages.json"

intents = discord.Intents.default()
intents.typing = False
intents.presences = False

client = discord.Client(intents=intents)


@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

    # Fetch messages after the bot has logged in
    server = client.get_guild(SERVER_ID)
    if server is None:
        print("Bot is not a member of the server lol")
        await client.close()
        return

    messages_data = await fetch_messages(server)

    # Save messages to JSON file
    with open(OUTPUT_FILE, "w") as json_file:
        json.dump(messages_data, json_file, indent=4)

    # After saving, close the bot connection
    await client.close()


async def fetch_messages(server):
    all_messages = {}

    for channel in server.text_channels:
        messages = []
        async for message in channel.history(limit=None):
            # You can customize which message attributes to save if needed
            message_data = {
                "author": str(message.author),
                "content": message.content,
                "timestamp": message.created_at.timestamp()
            }
            messages.append(message_data)

        all_messages[channel.name] = messages

    return all_messages


if __name__ == "__main__":
    client.run(BOT_TOKEN)
