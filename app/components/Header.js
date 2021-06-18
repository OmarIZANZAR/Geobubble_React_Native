import React from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

import Timer from './Timer'

import { setupLocation } from '../../functions/location';

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight
                underlayColor='#ffd9d9'
                style={styles.button} 
                onPress={() => navigation.navigate('Settings')}
            >
                <Feather name="settings" size={35} color="black" />
            </TouchableHighlight>

            <Timer />

            <TouchableHighlight 
                underlayColor='#ffd9d9'
                style={styles.button}
                onPress={() => setupLocation()}
            >
                <MaterialIcons name="my-location" size={35} color="black" />
                
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        position: 'absolute',
        top: 0,
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#f79'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 100
    },
})

export default Header
