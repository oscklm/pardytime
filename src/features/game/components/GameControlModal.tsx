import { FontAwesome6 } from "@expo/vector-icons";
import { useContext } from "react";
import { type ModalProps, Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Modal } from "@/components/Modal";
import Button from "@/components/ui/Button";
import YStack from "@/components/ui/YStack";
import { GameContext } from "../GameProvider";
import { useGameController } from "../hooks/useGameController";

interface TeamControlModalProps extends Omit<ModalProps, "onRequestClose"> {
	onRequestClose: () => void;
}

export const GameControlModal = ({
	visible,
	onRequestClose,
}: TeamControlModalProps) => {
	const { game } = useContext(GameContext);
	const { endGame, resetGame, resetToLobby, deleteGame } = useGameController();

	return (
		<Modal visible={visible} onRequestClose={onRequestClose}>
			<View style={styles.closeButtonContainer}>
				<Pressable onPress={onRequestClose}>
					<FontAwesome6
						name="xmark"
						size={32}
						color={styles.closeButton.color}
					/>
				</Pressable>
			</View>
			<YStack style={styles.container} gap="xl">
				<YStack gap="lg">
					{game.status === "active" && (
						<>
							<Button
								variant="blue"
								size="md"
								onPress={() => {
									onRequestClose();
									endGame();
								}}
							>
								End game
							</Button>
							<Button
								variant="blue"
								size="md"
								onPress={() => {
									onRequestClose();
									resetGame();
								}}
							>
								Reset game
							</Button>
						</>
					)}
					{(game.status === "completed" || game.status === "active") && (
						<Button
							variant="blue"
							size="md"
							onPress={() => {
								onRequestClose();
								resetToLobby();
							}}
						>
							Go back to lobby
						</Button>
					)}
					<Button variant="danger" size="md" onPress={deleteGame}>
						Delete game
					</Button>
				</YStack>
			</YStack>
		</Modal>
	);
};

const styles = StyleSheet.create((th, rt) => ({
	container: {
		flex: 1,
		gap: th.space.md,
		padding: th.space.lg,
		paddingBottom: rt.insets.bottom,
	},
	closeButtonContainer: {
		marginTop: th.space.md,
		paddingHorizontal: th.space.lg,
		alignItems: "flex-end",
	},
	closeButton: {
		color: th.colors.labelPrimary,
	},
}));
