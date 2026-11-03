
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import StudentList from './screens/StudentList';
import AdminLogin from './screens/AdminLogin';
import AdminProfile from './screens/AdminProfile';
import AddStudent from './screens/AddStudent';
import EditStudent from './screens/EditStudent';
import RoomView from './screens/RoomView';
import RoomProfile from './screens/RoomProfile';
import DormHistory from './screens/DormHistory';
import colors from './theme/colors';
import { admins } from './services/adminUser';

const Stack = createStackNavigator();
const DOM_URL = 'https://entry.wu.ac.th/apply/home_studentnew.asp?v=1';

export default function App() {
  const [admin, setAdmin] = useState(null);

  const login = (username, password) => {
    const user = admins.find(
      a => a.username === username.trim() && a.password === password.trim()
    );
    if (!user) throw new Error('invalid');
    setAdmin(user);
    return user;
  };
  const logout = () => setAdmin(null);

  const auth = useMemo(() => ({ admin, login, logout }), [admin]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={admin ? 'app' : 'auth'}
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '800' },
        }}
      >
        {!admin ? (
          <Stack.Screen name="AdminLogin" options={{ title: 'Admin Login' }}>
            {props => <AdminLogin {...props} auth={auth} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(DOM_URL)}
                    style={{ paddingRight: 16 }}
                    hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                  >
                    <Image
                      source={require('./assets/WU_Alternative_Logo.svg.png')}
                      style={{ width: 48, height: 32, borderRadius: 6 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="StudentList" component={StudentList} options={{ title: 'All Students' }} />
            <Stack.Screen name="AdminProfile" options={{ title: 'Admin' }}>
              {props => <AdminProfile {...props} auth={auth} />}
            </Stack.Screen>
            <Stack.Screen name="AddStudent" component={AddStudent} options={{ title: 'Add Student' }} />
            <Stack.Screen name="EditStudent" component={EditStudent} options={{ title: 'Edit Student' }} />
            <Stack.Screen name="RoomView" component={RoomView} options={{ title: 'Rooms' }} />
            <Stack.Screen name="RoomProfile" component={RoomProfile} options={{ title: 'Room Profile' }} />
            <Stack.Screen name="DormHistory" component={DormHistory} options={{ title: 'Dorm History' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
