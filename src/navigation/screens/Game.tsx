import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native-unistyles";
import { GameStatusBadge } from "@/components/games/GameStatusBadge";
import TeamList from "@/components/games/TeamList";
import LoadingView from "@/components/LoadingView";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

type Props = StaticScreenProps<{
	code: string;
}>;

export function Game({ route }: Props) {
	const navigation = useNavigation();
	const game = useQuery(api.games.queries.getByGameCode, {
		code: route.params.code,
	});

	useEffect(() => {
		if (game) {
			navigation.setOptions({
				headerRight: () => <GameStatusBadge status={game.status} />,
			});
		}
	}, [game]);

	if (!game) {
		return <LoadingView />;
	}

	const gameLink = `jeopardytime://game?code=${game.code}`;

	return (
		<YStack flex={1} gap="xl" pd="lg" insetBottom>
			<XStack jc="between" gap="md">
				<View style={styles.codeContainer}>
					<QRCode value={gameLink} size={125} />
					<Text style={styles.codeLabel}>#{game.code}</Text>
				</View>
			</XStack>
			<TeamList gameId={game._id} />
			<View style={{ flex: 1 }} />
			<Button variant="success" size="md" onPress={() => {}}>
				Start the game
			</Button>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
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
