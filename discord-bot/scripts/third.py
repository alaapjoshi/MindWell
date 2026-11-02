import json

def analyze_emotion_counts(data):
    total_messages = 0
    emotions_counts = {}

    # Loop through each channel
    for channel_name, channel_data in data.items():
        num_messages = channel_data["num_messages"]
        total_messages += num_messages

        # Loop through each emotion in the channel
        for emotion, count in channel_data["emotion_counts"].items():
            if emotion in emotions_counts:
                emotions_counts[emotion] += count
            else:
                emotions_counts[emotion] = count

    return total_messages, emotions_counts


def most_frequent_emotion(emotion_counts):
    if not emotion_counts:
        return None

    # Find the emotion with the highest count
    return max(emotion_counts, key=emotion_counts.get)


def most_frequent_emotion_per_channel(data):
    most_frequent_per_channel = {}

    # Loop through each channel
    for channel_name, channel_data in data.items():
        emotion_counts = channel_data["emotion_counts"]

        # Find the most frequent emotion in the channel
        most_frequent_per_channel[channel_name] = most_frequent_emotion(emotion_counts)

    return most_frequent_per_channel


def save_results_to_file(total_messages, emotions_counts, most_frequent_emotion_all_channels, most_frequent_emotion_per_channel):
    with open("result.txt", "w") as result_file:
        result_file.write("Total number of messages: {}\n".format(total_messages))
        result_file.write("Emotion counts across all channels: {}\n".format(emotions_counts))
        result_file.write("Most frequent emotion across all channels: {}\n".format(most_frequent_emotion_all_channels))
        result_file.write("Most frequent emotion in each channel:\n")
        for channel_name, emotion in most_frequent_emotion_per_channel.items():
            result_file.write("Channel '{}': {}\n".format(channel_name, emotion))


if __name__ == "__main__":
    # Load the JSON data from the file
    with open("discord_statistics.json", "r") as json_file:
        data = json.load(json_file)

    # Perform the analysis
    total_messages, emotions_counts = analyze_emotion_counts(data)
    most_frequent_emotion_all_channels = most_frequent_emotion(emotions_counts)
    most_frequent_emotion_per_channel = most_frequent_emotion_per_channel(data)

    # Save the results to the result.txt file
    save_results_to_file(total_messages, emotions_counts, most_frequent_emotion_all_channels, most_frequent_emotion_per_channel)

    print("Results saved to result.txt")
