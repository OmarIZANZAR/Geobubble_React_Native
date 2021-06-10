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
            <View style={styles.container}>

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
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home