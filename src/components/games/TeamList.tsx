import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useQueryWithStatus } from "@/lib/convex";
import { ListEmptyComponent } from "../ListEmptyComponent";
import Button from "../ui/Button";
import Text from "../ui/Text";
import XStack from "../ui/XStack";
import YStack from "../ui/YStack";

interface Props {
	gameId: Id<"games">;
}

const TeamList = ({ gameId }: Props) => {
	const { data: teams, status } = useQueryWithStatus(
		api.games.queries.getTeamsByGameId,
		{
			gameId,
		},
	);

	return (
		<YStack gap="md">
			<YStack>
				<XStack ai="center" jc="between">
					<Text variant="h2">Teams</Text>
					<Button
						icon="plus"
						size="sm"
						screen="CreateTeam"
						disabled={teams?.length === 4}
						params={{ gameId }}
					>
						Add Team
					</Button>
				</XStack>
			</YStack>
			<FlatList
				data={teams}
				ListEmptyComponent={
					<ListEmptyComponent descriptor="teams" status={status} />
				}
				contentContainerStyle={styles.contentContainer}
				renderItem={({ item, index }) => {
					styles.useVariants({
						index: index.toString() as "0" | "1" | "2" | "3",
					});
					return (
						<View style={styles.teamCard}>
							<Text style={styles.nicknameLabel}>{item.nickname}</Text>
						</View>
					);
				}}
			/>
		</YStack>
	);
};

const styles = StyleSheet.create((th) => ({
	contentContainer: {
		gap: th.space.md,
	},
	teamCard: {
		padding: th.space.lg,
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.md,
		variants: {
			index: {
				"0": {
					backgroundColor: th.colors.blue,
				},
				"1": {
					backgroundColor: th.colors.pink,
				},
				"2": {
					backgroundColor: th.colors.orange,
				},
				"3": {
					backgroundColor: th.colors.purple,
				},
			},
		},
	},
	nicknameLabel: {
		fontSize: 20,
		lineHeight: 24,
		fontWeight: "700",
		color: th.colors.labelPrimary,
	},
}));

export default TeamList;
