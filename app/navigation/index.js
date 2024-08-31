import * as React from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {userDetails} from '../context';
import LoginScreen from '../screens/GuestFlow/Login';
import RegisterScreen from '../screens/GuestFlow/Register';
import auth from '@react-native-firebase/auth';
import Home from '../screens/AuthenticatedFlow/Home';
import DashBoard from '../screens/AuthenticatedFlow/DashBoard';
import ContactUs from '../screens/AuthenticatedFlow/ContactUs';
import Profile from '../screens/AuthenticatedFlow/Profile';
import UserList from '../screens/AuthenticatedFlow/UserList';
import {Images} from '../utils/ImageList';
//icon list

//Contains List of All the navigations files here
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function AuthenticatedFlow() {
  const {setUserAuthentication} = userDetails();

  const logout = () => {
    auth()
      .signOut()
      .then(() => setUserAuthentication(false));
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route?.name) {
            case 'Home':
              return (
                <Image
                  source={Images.Home}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
              );
            case 'ContactUs':
              return (
                <Image
                  source={Images.Contact}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
              );
            case 'DashBoard':
              return (
                <Image
                  source={Images.DashBoard}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
              );
            case 'Profile':
              return (
                <Image
                  source={Images.Profile}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
              );
            case 'UsersList':
              return (
                <Image
                  source={Images.List}
                  style={{width: 18, height: 18}}
                  resizeMode="contain"
                />
              );
          }
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{paddingHorizontal: 10}}>
              <Text style={{color: 'black'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{paddingHorizontal: 10}}>
              <Text style={{color: 'black'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{paddingHorizontal: 10}}>
              <Text style={{color: 'black'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{paddingHorizontal: 10}}>
              <Text style={{color: 'black'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="UsersList"
        component={UserList}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{paddingHorizontal: 10}}>
              <Text style={{color: 'black'}}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function Navigation() {
  const {userAuthenticated, setUserAuthentication, setUserData} = userDetails();
  function onAuthStateChanged(user) {
    if (user) {
      setUserAuthentication(true);
      setUserData(user);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, []);
  if (userAuthenticated === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading Application</Text>
      </View>
    );
  }
  //Contains Authenticated Screens and Non Authenticated Screens on the basis of flag 'userAuthenticated'
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userAuthenticated ? (
          <Stack.Screen
            name="AuthenticatedFlow"
            component={AuthenticatedFlow}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
