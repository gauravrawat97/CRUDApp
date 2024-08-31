import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {userDetails} from '../../context';
//First Screen that is opened when user is authenticated. A simple If condition is used if user nick is set it will be displayed else a message to let user change his nick will be shown
const Home = () => {
  const {userData} = userDetails();
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        {userData?.displayName
          ? `Hi ${userData?.displayName}!`
          : `Hey ${userData?.email} ,Looks like you haven't updated your nick name..go to Contact Us !`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
});

export default Home;
