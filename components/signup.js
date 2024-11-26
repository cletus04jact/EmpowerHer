import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For icons

const { width, height } = Dimensions.get('window'); // Get device dimensions for positioning

const SignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Background circles */}
            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />
            
            {/* Sign up form */}
            <View style={styles.formContainer}>
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Full name" 
                        style={styles.input} 
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Email" 
                        keyboardType="email-address" 
                        style={styles.input} 
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Password" 
                        secureTextEntry={!passwordVisible} 
                        style={styles.input} 
                    />
                    <TouchableOpacity 
                        style={styles.iconContainer} 
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <Icon 
                            name={passwordVisible ? 'eye' : 'eye-slash'} 
                            size={20} 
                            color="#777" 
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Already have an account? 
                    <Text style={styles.linkText}> Login</Text>
                </Text>

                {/* Social media icons */}
                <View style={styles.socialContainer}>
                    <TouchableOpacity>
                        <Icon name="facebook" size={30} color="#777" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="instagram" size={30} color="#777" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="twitter" size={30} color="#777" />
                    </TouchableOpacity>
                </View>
            </View>
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
    circle: {
        position: 'absolute',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: '#80d8ff',
        opacity: 0.7,
    },
    circle1: {
        width: 300,
        height: 300,
        top: -90,
        left: -100,
    },
    circle2: {
        width: 300,
        height: 300,
        bottom: 50,
        right: -30,
    },
    formContainer: {
        width: '90%',
        maxWidth: 350,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#80d8ff',
        backgroundColor: '#fff',
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    button: {
        backgroundColor: '#0288d1',
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        color: '#777',
        marginTop: 15,
    },
    linkText: {
        color: '#0288d1',
        fontWeight: 'bold',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        spaceBetween: 10,
    },
});

export default SignUp;
