import {
	CommonActions,
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import LoadingView from "@/components/LoadingView";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { GameView } from "@/features/game/GameView";
import { useQueryWithStatus } from "@/lib/convex";

type Props = StaticScreenProps<{
	code: string;
}>;

export function GameScreen({ route }: Props) {
	const navigation = useNavigation();

	const {
		data: game,
		status: gameStatus,
		error: gameError,
	} = useQueryWithStatus(
		api.games.queries.getByGameCode,
		route.params.code
			? {
					code: route.params.code,
				}
			: "skip",
	);

	const board = useQuery(
		api.boards.queries.getByIdEnriched,
		game?.boardId
			? {
					boardId: game.boardId,
				}
			: "skip",
	);

	const answeredQuestions = useQuery(
		api.games.queries.getAnsweredQuestionsByGameId,
		game?._id
			? {
					gameId: game._id,
				}
			: "skip",
	);

	const teams = useQuery(
		api.games.queries.getTeamsByGameId,
		game ? { gameId: game._id } : "skip",
	);

	useEffect(() => {
		if (gameStatus === "error" && gameError) {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "BottomTabs" }],
				}),
			);
		}
	}, [gameStatus, gameError]);

	if (!game || !board) {
		return <LoadingView />;
	}

	return (
		<YStack flex={1} gap="xl" pd="lg" insetBottom>
			<GameView
				game={game}
				board={board}
				teams={teams ?? []}
				answeredQuestions={answeredQuestions ?? []}
			/>
		</YStack>
	);
}
