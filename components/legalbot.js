import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import lawsDataset from '..laws_datasets.json';

const LegalBot = ({ route }) => {
    const { language } = route.params;
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const getResponse = (query) => {
        // Example logic for fetching from the dataset
        const law = lawsDataset.prohibition_discrimination_laws;
        return {
            title: law.law_title[language],
            description: law.description[language]
        };
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { type: 'user', text: input.trim() };
        setMessages((prev) => [...prev, userMessage]);

        const botResponse = getResponse(input);
        const botMessage = {
            type: 'bot',
            text: `${botResponse.title}: ${botResponse.description}`
        };
        setMessages((prev) => [...prev, botMessage]);
        setInput('');
    };

    const renderMessage = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.type === 'user' ? styles.userBubble : styles.botBubble
            ]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderMessage}
                contentContainerStyle={styles.chatArea}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type your query..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    chatArea: { padding: 10 },
    messageBubble: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: '80%'
    },
    userBubble: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
    botBubble: { alignSelf: 'flex-start', backgroundColor: '#E2E2E2' },
    messageText: { fontSize: 16 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#DDD'
    },
    input: { flex: 1, padding: 10, fontSize: 16, backgroundColor: '#EEE', borderRadius: 20 },
    sendButton: { marginLeft: 10, padding: 10, backgroundColor: '#007BFF', borderRadius: 20 },
    sendButtonText: { color: '#FFF', fontSize: 16 }
});

export default LegalBot;
