import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons  } from '@expo/vector-icons'

import { Actions } from '../../state'

const Footer = () => {
    const { appIsSilent, appIsOff, carModeIsOn } = useSelector( state => state.appConfig )
    const { currentLocation } = useSelector(state => state.locator)
    const dispatch = useDispatch()

    function addSafeArea() {
        console.log(currentLocation)
        dispatch({
            type: Actions.SET_SAFE_AREA,
            payload: { location: currentLocation }
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={() => dispatch({type: Actions.TOGGLE_APP_IS_SILENT })}    
            >
                { appIsSilent ? (
                    <Ionicons name="notifications-off-outline" size={24} color="black" />
                ) : (
                    <Ionicons name="notifications-outline" size={24} color="black" />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => dispatch({type: Actions.TOGGLE_APP_IS_OFF })}
            >
                { appIsOff ? (
                    <MaterialCommunityIcons name="sleep" size={24} color="black" />
                ) : (
                    <MaterialCommunityIcons name="sleep-off" size={24} color="black" />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => dispatch({type: Actions.TOGGLE_CAR_MODE_IS_ON })}
            >
                { carModeIsOn ? (
                    <MaterialCommunityIcons name="steering" size={24} color="black" />
                ) : (
                    <MaterialCommunityIcons name="steering-off" size={24} color="black" />
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => addSafeArea()}
            >
                <Ionicons name="location-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },

    button: {
        width: 60,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        marginVertical: 1,
        backgroundColor: '#f88',
    },
})

export default Footer

// const [state, setState] = useState(2)
// { state === 2 && <Text style={styles.messageGreen}>You are safe</Text> }
// { state === 1 && <Text style={styles.messageWarning}>Stay Alert</Text> }
// { state === 0 && <Text style={styles.messageDanger}>Danger</Text> }

// messageGreen: {
//     color: 'green',
//     fontSize: 24,
//     fontWeight: '800',
// },

// messageWarning: {
//     color: 'orange',
//     fontSize: 24,
//     fontWeight: '800',
// },

// messageDanger: {
//     color: 'red',
//     fontSize: 24,
//     fontWeight: '800',
// },

