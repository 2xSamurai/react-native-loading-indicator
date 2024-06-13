import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";


const Style01 = ({
	indicatorStyle = {}, 
	duration = 1200, 
	bezierFn = {
		x1: 0.37,
		y1: 0, 
		x2: 0.63, 
		y2: 1,
	},
	iterations = -1,
	callback = () => {},
}) => {

	const progress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		progress.setValue(0);
		startAnimation();
	}, [indicatorStyle, duration, bezierFn, iterations, callback]);

  const startAnimation = () => {
    Animated.timing(progress, {
		toValue: 1,
		duration: duration,
		useNativeDriver: true,
		easing: Easing.inOut(Easing.bezier(bezierFn?.x1, 
			bezierFn?.y1, 
			bezierFn?.x2, 
			bezierFn?.y2),
		),
	  	iterations: iterations
    }).start(callback);
  };
  const rotateX = progress.interpolate({
	inputRange: [0, 0.5, 1],
	outputRange: ['0deg', '-180deg', '-180deg'], 
    extrapolate: 'clamp', 
	
  });

const rotateY = progress.interpolate({
	inputRange: [0, 0.5, 1],
	outputRange: ['0deg', '0deg', '-180deg'],
    extrapolate: 'clamp', 
});


	return <Animated.View style={[
			styles.indicator, 
			{
				width: indicatorStyle?.width,
				height: indicatorStyle?.height,
				transform: [{perspective: 120}, {rotateX: rotateX}, {rotateY: rotateY}],
			},
			indicatorStyle
		]}></Animated.View>
};

export default Style01;

const styles = StyleSheet.create({
	indicator: {
		backgroundColor :'white',
	},
});
