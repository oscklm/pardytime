import { useContext } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native-unistyles";
import TeamList from "@/components/game/TeamList";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { GameContext } from "../GameProvider";
import { useGameController } from "../hooks/useGameController";

const MIN_TEAMS_TO_START = 2;

export const LobbyView = () => {
	const { game, teams } = useContext(GameContext);
	const { startGame } = useGameController();

	const gameLink = `jeopardytime://game?code=${game.code}`;

	return (
		<>
			<View style={styles.container}>
				<XStack jc="between" gap="md">
					<View style={styles.codeContainer}>
						<QRCode value={gameLink} size={125} />
						<Text style={styles.codeLabel}>#{game.code}</Text>
					</View>
				</XStack>
				<TeamList gameId={game._id} teams={teams ?? []} />
				<YStack>
					<YStack ai="center" py="md">
						{teams && teams.length < MIN_TEAMS_TO_START && (
							<Text variant="subtitle">
								You need at least {MIN_TEAMS_TO_START} teams to start the game.
							</Text>
						)}
					</YStack>
					<Button
						sensory="light"
						variant="success"
						size="lg"
						onPress={startGame}
						disabled={teams && teams.length < MIN_TEAMS_TO_START}
					>
						Start
					</Button>
				</YStack>
			</View>
		</>
	);
};

const styles = StyleSheet.create((th, rt) => ({
	container: {
		flex: 1,
		paddingBottom: rt.insets.bottom,
		gap: th.space.lg,
	},
	codeContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.md,
		padding: th.space.lg,
		gap: th.space.md,
		borderWidth: 1,
		borderColor: th.colors.labelQuaternary,
	},
	codeLabel: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
		letterSpacing: 0.5,
		width: "100%",
		textAlign: "center",
		color: th.colors.labelPrimary,
		textTransform: "uppercase",
	},
}));
