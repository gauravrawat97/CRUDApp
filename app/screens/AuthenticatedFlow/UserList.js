import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import {API_ENDPOINT} from '../../config/BaseUrls';
//Here the list of registered user from firebase are shown. I have used firebase function here to fetch detail from firebase auth. I have used firebase-admin here. Please replace the url with your own function if you want to use it.
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        API_ENDPOINT.getRegisteredUsers, //Note: Use your own firebase function
      );
      const data = await response.json();
      setLoaded(true);
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', 'Error fetching users: ' + error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  if (!loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.textStyle}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Users List</Text>
      {users.map(user => (
        <Text style={styles.userItem} key={user.uid}>
          {user.email || 'No Email'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  textStyle: {
    fontSize: 15,
    color: 'black',
  },
  userItem: {
    fontSize: 15,
    color: 'black',
    paddingVertical: 5,
  },
});

export default UserList;
