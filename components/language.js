import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Language = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Select Your Language</Text>

                {/* English Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LegalBot', { language: 'english' })}
                >
                    <Text style={styles.buttonText}>English</Text>
                </TouchableOpacity>

                {/* Tamil Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LegalBot', { language: 'tamil' })}
                >
                    <Text style={styles.buttonText}>Tamil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        zIndex: 2,
    },
    formContainer: {
        width: '90%',
        height: '50%',
        maxWidth: 350,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 75,
        width: 200,
        backgroundColor: '#3b82f6',
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Language;
