import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Audio } from 'expo-av'
import { 
    StyleSheet, 
    Text, 
    View, 
    Modal,
    Image,
    TouchableOpacity,
} from 'react-native'

import { Actions } from '../../state'
import { maskImg, timerImg, warningImg, distanceImg } from '../../assets'

const AlertModal = () => {
    const { isVisible, activeType } = useSelector(state => state.modal)
    const { sound } = useSelector( state => state.sound )
    const dispatch = useDispatch()

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/audio/purge.mp3')
        )

        dispatch({
            type: Actions.LOAD_SOUND,
            payload: { sound }
        })

        await sound.setIsLoopingAsync(true)
        await sound.playAsync()
    }

    useEffect(() => {  
        return sound ? () => { 
            sound.unloadAsync()
        } : undefined;
    }, [ sound ])

    useEffect(() => {
        if(isVisible){ playSound() }
    }, [isVisible])

    const closeModal = async (response) => {
        dispatch({
            type: Actions.CLOSE_MODAL,
            payload: { response }
        })

        await sound.stopAsync()
    }

    let data = { title: '', text: '', image: warningImg }

    switch(activeType) {
        case 'mask': 
            data = {
                title: 'Mask reminder',
                text: '☠️ did you wear your mask?',
                image: maskImg,
            };
            break;

        case 'curfewTime':
            data = {
                title: 'Curfew time',
                text: 'Curfew time is here ⏰, go home now ☠️',
                image: timerImg,
            };
            break;

        case 'curfewReminder':
            data = {
                title: 'Curfew time reminder',
                text: 'Curfew almost here ⏰, prepare to go home',
                image: timerImg,
            };
            break;

        case 'distance':
            data = {
                title: 'Distance alert',
                text: 'keep a 1.5m distance away from others ☠️',
                image: distanceImg,
            };
            break;

        default:
            data = {
                title: 'Danger alert',
                text: 'something is off!',
                image: warningImg,
            };
            break; 
    }
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => closeModal(false) }
        >
            <View style={styles.container}>
                <View style={styles.modalView}>

                    <View style={styles.head}>
                        <Image source={data.image} style={styles.image} resizeMode='contain' />
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.title}>{ data.title }</Text>
                        <Text style={styles.text}>{ data.text }</Text>
                        <View style={styles.foot}>
                            <TouchableOpacity style={styles.buttonNo}
                                onPress={() => {
                                    closeModal(false)
                                }}
                            >
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonYes}
                                onPress={() => {
                                    closeModal(true)
                                }}
                            >
                                <Text style={styles.buttonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },  
    head: {
        width: 300,
        height: 200,
        padding: 20,
        // backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    body: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ff7',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    foot: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    buttonYes: {
        width: 60,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 1,
        backgroundColor: '#22eaaa',
    },
    buttonNo: {
        width: 60,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 1,
        backgroundColor: '#fcb1b1',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
    }
})

export default AlertModal
