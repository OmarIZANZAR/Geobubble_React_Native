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

const AreaDiameterPicker = () => {
    const inputRef = useRef()
    const { safeAreaDiameter } = useSelector(state => state.location)
    const dispatch = useDispatch()

    const onChangeText = (text) => {
        dispatch({ 
            type: Actions.SET_SAFE_AREA_DIAMETER, 
            payload: { safeAreaDiameter: text },
        })
    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.inputText}>Set safe area diameter:</Text>
            <Pressable 
                style={styles.inputSelector}
                onPress={focusInput}
            >
                <TextInput
                    ref={inputRef}
                    style={styles.inputSelectorText}
                    onChangeText={onChangeText}
                    value={ `${safeAreaDiameter}` }
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
        fontSize: 18,
        fontWeight: '600',
    },
    inputSelector: {
        backgroundColor: '#fff',
        width: 80,
        height: 60,
        marginLeft: 10,
        borderRadius: 20,
        borderColor: '#e2f3f5',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputSelectorText: {
        // width: '100%',
        // minWidth: '70%',
        height: '100%',
        // backgroundColor: '#888',
        borderRadius: 20,
        fontSize: 18,
        fontWeight: '700',
    },
})

export default AreaDiameterPicker

