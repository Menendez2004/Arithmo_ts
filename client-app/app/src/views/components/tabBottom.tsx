import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


//Screens
import { InfoProfileScreen } from '../../views/profile/infoProfile';
import { SelecDificultScreen } from '../Dificults/selecDificultScreen';
import { SettingsScreen } from '../Settings/SettingsScreen';
import { PorfileUpdateScreen } from '../profile/editProfile/editiProfile';

const Tab = createBottomTabNavigator();
  export default function Navbar(){
    return (
      //@ts-ignore
        <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Profile') {
              iconName = focused
                ? 'person-circle-outline'
                : 'person-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings-outline' : 'settings-outline';
            } else if (route.name === 'Dificults') {
              iconName = focused ? 'game-controller-outline' : 'game-controller-outline';
            }
              //@ts-ignore
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#05BFDB',
          tabBarInactiveTintColor: 'white',
          tabBarStyle:{
            backgroundColor:'#136788'
          }
        })}
      >
            
                {/* @ts-ignore */}
        <Tab.Screen name="Dificults" component={SelecDificultScreen} />
        {/* @ts-ignore */}
        <Tab.Screen name="Profile" component={InfoProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>    
      );
  }