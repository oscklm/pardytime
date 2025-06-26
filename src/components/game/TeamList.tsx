import { useMutation } from "convex/react";
import { ActionSheetIOS, FlatList, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import Button from "../ui/Button";
import { Image } from "../ui/Image";
import Text from "../ui/Text";
import XStack from "../ui/XStack";
import YStack from "../ui/YStack";

interface Props {
	gameId: Id<"games">;
	teams: Doc<"teams">[];
}

const teamIndexToColor = ["blue", "pink", "orange", "purple"] as const;

const TeamList = ({ gameId, teams }: Props) => {
	const { theme } = useUnistyles();
	const deleteTeam = useMutation(api.games.mutations.deleteTeam);

	const handleDeleteTeam = async (teamId: Id<"teams">) => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				title: "Are you sure?",
				message: "You wont be able to undo deleting this team",
				options: ["Cancel", "Delete"],
				destructiveButtonIndex: 1,
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if (buttonIndex === 1) {
					void deleteTeam({ teamId });
				}
			},
		);
	};

	return (
		<YStack flex={1} gap="lg">
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
			<FlatList
				data={teams}
				ListEmptyComponent={
					<Text variant="subtitle">
						No teams yet. Add a team to get started.
					</Text>
				}
				contentContainerStyle={styles.contentContainer}
				renderItem={({ item, index }) => {
					return (
						<View
							style={[
								styles.teamCard,
								{ backgroundColor: theme.colors[teamIndexToColor[index]] },
							]}
						>
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
		gap: th.space.lg,
	},
	teamImage: {
		width: 75,
		height: 75,
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
	},
	nicknameLabel: {
		fontSize: 24,
		lineHeight: 28,
		fontWeight: "700",
		color: th.colors.white,
	},
}));

export default TeamList;
