import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Store from './state/store';
import * as Notifications from 'expo-notifications';
import { Provider } from 'react-redux';
import { NavigationContainer }  from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Home, Settings } from './app/screens';
import { AlertModal } from './app/components';

import { setupNotifications } from './functions/notification';
import { setupLocation } from './functions/location';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tab = createMaterialTopTabNavigator();

export default function App() {

  useEffect(() => {
    setupNotifications()
    setupLocation()
  }, [])

  return (
    <NavigationContainer>
      <Provider store={Store}>

        <AlertModal />

        <Tab.Navigator initialRouteName='Home'
          sceneContainerStyle={{ backgroundColor: '#fff' }}
          tabBar={() => <></>}
        >
          <Tab.Screen name='Settings' component={Settings} />
          <Tab.Screen name='Home' component={Home} />
        </Tab.Navigator>

      </Provider>
    </NavigationContainer>
  );
}
