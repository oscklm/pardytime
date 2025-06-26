import type { StaticScreenProps } from "@react-navigation/native";
import { useQuery } from "convex/react";
import { StyleSheet } from "react-native-unistyles";
import LoadingView from "@/components/LoadingView";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { GameView } from "@/features/game/GameView";

type Props = StaticScreenProps<{
	code: string;
}>;

export function Game({ route }: Props) {
	const game = useQuery(
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

	if (!game || !board) {
		return <LoadingView />;
	}

	return (
		<YStack flex={1} gap="xl" pd="lg" insetBottom>
			<GameView
				game={game}
				board={board}
				answeredQuestions={answeredQuestions || []}
			/>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	container: {},
}));
