import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const HomePage = () => {

  const handleGetStarted = () => {
    // Navigate to the next screen when the "Get Started" button is pressed
    // You can implement your navigation logic here
  };

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <Image source={require('../../assets/logonotext.png')} style={styles.image}/> 

      <View style={styles.container}>
        <Text style={styles.appTitle}>MindWell</Text>
        <Text style={styles.appSubtitle}>Nuturing Minds, Empowering Lives</Text>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image : {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: -100,
    marginTop: -200
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  appSubtitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 30,
  },
  getStartedButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  getStartedButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomePage;
