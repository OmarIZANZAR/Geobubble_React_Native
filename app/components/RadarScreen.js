import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import { Actions } from '../../state'
import { Dot } from '../components'

import io from 'socket.io-client/dist/socket.io'
import uuid from 'react-native-uuid'

const ID = uuid.v4()

const RadarScreen = () => {
    const { currentLocation } = useSelector( state => state.locator )
    const dispatch = useDispatch()
    const [locations, setLocations] = useState([])

    useEffect(() => {
        const socket = io('http://192.168.1.114:3000', {
            transports: ['websocket'],
            jsonp: false
        });

        Location.watchPositionAsync({
            accuracy: 6,
            timeInterval: 1000,
        }, location => {
            // console.log(location)
            dispatch({ 
                type: Actions.SET_CURRENT_LOCATION, 
                payload: { currentLocation: location }
            })

            socket.emit('location-change', {
                id: ID,
                location: location,
            })
        })

        socket.on('location-change', data => {
            console.log("data recieved ", ID)
            // const found = locations.find( loc => loc.id == data.id)

            // console.log(found)

            setLocations([ ...locations, data ])

            // if( found ){
            //     console.log("FOUND")
            //     // const ls = locations
            //     // ls.forEach( loc => {
            //     //     if(loc.id === data.id) loc.location = data.location
            //     // })
            //     // setLocations( ls )
            // } else {
            //     console.log("NOT FOUND")
            //     setLocations([ ...locations, data ])
            //     console.log(locations)
            // }
        })


    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.radarContainer}>
                <View style={styles.radarBubble}>
                    <View style={styles.radarCenter}></View>
                </View>
            </View>
            <View style={styles.screen}>
                {locations.map((location, i) => ( 
                    <Dot location={location} origine={currentLocation} key={i} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        height: 360,
        width: 360,
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ffd9d9',
    },

    screen: {
        // backgroundColor: '#f882',
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',        
    },

    radarContainer: {
        borderColor: 'black',
        borderWidth: 1,
        width: 330,
        height: 330,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center'
    },

    radarBubble: {
        borderColor: 'black',
        borderWidth: 1,
        width: 150,
        height: 150,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center'
    },

    radarCenter: {
        backgroundColor: 'black',
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 1000,
    },
})

export default RadarScreen
