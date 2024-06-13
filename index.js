import React, { useEffect, useRef } from "react";
import { StyleSheet, Dimensions, Animated, Easing, View } from "react-native";
import {
	Style01,
	Style02,
} from "react-native-loading-indicator/lib/loading-styles";

const LoadingIndicator = ({
	loading = false,
	indicatorStyle,
	duration,
	bezierFn,
	iterations,
	callback,
	animationName = "circleScale", //['squareFlip', 'circleScale']
}) => {
	const defaults = {
		squareFlip: {
			width: 40,
			height: 40,
		},
		circleScale: {
			width: 50,
			height: 50,
		},
	};

	return loading ? (
		<View
			style={[
				styles.indicatorWrap,
				{
					left:
						Dimensions.get("window").width / 2 -
						defaults[animationName]?.width / 2,
					top:
						Dimensions.get("window").height / 2 -
						defaults[animationName]?.height / 2,
				},
			]}
		>
			{animationName === "squareFlip" ? (
				<Style01
					indicatorStyle={{
						...defaults[animationName],
						...indicatorStyle,
					}}
					duration={duration}
					bezierFn={bezierFn}
					iterations={iterations}
					callback={callback}
				/>
			) : null}
			{animationName === "circleScale" ? (
				<Style02
					indicatorStyle={{
						...defaults[animationName],
						...indicatorStyle,
					}}
					duration={duration}
					bezierFn={bezierFn}
					iterations={iterations}
					callback={callback}
				/>
			) : null}
		</View>
	) : null;
};

export default LoadingIndicator;

const styles = StyleSheet.create({
	indicatorWrap: {
		position: "absolute",
		zIndex: 10,
	},
});
