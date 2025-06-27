import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Crown from "@/assets/icons/crown.png";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import type { Doc } from "@/convex/_generated/dataModel";

const teamIndexToColor = [
	"green",
	"pink",
	"orange",
	"purple",
	"indigo",
] as const;

export const TeamResultCard = ({
	team,
	index,
	isTop,
}: {
	team: Doc<"teams">;
	index: number;
	isTop: boolean;
}) => {
	const { theme } = useUnistyles();
	const cardColor =
		theme.colors[teamIndexToColor[index % teamIndexToColor.length]];

	styles.useVariants({ isTop });

	return (
		<View style={[styles.card, { backgroundColor: cardColor }]}>
			{/* Crown for winner */}
			{isTop && (
				<View style={styles.crownContainer}>
					<Image source={Crown} style={styles.crown} />
				</View>
			)}

			{/* Team image - now much larger and more prominent */}
			<View style={styles.imageContainer}>
				<Image style={styles.teamImage} storageId={team.imageId} width={300} />
				<View style={styles.teamNameContainer}>
					<View style={[styles.teamNameCard, { backgroundColor: cardColor }]}>
						<Text variant="h3">{team.nickname}</Text>
					</View>
				</View>
				<View style={styles.teamPointsContainer}>
					<View style={[styles.teamPointCard, { backgroundColor: cardColor }]}>
						<Text variant="h3">{team.score}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create((th) => ({
	card: {
		flex: 1,
		padding: th.space.md,
		borderRadius: th.radius.lg,
		variants: {
			isTop: {
				true: {
					flex: 1.35,
					marginTop: 40,
					marginBottom: 10,
					transform: [{ scale: 1.08 }],
				},
				false: {},
			},
		},
	},
	crownContainer: {
		position: "absolute",
		top: -50,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 15,
	},
	crown: {
		width: 100,
		height: 100,
	},
	imageContainer: {
		borderRadius: th.radius.lg,
		overflow: "hidden",
		flex: 1,
	},
	teamImage: {
		width: "100%",
		height: "100%",
	},
	teamNameContainer: {
		position: "absolute",
		top: 0,
		left: 0,
	},
	teamNameCard: {
		padding: th.space.sm,
		borderBottomRightRadius: th.radius.lg,
		minWidth: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	teamPointsContainer: {
		position: "absolute",
		bottom: 0,
		right: 0,
		alignItems: "center",
		justifyContent: "center",
		gap: th.space.xs,
	},
	teamPointCard: {
		backgroundColor: "red",
		padding: th.space.md,
		borderTopLeftRadius: th.radius.lg,
		minWidth: 80,
		alignItems: "center",
		justifyContent: "center",
	},
}));
