import React from 'react'
import { 
    View,
    StyleSheet, 
    SafeAreaView,
    Platform, 
    StatusBar as RNStatusBar,
} from 'react-native';

import { Header, Footer, RadarScreen } from '../components';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.constainer}>
                <Header navigation={navigation} />

                <RadarScreen/>

                <Footer />
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
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#002651'
    },
    constainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f77',
        // borderColor: '#f77',
        // borderWidth: 1,
    },

    person: {
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        width: 24,
        height: 24,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 1000,
        position: 'absolute',
        top: 168,
        left: 168,
    }
})

export default Home