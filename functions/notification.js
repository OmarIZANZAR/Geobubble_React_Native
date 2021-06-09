import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// REQUESTING PERMISSIONS AND REGISTERING FOR PUSH NOTIFICATIONS:
export async function setupNotifications() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
  
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      alert('permission to notifications is not granted');
      return;
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
}

// SCHEDULE NOTIFICATION:
export async function scheduleNotification(title, message, time) {
    let trigger
    if(Platform.OS === 'ios'){
        trigger = {
            type: 'calendar' ,
            repeats: true ,
            dateComponents: {
                hour: time.hour ,
                minute: time.min ,
            }
        }
    }else{
        trigger = { 
            type: 'daily',
            hour: time.hour,
            minute: time.min,
        }
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            subtitle: 'Alert',
            body: message,
            badge: 1,
        },
        trigger,
    });
}

// IMMEDIATELY FIRE A NOTIFICATION:
export async function fireNotification(title, message) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            subtitle: 'Alert',
            body: message,
            badge: 1,
        },
        trigger: null,
    });
}