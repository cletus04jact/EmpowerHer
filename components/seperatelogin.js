import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SeparateLogin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AdvocateLogin')}
      >
        <Text style={styles.buttonText}>Advocate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00b0ff',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 200,
    height:100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    fontSize: 18,
  },
});

export default SeparateLogin;
