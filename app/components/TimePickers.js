import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    Platform,
} from 'react-native'

import { Actions } from '../../state'

const TimePickers = () => {
    const { curfewTime, curfewAlertTime } = useSelector( state => state.timeSettings )
    const dispatch = useDispatch()
    
    const [show1, setShow1] = useState( false )
    const [show2, setShow2] = useState( false )

    const onChange1 = (event, selectedTime) => {
        const currentTime = selectedTime || curfewTime
        if(!currentTime) return

        const hpt = moment( currentTime ).subtract(30, 'minutes')
        const halfpastTime = new Date( hpt )

        const fpt = moment( halfpastTime ).subtract(5, 'minutes')
        const fivepastTime = new Date( fpt )

        setShow1(Platform.OS === 'ios')

        dispatch({
            type: Actions.SET_CURFEW_TIME,
            payload: { 
                curfewTime: currentTime,
                curfewAlertTime: halfpastTime,
                curfewAlertReminder: fivepastTime,
            }
        })
    }

    const onChange2 = (event, selectedTime) => {
        const currentTime = selectedTime || curfewAlertTime
        if(!currentTime) return

        const fpt = moment( currentTime ).subtract(5, 'minutes')
        const fivepastTime = new Date( fpt )

        setShow2(Platform.OS === 'ios')

        if( currentTime < curfewTime ){    
            dispatch({
                type: Actions.SET_CURFEW_ALERT_TIME,
                payload: { 
                    curfewAlertTime: currentTime,
                    curfewAlertReminder: fivepastTime,
                }
            })
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputGroup}>
                <Text style={styles.inputText}>Set curfew time:</Text>
                <TouchableOpacity style={styles.inputSelector}
                    onPress={ () => setShow1(true) }
                >
                    <Text style={styles.inputSelectorText}>
                        { curfewTime 
                            ? moment( curfewTime ).format('HH:mm') 
                            : moment().format('HH:mm') 
                        }
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputText}>Set curfew alert time:</Text>
                <TouchableOpacity style={styles.inputSelector}
                    onPress={ () => setShow2(true) }
                >
                    <Text style={styles.inputSelectorText}>
                        { curfewAlertTime 
                            ? moment( curfewAlertTime ).format('HH:mm') 
                            : moment().format('HH:mm')   
                        }
                    </Text>
                </TouchableOpacity>
            </View>

            { show1 && (
                <DateTimePicker
                    testID="dateTimePicker1"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange1}
                />
            )}

            { show2 && (
                <DateTimePicker
                    testID="dateTimePicker2"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange2}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    inputText: {
        fontSize: 16,
        fontWeight: '600',
    },
    inputSelector: {
        backgroundColor: '#fff',
        width: 80,
        height: 60,
        marginLeft: 5,
        borderRadius: 20,
        borderColor: '#e2f3f5',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputSelectorText: {
        fontSize: 18,
        fontWeight: '700',
    },
})

export default TimePickers

