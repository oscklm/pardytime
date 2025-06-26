import { useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ActionModal } from "@/components/ActionModal";
import Text from "@/components/ui/Text";
import { GameContext } from "../GameProvider";
import { useGameController } from "../hooks/useGameController";

export const ResultView = () => {
	const { game } = useContext(GameContext);
	const { resetToLobby, resetGame } = useGameController();

	return (
		<>
			<View>
				<Text>The results are in!</Text>
				<Text>{game._id}</Text>
			</View>
			<ActionModal
				icon="hand-sparkles"
				actions={[
					{
						id: "back-to-lobby",
						label: "Back to lobby",
						icon: "arrow-left",
						color: "purple",
						onPress: () => resetToLobby(),
					},
					{
						id: "reset-game",
						label: "Reset game",
						icon: "redo",
						color: "blue",
						onPress: () => resetGame(),
					},
				]}
			/>
		</>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {},
}));
