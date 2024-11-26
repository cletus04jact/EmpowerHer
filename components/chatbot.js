import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const LegalBotMain = () => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hello! I can help you with information about women's legal rights in India. What would you like to know?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef();

    // Auto-scroll to the latest message
    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => {
                scrollViewRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (userInput.trim() === '' || isLoading) return;

        const userMessage = userInput.trim();
        setUserInput('');
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://10.0.48.28:8081/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (response.ok) {
                const botResponse = data.response?.main_response || "I'm sorry, but I couldn't fetch a proper response.";
                setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
            } else {
                throw new Error(data.error || 'Failed to get response from the server');
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
            setMessages(prev => [...prev, {
                type: 'bot',
                text: 'I encountered an error while processing your request. Please try again later.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <Text style={styles.title}>LEGAL BOT</Text>
                <Text style={styles.subtitle}>Women's Rights Assistant</Text>
            </View>

            <ScrollView 
                ref={scrollViewRef}
                style={styles.chatContainer}
                contentContainerStyle={styles.chatContentContainer}
            >
                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            message.type === 'bot' ? styles.chatBubbleBot : styles.chatBubbleUser,
                        ]}
                    >
                        <Text style={message.type === 'bot' ? styles.botText : styles.userText}>
                            {message.text}
                        </Text>
                    </View>
                ))}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#00e5ff" />
                        <Text style={styles.loadingText}>Analyzing your question...</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Ask about women's rights..."
                    placeholderTextColor="#666"
                    value={userInput}
                    onChangeText={setUserInput}
                    onSubmitEditing={handleSendMessage}
                    returnKeyType="send"
                    editable={!isLoading}
                    multiline
                />
                <TouchableOpacity 
                    style={[styles.sendButton, (!userInput.trim() || isLoading) && styles.sendButtonDisabled]}
                    onPress={handleSendMessage}
                    disabled={!userInput.trim() || isLoading}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
    },
    subtitle: {
        fontSize: 14,
        color: '#6C757D',
        marginTop: 4,
    },
    chatContainer: {
        flex: 1,
        padding: 16,
    },
    chatContentContainer: {
        paddingVertical: 10,
    },
    chatBubbleBot: {
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        padding: 12,
        marginVertical: 5,
        maxWidth: width * 0.75,
        alignSelf: 'flex-start',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    chatBubbleUser: {
        backgroundColor: '#00e5ff',
        borderRadius: 20,
        padding: 12,
        marginVertical: 5,
        maxWidth: width * 0.75,
        alignSelf: 'flex-end',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    botText: {
        color: '#212529',
        fontSize: 16,
        lineHeight: 22,
    },
    userText: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 22,
    },
    messageInputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E9ECEF',
        alignItems: 'flex-end',
    },
    messageInput: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        fontSize: 16,
        maxHeight: 100,
        color: '#212529',
    },
    sendButton: {
        backgroundColor: '#00e5ff',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#CED4DA',
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    loadingText: {
        marginLeft: 8,
        color: '#6C757D',
        fontSize: 14,
    },
});

export default LegalBotMain;
