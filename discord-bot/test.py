import json

def analyze_emotion_counts(data):
    total_messages = 0
    emotions_counts = {}

    # Loop through each message
    for message in data:
        total_messages += 1

        # Get the predicted emotion for the message
        emotion = message["emotion"]["predicted_emotion"]

        # Update the emotions count
        if emotion in emotions_counts:
            emotions_counts[emotion] += 1
        else:
            emotions_counts[emotion] = 1

    return total_messages, emotions_counts


def most_frequent_emotion(emotion_counts):
    if not emotion_counts:
        return None

    # Find the emotion with the highest count
    return max(emotion_counts, key=emotion_counts.get)


def save_results_to_file(total_messages, emotions_counts, most_frequent_emotion_all_messages):
    with open("result.txt", "w") as result_file:
        result_file.write("Total number of messages: {}\n".format(total_messages))
        result_file.write("Emotion counts across all messages: {}\n".format(emotions_counts))
        result_file.write("Most frequent emotion across all messages: {}\n".format(most_frequent_emotion_all_messages))


if __name__ == "__main__":
    # Load the JSON data from the file
    with open("discord_messages_with_emotion.json", "r") as json_file:
        data = json.load(json_file)

    # Perform the analysis
    total_messages, emotions_counts = analyze_emotion_counts(data)
    most_frequent_emotion_all_messages = most_frequent_emotion(emotions_counts)

    # Save the results to the result.txt file
    save_results_to_file(total_messages, emotions_counts, most_frequent_emotion_all_messages)

    print("Results saved to result.txt")
