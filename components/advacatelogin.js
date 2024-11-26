import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Ensure the correct path to advocates.json
import advocates from '../data/advocates.json';

const LoginAdvocate = ({ navigation }) => {
  const [advocateId, setAdvocateId] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!advocateId.trim()) {
      alert('Please enter a valid Advocate ID.');
      return;
    }

    const advocate = advocates.find((adv) => adv.id === parseInt(advocateId));
    if (advocate) {
      navigation.navigate('Advocate', { advocate }); // Pass the advocate data to the Advocate screen
    } else {
      alert('No advocate found with this ID.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Advocate Login</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter Advocate ID"
        keyboardType="numeric"
        value={advocateId}
        onChangeText={(text) => setAdvocateId(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
        />
        <Ionicons
          name={passwordVisible ? 'eye' : 'eye-off'}
          style={styles.icon}
          size={24}
          color="gray"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  icon: {
    marginLeft: -30,
  },
  loginButton: {
    backgroundColor: '#00b0ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginAdvocate;
