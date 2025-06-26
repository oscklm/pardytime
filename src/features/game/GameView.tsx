import { CommonActions, useNavigation } from "@react-navigation/native";
import { useQuery } from "convex/react";
import { createContext, useEffect } from "react";
import { ActionSheetIOS } from "react-native";
import Button from "@/components/ui/Button";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import type { BoardEnrichedResult } from "@/convex/types";
import { BoardView } from "./views/BoardView";
import { LobbyView } from "./views/LobbyView";
import { ResultView } from "./views/ResultView";

interface GameState {
	game: Doc<"games">;
	board: BoardEnrichedResult;
	answeredQuestions: Doc<"answeredQuestions">[];
}

const StatusToViewComponent: Record<Doc<"games">["status"], React.FC> = {
	pending: LobbyView,
	active: BoardView,
	completed: ResultView,
} as const;

export const GameContext = createContext<GameState>({} as GameState);

interface GameViewProps extends GameState {}

const GameView = ({ game, board }: GameViewProps) => {
	const navigation = useNavigation();

	const answeredQuestions = useQuery(
		api.games.queries.getAnsweredQuestionsByGameId,
		{
			gameId: game._id,
		},
	);

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
					<Button
						sensory="light"
						size="sm"
						variant="outline"
						onPress={() => handleQuitGame()}
					>
						Leave
					</Button>
				),
			});
		}
	}, [game]);

	const ViewComponent = StatusToViewComponent[game.status];

	return (
		<GameContext
			value={{ game, board, answeredQuestions: answeredQuestions ?? [] }}
		>
			<ViewComponent />
		</GameContext>
	);
};

export { GameView };
