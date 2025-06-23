import { useMutation } from "convex/react";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import type { QueryStatus } from "@/lib/convex";
import { ListEmptyComponent } from "../ListEmptyComponent";
import Button from "../ui/Button";
import { Image } from "../ui/Image";
import Text from "../ui/Text";
import XStack from "../ui/XStack";
import YStack from "../ui/YStack";

interface Props {
	gameId: Id<"games">;
	teams: Doc<"teams">[];
	status: QueryStatus;
}

const TeamList = ({ gameId, teams, status }: Props) => {
	const deleteTeam = useMutation(api.games.mutations.deleteTeam);

	const handleDeleteTeam = async (teamId: Id<"teams">) => {
		await deleteTeam({ teamId });
	};

	return (
		<YStack gap="lg">
			<YStack>
				<XStack ai="center" jc="between">
					<Text variant="h2">Teams</Text>
					<Button
						icon="plus"
						size="sm"
						screen="CreateTeam"
						disabled={teams.length === 4}
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
							<View style={styles.deleteButton}>
								<Button
									variant="icon"
									size="sm"
									iconSize={18}
									icon="trash"
									onPress={() => handleDeleteTeam(item._id)}
								/>
							</View>
							<Image
								storageId={item.imageId}
								style={styles.teamImage}
								width={300}
							/>
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
	teamImage: {
		width: 80,
		height: 80,
		backgroundColor: th.colors.backgroundPrimary,
		borderRadius: th.radius.md,
	},
	deleteButton: {
		position: "absolute",
		right: 10,
		top: 10,
		backgroundColor: th.colors.backgroundPrimary,
		padding: th.space.xs,
		borderRadius: th.radius.md,
	},
	teamCard: {
		padding: th.space.lg,
		flexDirection: "row",
		alignItems: "center",
		gap: th.space.lg,
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
		fontSize: 24,
		lineHeight: 28,
		fontWeight: "700",
		color: th.colors.labelPrimary,
	},
}));

export default TeamList;
