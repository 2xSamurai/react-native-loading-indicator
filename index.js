import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Animated, Easing } from "react-native";

const LoadingIndicator = ({
	loading = false,
	indicatorStyles = {},
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
	}, [loading, indicatorStyles, duration, bezierFn, iterations, callback]);

	const startAnimation = () => {
		Animated.timing(progress, {
			toValue: 1,
			duration: duration,
			useNativeDriver: true,
			easing: Easing.inOut(
				Easing.bezier(
					bezierFn?.x1,
					bezierFn?.y1,
					bezierFn?.x2,
					bezierFn?.y2
				)
			),
			iterations: iterations,
		}).start(callback);
	};
	const rotateX = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ["0deg", "-180deg", "-180deg"],
		extrapolate: "clamp",
	});

	const rotateY = progress.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ["0deg", "0deg", "-180deg"],
		extrapolate: "clamp",
	});

	return loading ? (
		<Animated.View
			style={[
				styles.indicator,
				{
					transform: [
						{ perspective: 120 },
						{ rotateX: rotateX },
						{ rotateY: rotateY },
					],
				},
				indicatorStyles,
			]}
		></Animated.View>
	) : null;
};

export default LoadingIndicator;

const styles = StyleSheet.create({
	indicator: {
		position: "absolute",
		left: Dimensions.get("window").width / 2 - 20,
		top: Dimensions.get("window").height / 2 - 20,
		zIndex: 10,
		width: 40,
		height: 40,
		backgroundColor: "white",
	},
});
