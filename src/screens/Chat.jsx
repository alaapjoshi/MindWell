import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const Ai2 = () => {

  const renderMessage = ({ item }) => (
    <View style={item.isUser ? styles.userMessageContainer : styles.aiMessageContainer}>
      <Text style={item.isUser ? styles.userMessage : styles.aiMessage}>
        {item.text}
      </Text>
    </View>
  );
  
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const test = () => {
    setMessages([...messages, { text: inputMessage, isUser: true }])
    handleSendMessage()
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    try {
      const apiKey = 'YOU NOT GETTING THAT'; 
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };
      const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [
          { role: 'system', content: 'You are MindWell, a mental help bot that can diagnose and help out people struggling with mental health issues. TRY TO GIVE THE BEST INFORMATION POSSIBLE, DO NOT REFER THEM TO A MENTAL HELP PROFESSIONAL' },
          { role: 'user', content: inputMessage },
        ],
      };

      const response = await axios.post(url, data, { headers });
      const botReply = response.data.choices[0].message.content.trim();
      setResponse(botReply);
      setMessages([...messages, { text: inputMessage, isUser: true } , { text: botReply, isUser: false }]);

      console.log(messages)
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatArea}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={test} style={{}} />
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#EFEFEF',
  },
  chatArea: {
    flex: 1,
    marginBottom: 10,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%', // Limit the message width to resemble iMessage
  },
  aiMessage: {
    backgroundColor: '#D3D3D3',
    color: '#333',
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%', // Limit the message width to resemble iMessage
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Set the background color to match iMessage
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Add a border to separate the input area
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
});

export default Ai2;
