import React, { useRef, useEffect, useState } from "react";
import { 
    Animated,
    View,
    StyleSheet, 
    LayoutAnimation, 
    Platform, 
    UIManager,
} from "react-native";

import { getDistance } from 'geolib'

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Dot = ({ location, origine }) => {
  const [position, setPosition] = useState({ x: 180-15 , y: 180-15 })

  useEffect(() => {
    if( !origine?.coords ) return
    const R = getDistance(
      { 
        latitude: location.location.coords.latitude, 
        longitude: location.location.coords.longitude, 
      },
      { 
        latitude: origine.coords.latitude, 
        longitude: origine.coords.longitude, 
      },
      0.1
    )

    const dy = getDistance(
      { 
        latitude: location.location.coords.latitude, 
        longitude: 0, 
      },
      { 
        latitude: origine.coords.latitude, 
        longitude: 0, 
      },
      0.1
    )

    const dx = getDistance(
      { 
        latitude: 0, 
        longitude: location.location.coords.longitude, 
      },
      { 
        latitude: 0, 
        longitude: origine.coords.longitude, 
      },
      0.1
    )

    const MAX_DISTANCE = 10
    const SCREEN_RADIUS = 180
    const RATIO = MAX_DISTANCE / SCREEN_RADIUS // m/px

    if( true ) {
      let x, y;

      let dxp = Math.round( dx / RATIO )
      let dyp = Math.round( dy / RATIO )
      if( location.location.coords.longitude > origine.coords.longitude ) {
        // he is in my right
        x = 180 + dxp
      } else {
        // he is in my left
        x = 180 - dxp
      }

      if( location.location.coords.latitude > origine.coords.latitude ) {
        // he is in my north
        y = 180 + dyp
      } else {
        // he is in my south
        y = 180 - dyp
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
      setPosition({ x: x , y: y })
    }

  }, [location, origine])

  if(position) {
    return (
      <View
        style={{ top: position.y , left: position.x }}
      >
        <View style={styles.person} />
      </View>
    );
  }

  return null  
}

const styles = StyleSheet.create({
  person: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    width: 30,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 1000,
  },
});

export default Dot;

  // {
  //   id: 12345,
  //   location: {
  //       coords: {
  //           accuracy: 7.142000198364258,
  //           altitude: 592.6494616383839,
  //           altitudeAccuracy: 3,
  //           heading: 214.626953125,
  //           latitude: 32.2146776,
  //           longitude: -6.5852355,
  //           speed: 1.236289267505619e-15,
  //       },
  //       mocked: false,
  //       timestamp: 1623179627000,
  //   }
  // }

  // 1m == 30px
  // circle 2m === 75px from center
  // circle 5m === 165px from center
  // screen === 180px from center