import React from "react";
import { StyleSheet, ActivityIndicator, Dimensions } from "react-native";

export default function Preloader({ loading = false, style = {} }) {
	return loading ? (
		<ActivityIndicator
			width={100}
			style={[styles.preloader, style]}
			color={"white"}
		/>
	) : null;
}

const styles = StyleSheet.create({
	preloader: {
		position: "absolute",
		left: Dimensions.get("window").width / 2 - 10,
		top: Dimensions.get("window").height / 2 - 10,
		zIndex: 10,
		width: 20,
		height: 20,
	},
});
