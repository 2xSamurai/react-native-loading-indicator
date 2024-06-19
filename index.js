import React from "react";
import { View } from "react-native";
import { Style01, Style02, Style03 } from "./lib/loading-styles";

const LoadingIndicator = ({
	loading = false,
	indicatorStyle,
	duration,
	bezierFn,
	iterations,
	callback,
	animationName = "squareFlip", //['squareFlip', 'circleScale', 'squareWander']
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
		squareWander: {
			width: 12,
			height: 12,
		},
	};

	return loading ? (
		<View>
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
			{animationName === "squareWander" ? (
				<Style03
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
