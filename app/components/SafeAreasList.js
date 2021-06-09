import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Actions } from '../../state'

const SafeAreasList = () => {
    const { safeAreas } = useSelector(state => state.location)
    const dispatch = useDispatch()

    const toggleIsHome = (id) => {
        dispatch({
            type: Actions.TOGGLE_IS_HOME,
            payload: { areaId: id }
        })
    }
    
    const deleteArea = (id) => {
        dispatch({
            type: Actions.UNSET_SAFE_AREA,
            payload: { areaId: id }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Safe areas:</Text>

            <ScrollView>
                { safeAreas.map( (area, id) => (
                    <View style={styles.card} key={id}>
                        <Text style={styles.cardText}>Area { id + 1 }</Text>

                        <TouchableOpacity style={styles.cardBtn}
                            onPress={() => toggleIsHome(id) }
                        >
                            { area.isHome 
                                ? <AntDesign name="home" size={24} color="#21e6c1" />
                                : <MaterialCommunityIcons name="home-plus-outline" size={24} color="black" />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cardBtn}
                            onPress={() => deleteArea(id)}
                        >
                            <AntDesign name="delete" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },

    card: {
        width: '100%',
        height: 60,
        borderRadius: 20,
        borderColor: '#e2f3f5',
        borderWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
        marginVertical: 5,
        backgroundColor: '#fff',
    },

    cardText: {
        fontSize: 18,
        fontWeight: '700',
    },

    cardBtn: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default SafeAreasList
