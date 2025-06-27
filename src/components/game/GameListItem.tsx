import { CommonActions, useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import type { api } from "@/convex/_generated/api";
import { formatUnixTimestamp } from "@/lib/utils/time";
import XStack from "../ui/XStack";
import YStack from "../ui/YStack";
import { GameStatusBadge } from "./GameStatusBadge";

type GamesWithBoard = typeof api.games.queries.getAllByOwnerId._returnType;

export function GameListItem({ game }: { game: GamesWithBoard[number] }) {
	const navigation = useNavigation();
	const { code } = game;

	const onPress = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "Game", params: { code } }],
			}),
		);
	};

	const formattedDate = formatUnixTimestamp(game._creationTime);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<XStack jc="between" ai="center">
					<Text style={styles.boardLabel}>{game.name}</Text>
					<GameStatusBadge status={game.status} />
				</XStack>
				<YStack gap="xs">
					<Text variant="subtitle">Created</Text>
					<Text>{formattedDate}</Text>
				</YStack>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create((th) => ({
	container: {
		flex: 1,
		height: 100,
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.md,
		borderWidth: 1,
		borderColor: th.colors.labelQuaternary,
		padding: th.space.lg,
	},
	boardLabel: {
		fontSize: 18,
		lineHeight: 18 * 1.3,
		fontWeight: "600",
		textAlign: "center",
	},
	face: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		borderRadius: th.radius.md,
		justifyContent: "center",
		alignItems: "center",
	},
}));
