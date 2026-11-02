
import discord
import asyncio


BOT_TOKEN = ''

CHANNEL_ID = ""

FILE_PATH = 'result.txt'

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')
    channel = client.get_channel(int(CHANNEL_ID))
    if channel:
        await send_file_content(channel)
    else:
        print(f'Channel with ID {CHANNEL_ID} not found.')

async def send_file_content(channel):
    try:
        with open(FILE_PATH, 'r', encoding='utf-8') as file:
            file_content = file.read()

        await channel.send(file_content)
        print('File content sent successfully.')
    except FileNotFoundError:
        print('File not found. Please check the file path.')
    except discord.HTTPException:
        print('Error sending the file content.')

# Run the bot with the specified token
client.run(BOT_TOKEN)
