import { useMemo } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { TeamResultCard } from "../components/TeamResultCard";
import { useGameContext } from "../hooks/useGame";

export const ResultView = () => {
	const { teams } = useGameContext();

	const highestScoringTeam = useMemo(() => {
		if (teams.every((team) => team.score === 0)) {
			return null;
		}
		return teams.reduce(
			(max, team) => (team.score > max.score ? team : max),
			teams[0],
		);
	}, [teams]);

	const sortedTeams = useMemo(() => {
		return [...teams].sort((a, b) => b.score - a.score);
	}, [teams]);

	return (
		<View style={{ flex: 1 }}>
			<YStack ai="center" gap="md">
				<Text variant="h2">And the winner is...</Text>
			</YStack>
			<View style={styles.teamListContainer}>
				{sortedTeams.map((team, index) => (
					<TeamResultCard
						team={team}
						index={index}
						isTop={team._id === highestScoringTeam?._id}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	teamListContainer: {
		flex: 1,
		paddingHorizontal: th.space.md,
		gap: th.space.lg,
	},
}));
