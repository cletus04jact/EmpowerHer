// Login.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Ensure you have this installed

const Login = ({ navigation }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    setWidth(screenWidth);
    setHeight(screenHeight);
  }, []);

  const handleLogin = () => {
    navigation.navigate('GuidingMethod'); // Navigate to the Guiding screen
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Ionicons name="eye-off" style={styles.icon} size={24} color="gray" />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity>
          <Ionicons name="logo-facebook" size={24} color="#424242" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="logo-instagram" size={24} color="#424242" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="logo-twitter" size={24} color="#424242" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  circle1: {
    position: 'absolute', 
    width: 150,
    height: 150,
    backgroundColor: '#80d8ff',
    borderRadius: 75,
    top: '5%',
    right: '50%',
    opacity: 0.2, 
  },
  circle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#80d8ff',
    borderRadius: 50,
    top: '60%',
    right: '-30%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputField: {
    width: '80%',
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#80d8ff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordContainer: {
    position: 'relative',
    width: '80%',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
  loginButton: {
    backgroundColor: '#00b0ff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signupText: {
    color: '#424242',
    marginTop: 16,
  },
  signupLink: {
    color: '#00b0ff',
    textDecorationLine: 'underline',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
});

export default Login;
