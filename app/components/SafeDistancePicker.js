import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    Pressable,
} from 'react-native'

import { Actions } from '../../state'

const SafeDistancePicker = () => {
    const inputRef = useRef()
    const { safeDistance } = useSelector(state => state.locationSettings)
    const dispatch = useDispatch()

    const onChangeText = (text) => {
        dispatch({ 
            type: Actions.SET_SAFE_DISTANCE, 
            payload: { safeDistance: text },
        })
    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.inputText}>Set safe distance (m):</Text>
            <Pressable 
                style={styles.inputSelector}
                onPress={focusInput}
            >
                <TextInput
                    ref={inputRef}
                    style={styles.inputSelectorText}
                    onChangeText={onChangeText}
                    value={ `${safeDistance}` }
                    keyboardType="numeric"
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        marginLeft: 4,
        borderRadius: 20,
        borderColor: '#e2f3f5',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSelectorText: {
        height: '100%',
        borderRadius: 20,
        fontSize: 18,
        fontWeight: '700',
    },
})

export default SafeDistancePicker

