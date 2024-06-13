import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing, View } from "react-native";


const Style02 = ({
	loading = false, 
	indicatorStyle = {}, 
	duration = 2000, 
	bezierFn = {
		x1: 0.45, 
		y1: 0, 
		x2: 0.55,
		y2: 1,
	},
	iterations = -1,
	callback = () => {},
}) => {

	const progress = [
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current
	];

	useEffect(() => {
		[1,2].map((item, index) => {
			progress[index].setValue(0);	
		});
		startAnimation();
	}, [loading, indicatorStyle, duration, bezierFn, iterations, callback]);

	const startAnimation = () => {
		createAnimation();
	};

	const scale = [
		progress[0].interpolate({
			inputRange: [0, 0.50, 1],
			outputRange: [0, 1, 0], 
			extrapolate: 'clamp', 
		}),
		progress[1].interpolate({
			inputRange: [0, 0.50, 1],
			outputRange: [0, 1, 0], 
			extrapolate: 'clamp', 
			
		})
	];

	const createAnimation = () => {
		const delay = duration/2; // Delay before animation starts

		[1,2].map((item, index) => {
			Animated.timing(progress[index], {
				toValue: 1,
				duration,
				easing: Easing.inOut(Easing.bezier(bezierFn?.x1, 
			bezierFn?.y1, 
			bezierFn?.x2, 
			bezierFn?.y2)),
				useNativeDriver: true,
				iterations,
				delay: index * delay
			}).start()
		});
	}

	



	return <View style={[styles.indicatorWrap]}>

			{[1,2].map((item, index) => {
				return <Animated.View  style={[
			styles.circles, 
			{
				width: indicatorStyle?.width,
				height: indicatorStyle?.height,
				borderRadius: indicatorStyle?.width/2,
				transform: [ {scale: scale[index]}],
			},
			indicatorStyle
		]}></Animated.View>;
			})}
		</View>
};

export default Style02;

const styles = StyleSheet.create({
	indicatorWrap: {
		position: "absolute",
		zIndex: 10,
	},

	circles: {
		backgroundColor :'white',
		position: 'absolute',
        opacity: 0.6
	}
});
