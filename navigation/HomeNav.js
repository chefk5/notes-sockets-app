import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Add from '../screens/Add';
import AddNote from '../screens/AddNote';
import AddUser from '../screens/AddUser';
import EditDeleteNote from '../screens/EditDeleteNote';
import Home from '../screens/Home';
import ViewEdit from '../screens/ViewEdit';



const Stack = createStackNavigator();

const HomeNav = () => {
  return (
      <Stack.Navigator mode="modal">
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          headerShown: true,
          headerTitle: false,
          headerStyle: {
            backgroundColor: '#000000',
            shadowColor: 'transparent',

          }
          
          }} />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{
          title: 'Add Note',
          headerStyle: {
            backgroundColor: '#000000',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}

        />
          <Stack.Screen 
          name="ViewEdit" 
          component={ViewEdit}
          options={{
            headerTitle:false,
            headerStyle: {
              backgroundColor: '#000000',
              shadowColor: 'transparent',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />

      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{
          headerTitle: false,
          headerLeft: () => {
            return null;
          },
          headerStyle: {
            backgroundColor: '#000000',
            shadowColor: 'transparent',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />

      </Stack.Navigator>
  );
}

export default HomeNav;