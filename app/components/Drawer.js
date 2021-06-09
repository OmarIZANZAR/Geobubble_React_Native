import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Dot from './Dot'

const Drawer = ({ dots }) => {
    
    
    return (
        <>
            {dots.map((dot, i) => ( 
                <Dot px={dot.x} py={dot.y} key={i} /> 
            ))}
        </>
    )
}

export default Drawer

const styles = StyleSheet.create({})
