import * as Haptics from "expo-haptics";
import { Dimensions, Pressable } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import type { Doc, Id } from "@/convex/_generated/dataModel";

interface TeamScoreTileProps {
	teams: Doc<"teams">[];
	onTeamSelect: (teamId: Id<"teams">) => void;
}

const teamIndexToColor = [
	"blue",
	"pink",
	"orange",
	"purple",
	"indigo",
] as const;

const { width } = Dimensions.get("window");

const getImageHeight = (teamCount: number) => {
	// Make images take up a certain fraction of available width
	const base = width / (teamCount * 1.2); // 1.2 is a fudge factor for padding/gap
	return Math.max(40, Math.min(base, 90)); // Clamp between 40 and 120
};

export const TeamScoreTile = ({ teams, onTeamSelect }: TeamScoreTileProps) => {
	const { theme } = useUnistyles();
	const imageHeight = getImageHeight(teams.length);

	return (
		<YStack py="md">
			<XStack gap="md">
				{teams.map((team, index) => (
					<Pressable
						key={team._id}
						style={[
							styles.teamCard,
							{ backgroundColor: theme.colors[teamIndexToColor[index]] },
						]}
						onPress={() => {
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
							onTeamSelect(team._id);
						}}
					>
						<Image
							style={[styles.teamImage, { height: imageHeight }]}
							storageId={team.imageId}
							contentFit="cover"
							width={300}
						/>
						<Text key={team._id} style={styles.teamScoreText}>
							{team.score}
						</Text>
					</Pressable>
				))}
			</XStack>
		</YStack>
	);
};

const styles = StyleSheet.create((th) => ({
	teamCard: {
		flex: 1,
		padding: th.space.sm,
		flexDirection: "column",
		backgroundColor: th.colors.backgroundSecondary,
		borderRadius: th.radius.md,
	},
	teamScoreText: {
		fontSize: 16,
		lineHeight: 16 * 1.3,
		textAlign: "center",
		fontWeight: "800",
		color: th.colors.white,
	},
	teamImage: {
		width: "100%",
		height: 65,
		borderRadius: th.radius.md,
	},
}));
