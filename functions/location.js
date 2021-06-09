import * as Location from 'expo-location'

export async function setupLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') return 0
    
    return 1
}