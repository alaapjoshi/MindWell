import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, TextInput } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_APIKEY",
  authDomain: "YOUR_FIREBASE_AUTHDOMAIN",
  projectId: "YOUR_FIREBASE_PROJECTID",
  storageBucket: "YOUR_FIREBASE_STORAGEBUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGINGSENDERID",
  appId: "YOUR_FIREBASE_APPID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default function MoodTrackerPage({ navigation }) {
  const [mood, setMood] = useState('');
  const [text, setText] = useState('Enter a note about today');

  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodSelection = async (selectedMood) => {
    setMood(selectedMood);

  };

  const submit = async () => {
    const newMoodEntry = {

    };
  
    try {
      const docRef = await addDoc(collection(db, "users"), {
        id: new Date().getTime(),
        mood: mood,
        date: new Date().toDateString(),
        note: text, // Include the note data here
      });
    
      console.log("Document written with ID: ", docRef.id);
      // Save to AsyncStorage (optional, if you want to keep the local storage)
      //const updatedMoodHistory = [...moodHistory, newMoodEntry];
      //await AsyncStorage.setItem('@moodtracker:moodHistory', JSON.stringify(updatedMoodHistory));
      //setMoodHistory(updatedMoodHistory);
  
      // Save to Firestore
    } catch (error) {
      console.error('Error saving mood history', error);
    }
  }

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      const storedMoodHistory = await AsyncStorage.getItem('@moodtracker:moodHistory');
      if (storedMoodHistory) {
        setMoodHistory(JSON.parse(storedMoodHistory));
      }
    } catch (error) {
      console.error('Error loading mood history', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 20}}/> 

      <Text style={styles.heading}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        <TouchableOpacity
          style={[styles.mood, mood === 'Happy' && styles.selected]}
          onPress={() => handleMoodSelection('Happy')}
        >
          <Text style={styles.moodText}>😄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mood, mood === 'Neutral' && styles.selected]}
          onPress={() => handleMoodSelection('Neutral')}
        >
          <Text style={styles.moodText}>😐</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.mood, mood === 'Sad' && styles.selected]}
          onPress={() => handleMoodSelection('Sad')}
        >
          <Text style={styles.moodText}>😢</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.selectedMoodText}>
        {mood ? `You are feeling ${mood}` : 'Please select your mood'}
      </Text>

      <TextInput
      label="Note"
      value={text}
      onChangeText={text => setText(text)}
      style={styles.textInput}

    />
    <View style={{marginBottom: 20}}/> 


<Button icon="upload" mode="contained" onPress={() => submit()}>
    Submit
    </Button>

    <View style={{marginBottom: 250}}/> 

    <View style={styles.moodContainer}> 
    <View style={{paddingHorizontal: 80}}> 

    </View>
    <Button style={styles.view} icon="calendar-range" mode="contained" onPress={() => navigation.navigate('View Mood')}>
    View old data
    </Button>
    </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  view : {
    marginBottom: 15

  },

  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  mood: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: 10
  },
  moodText: {
    fontSize: 50,
  },
  textInput : {
    width: 300
  },
  selected: {
    backgroundColor: '#e6e6e6',
  },
  selectedMoodText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moodItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
