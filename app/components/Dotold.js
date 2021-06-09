import React, { useRef, useEffect, useState } from "react";
import { 
    Animated, 
    View,
    StyleSheet, 
    LayoutAnimation, 
    Platform, 
    UIManager,
    PanResponder,
    Text,
} from "react-native";

const Dot = ({ location }) => {

  const pan = useRef(new Animated.ValueXY({ x: 180, y: 180})).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([ 
        null, 
        { 
          dx: pan.x,
          dy: pan.y, 
        } 
      ]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
      <Animated.View
        style={{ transform: [
          { translateX: pan.x }, 
          { translateY: pan.y }
        ]}}
        {...panResponder.panHandlers}
      >
        <View style={styles.person} />
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  person: {
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 1000,
    // position: 'absolute',
    // top: -100,
    // left: -50
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 20,
    width: 20,
    backgroundColor: "blue",
    borderRadius: 5
  }
});


// // if (
// //   Platform.OS === "android" &&
// //   UIManager.setLayoutAnimationEnabledExperimental
// // ) {
// //   UIManager.setLayoutAnimationEnabledExperimental(true);
// // }

// // const Dot = ({ px, py }) => {
// //   const [ offsets, setOffsets ] = useState({ x: px, y: py })
// //   // const [ rayon, setRayon ] = useState(100)
// //   // const [ angle, setAngle ] = useState(0)

// //   LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)

// //   useEffect(() => {
// //     setOffsets({ x: px, y: py })
// //   }, [px, py])

// //   return (
// //       <View style={{ top: offsets.x, bottom: offsets.y }} >
// //         <View style={styles.dot} />
// //       </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         alignItems: "center",
// //         justifyContent: "center"
// //     },
// //     dot: {
// //         backgroundColor: '#fff',
// //         borderWidth: 1,
// //         width: 24,
// //         height: 24,
// //         borderRadius: 1000,
// //     }
// // });

export default Dot;