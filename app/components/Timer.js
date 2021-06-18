import React, { useEffect } from 'react'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

import { Actions } from '../../state'
import { fireNotification } from '../../functions/notification'

const Timer = () => {
    const { currentTime } = useSelector( state => state.timer )
    const { appIsSilent, appIsOff } = useSelector( state => state.appConfig )
    const { 
        curfewTime, 
        curfewAlertTime, 
        curfewAlertReminder 
    } = useSelector( state => state.timeSettings )
    const dispatch = useDispatch()

    useEffect(() => {
        let ct = moment(curfewTime).format('HH:mm:00')
        let cat = moment(curfewAlertTime).format('HH:mm:00')
        let car = moment(curfewAlertReminder).format('HH:mm:00')
        
        const interval = setInterval(() => {
            let time = new Date();
            let now = moment(time).format('HH:mm:ss');
            
            if( !appIsOff ){
                (async () => {
                    if( now === car ){
                        
                        await fireNotification('Curfew time reminder', 'hey, curfew time is almost here ⏰')
    
                    } else if( now === cat ){
    
                        if( !appIsSilent ){
                            dispatch({
                                type: Actions.OPEN_MODAL,
                                payload: { activeType: 'curfewReminder' }
                            })
                        }
    
                        await fireNotification('Curfew time reminder', 'hey, curfew time is almost here ⏰')
    
                    } else if( now === ct ){
    
                        if( !appIsSilent ){
                            
                            dispatch({
                                type: Actions.OPEN_MODAL,
                                payload: { activeType: 'curfewTime' }
                            })
                        }
    
                        await fireNotification('Curfew time', 'hey, curfew time is here ☠️ go home')
    
                    }
                })()
            }

            dispatch({
                type: Actions.SET_CURRENT_TIME,
                payload: { currentTime: time }
            })

            return () => clearInterval( interval )
        }, 1000);
    }, [curfewTime, curfewAlertTime, appIsSilent, appIsOff])

    return (
        <View style={styles.timer}>
            <Text style={styles.timerTxt}>
                { currentTime
                    ? moment( currentTime ).format('HH:mm:ss')
                    : 'time!'
                }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    timer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 100,
    },
    
    timerTxt: {
        fontWeight: '700',
        fontSize: 18,
    }
})

export default Timer

