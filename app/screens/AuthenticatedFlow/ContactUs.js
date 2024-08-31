import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {userDetails} from '../../context';
import auth from '@react-native-firebase/auth';
//This Component Allow user to change his nickname
const ContactUs = () => {
  const {userData, setUserData} = userDetails();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setName(userData?.displayName);
    setEmail(userData?.email);
  }, [userData]);

  const handleSubmit = async () => {
    //Getting logged in user information and updating his name.
    const user = auth().currentUser;

    try {
      await user.updateProfile({
        displayName: name || user.displayName,
      });
      setUserData({email: email, displayName: name});
    } catch (error) {
      Alert.alert('Update Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardShouldPersistTaps="always"
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formCard}>
          <Text style={styles.header}>Update Contact Info</Text>
          <TextInput
            style={[styles.input, {backgroundColor: '#D3D3D3'}]}
            placeholder="Email"
            value={email}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Update Name</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: 'black',
  },
  button: {
    backgroundColor: '#6200ee', // Primary color
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactUs;
