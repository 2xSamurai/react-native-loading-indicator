import React from "react";
import { StyleSheet, ActivityIndicator, Dimensions } from "react-native";

const LoadingIndicator = ({ loading = false, style = {} }) => {
	return loading ? (
		<ActivityIndicator
			width={100}
			style={[styles.indicator, style]}
			color={"white"}
		/>
	) : null;
};

export default LoadingIndicator;

const styles = StyleSheet.create({
	indicator: {
		position: "absolute",
		left: Dimensions.get("window").width / 2 - 10,
		top: Dimensions.get("window").height / 2 - 10,
		zIndex: 10,
		width: 20,
		height: 20,
	},
});
