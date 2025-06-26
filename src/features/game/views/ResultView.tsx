import { useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import { GameContext } from "../GameView";

export const ResultView = () => {
	const { game } = useContext(GameContext);

	return (
		<View>
			<Text>The results are in!</Text>
			<Text>{game._id}</Text>
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {},
}));
