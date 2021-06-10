import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    Platform, 
    StatusBar as RNStatusBar,
    TouchableOpacity,
} from 'react-native'

import { 
    TimePickers, 
    AreaDiameterPicker, 
    SafeAreasList 
} from '../components'

import { AntDesign } from '@expo/vector-icons'

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity style={styles.headBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.headBtnText}>Go to home</Text>
                        <AntDesign name="arrowright" size={30} color="black" />
                    </TouchableOpacity>
                </View>
        
                <View style={styles.forms}> 
                    <TimePickers />
                    <AreaDiameterPicker />
                    <SafeAreasList />
                </View>

                <View style={styles.foot}>
                    <Text style={styles.footText}>By JoyCodes</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : null ,
        paddingHorizontal: 20,
        paddingBottom: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f77',
    },

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    head: {
        width: '100%', 
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'flex-end',      
    },

    headBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 50,
        borderRadius: 100,
    },

    headBtnText: {
        marginRight: 5,
        fontWeight: '700',
        fontSize: 18
    },

    forms: {
        flex: 1,
        width: '100%',
    },

    foot: {
        width: '100%', 
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
    },

    footText: {
        fontWeight: '700',
        fontSize: 18
    }

})

export default Settings

