import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const imageMap = {
  'profile1.png': require('../assets/profile.png'),
  'profile2.png': require('../assets/profile.png'),
  'profile3.png': require('../assets/profile.png'),
  'profile4.png': require('../assets/profile.png'),
  'profile5.png': require('../assets/profile.png'),
  'profile6.png': require('../assets/profile.png'),
  'profile7.png': require('../assets/profile.png'),
  'profile8.png': require('../assets/profile.png'),
  'profile9.png': require('../assets/profile.png'),
  'profile10.png': require('../assets/profile.png'),
};

const Advocate = ({ route }) => {
  const { advocate } = route.params; // Get advocate data passed from LoginAdvocate

  // Ensure feedback is an array before calling .map()
  const feedback = Array.isArray(advocate.feedback) ? advocate.feedback : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        {/* Use the mapped image */}
        <Image
          source={imageMap[advocate.profileImage] || require('../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.title}>{advocate.name.toUpperCase()}</Text>

        {/* Star Rating */}
        <View style={styles.rating}>
          {Array(advocate.rating)
            .fill(0)
            .map((_, index) => (
              <Image
                key={index}
                source={require('../assets/star.png')}
                style={styles.star}
              />
            ))}
        </View>

        {/* Advocate Information */}
        <Text style={styles.info}>Experience: {advocate.experience}</Text>
        <Text style={styles.info}>Location: {advocate.location}</Text>
        <Text style={styles.info}>
          Cases Solved: {advocate.pastCasesSolved}
        </Text>
        <Text style={styles.info}>
          Specialized Area: {advocate.specializedArea.join(', ')}
        </Text>
      </View>

      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>Feedback</Text>
        {feedback.length > 0 ? (
          feedback.map((item, index) => (
            <View key={index} style={styles.feedbackBox}>
              <Text style={styles.feedbackUser}>{item.user}</Text>
              <View style={styles.rating}>
                {Array(item.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Image
                      key={i}
                      source={require('../assets/star.png')}
                      style={styles.star}
                    />
                  ))}
              </View>
              <Text style={styles.feedbackComment}>{item.comment}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noFeedback}>No feedback available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  star: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  feedbackSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackBox: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  feedbackUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  feedbackComment: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noFeedback: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Advocate;
