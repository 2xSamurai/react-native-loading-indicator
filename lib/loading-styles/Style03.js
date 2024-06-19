import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing, View } from "react-native";

const Style03 = ({
	loading = false,
	indicatorStyle = {},
	duration = 1800,
	bezierFn = {
		x1: 0.46,
		y1: 0.03,
		x2: 0.52,
		y2: 0.96,
	},
	iterations = -1,
	callback = () => {},
}) => {
	const progress = [
		useRef(new Animated.Value(0)).current,
		useRef(new Animated.Value(0)).current,
	];

	useEffect(() => {
		[1, 2].map((item, index) => {
			progress[index].setValue(0);
		});
		startAnimation();
	}, [loading, indicatorStyle, duration, bezierFn, iterations, callback]);

	const startAnimation = () => {
		createAnimation();
	};

	const wrapDimension = {
		width: indicatorStyle?.width * 3.75,
		height: indicatorStyle?.height * 3.75,
	};

	const wanderDistance = wrapDimension?.width - indicatorStyle?.width;

	const wander = [
		{
			translateX: progress[0].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [0, wanderDistance, wanderDistance, 0, 0],
				extrapolate: "clamp",
			}),
			translateY: progress[0].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [0, 0, wanderDistance, wanderDistance, 0],
				extrapolate: "clamp",
			}),
			rotate: progress[0].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [
					"0deg",
					"-90deg",
					"-180deg",
					"-270deg",
					"-360deg",
				],
				extrapolate: "clamp",
			}),
			scale: progress[0].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [1, 0.5, 1, 0.5, 1],
				extrapolate: "clamp",
			}),
		},
		{
			translateX: progress[1].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [0, wanderDistance, wanderDistance, 0, 0],
				extrapolate: "clamp",
			}),
			translateY: progress[1].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [0, 0, wanderDistance, wanderDistance, 0],
				extrapolate: "clamp",
			}),
			rotate: progress[1].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [
					"0deg",
					"-90deg",
					"-180deg",
					"-270deg",
					"-360deg",
				],
				extrapolate: "clamp",
			}),
			scale: progress[1].interpolate({
				inputRange: [0, 0.25, 0.5, 0.75, 1],
				outputRange: [1, 0.5, 1, 0.5, 1],
				extrapolate: "clamp",
			}),
		},
	];

	const createAnimation = () => {
		const delay = duration / 2;

		[1, 2].map((item, index) => {
			const animationSequence = Animated.loop(
				Animated.sequence([
					Animated.timing(progress[index], {
						toValue: 0.25,
						duration: duration / 4,
						useNativeDriver: true,
						easing: Easing.bezier(
							bezierFn?.x1,
							bezierFn?.y1,
							bezierFn?.x2,
							bezierFn?.y2
						),
					}),
					Animated.timing(progress[index], {
						toValue: 0.5,
						duration: duration / 4,
						useNativeDriver: true,
						easing: Easing.bezier(
							bezierFn?.x1,
							bezierFn?.y1,
							bezierFn?.x2,
							bezierFn?.y2
						),
					}),
					Animated.timing(progress[index], {
						toValue: 0.75,
						duration: duration / 4,
						useNativeDriver: true,
						easing: Easing.bezier(
							bezierFn?.x1,
							bezierFn?.y1,
							bezierFn?.x2,
							bezierFn?.y2
						),
					}),
					Animated.timing(progress[index], {
						toValue: 1,
						duration: duration / 4,
						useNativeDriver: true,
						easing: Easing.bezier(
							bezierFn?.x1,
							bezierFn?.y1,
							bezierFn?.x2,
							bezierFn?.y2
						),
					}),
				]),
				{
					iterations: -1,
				}
			);
			if (index === 0) {
				animationSequence.start();
			} else {
				setTimeout(() => {
					animationSequence.start();
				}, delay);
			}
		});
	};

	return (
		<View
			style={[
				styles.indicatorWrap,
				{
					width: wrapDimension?.width,
					height: wrapDimension?.height,
				},
			]}
		>
			{[1, 2].map((item, index) => {
				return (
					<Animated.View
						style={[
							styles.squares,
							{
								transform: [
									{ translateX: wander[index]["translateX"] },
									{ translateY: wander[index]["translateY"] },
									{ rotate: wander[index]["rotate"] },
									{ scale: wander[index]["scale"] },
								],
								width: indicatorStyle?.width,
								height: indicatorStyle?.height,
							},
							indicatorStyle,
						]}
					></Animated.View>
				);
			})}
		</View>
	);
};

export default Style03;

const styles = StyleSheet.create({
	indicatorWrap: {
		position: "relative",
		zIndex: 10,
	},

	squares: {
		backgroundColor: "#d35400",
		position: "absolute",
		top: 0,
		left: 0,
	},
});
