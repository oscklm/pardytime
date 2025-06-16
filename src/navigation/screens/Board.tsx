import { Text } from "@react-navigation/elements";
import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useQuery } from "convex/react";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedSpinner } from "@/components/AnimatedSpinner";
import { Card, CardContent } from "@/components/ui/Card";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

type Props = StaticScreenProps<{
	boardId: string;
}>;

export function Board({ route }: Props) {
	const board = useQuery(api.boards.getEnrichedById, {
		id: route.params.boardId,
	});

	const navigation = useNavigation();

	const totalQuestions = useMemo(() => {
		if (!board || !board.enriched) return 0;
		return board.enriched.categories.reduce(
			(acc, category) => acc + category.questions.length,
			0,
		);
	}, [board]);

	useEffect(() => {
		navigation.setOptions({
			title: board?.title,
		});
	}, [board]);

	if (!board) {
		return (
			<YStack flex={1} jc="center" ai="center">
				<AnimatedSpinner style={{ width: 64, height: 64 }} />
			</YStack>
		);
	}

	const { enriched } = board;

	return (
		<View style={styles.container}>
			<Text>{board?.title}</Text>
			<Text>{board?.description}</Text>
			<YStack gap="md">
				<Card>
					<CardContent>
						<Text>{enriched.categories.length} categories</Text>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<Text>{totalQuestions} questions</Text>
					</CardContent>
				</Card>
			</YStack>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
});
