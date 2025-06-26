import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActionSheetIOS } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import type { Doc } from "@/convex/_generated/dataModel";
import { GameProvider, type GameState } from "./GameProvider";
import { BoardView } from "./views/BoardView";
import { LobbyView } from "./views/LobbyView";
import { ResultView } from "./views/ResultView";

const StatusToViewComponent: Record<Doc<"games">["status"], React.FC> = {
	pending: LobbyView,
	active: BoardView,
	completed: ResultView,
} as const;

interface GameViewProps extends GameState {}

const GameView = ({ game, board, teams, answeredQuestions }: GameViewProps) => {
	const navigation = useNavigation();

	const handleQuitGame = () => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				title: "Are you sure u want to leave?",
				options: ["Cancel", "Leave now"],
				destructiveButtonIndex: 1,
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if (buttonIndex === 1) {
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: "BottomTabs" }],
						}),
					);
				}
			},
		);
	};

	useEffect(() => {
		if (game) {
			navigation.setOptions({
				title: board.title,
				headerLeft: () => (
					<TouchableBounce
						style={styles.headerButton}
						onPress={() => handleQuitGame()}
					>
						<Text style={styles.headerButtonText}>Leave</Text>
					</TouchableBounce>
				),
			});
		}
	}, [game]);

	const ViewComponent = StatusToViewComponent[game.status];

	return (
		<GameProvider
			game={game}
			board={board}
			teams={teams}
			answeredQuestions={answeredQuestions}
		>
			<ViewComponent />
		</GameProvider>
	);
};

const styles = StyleSheet.create((th) => ({
	container: {},
	headerButton: {
		paddingHorizontal: th.space.sm,
	},
	headerButtonText: {
		fontSize: 16,
		lineHeight: 16 * 1.3,
		fontWeight: "700",
		color: th.colors.labelSecondary,
	},
}));

export { GameView };
