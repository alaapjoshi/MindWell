
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const CapabilitiesPage = () => {
    function handleGetStarted() {

    }
    return (

    <ImageBackground source={require('../../assets/background.png')} style={styles.backgroundImage}>
        <Image source={require('../../assets/logonotext.png')} style={styles.image}/> 

      <View style={styles.container}>
        <Text style={styles.appTitle}>The Mindwell Discord Bot 🤖</Text>
        <Text style={styles.appSubtitle}>The key to ending toxicity</Text>
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
    fontSize: 30,
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

export default CapabilitiesPage;
