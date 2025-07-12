import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Crown from "@/assets/icons/crown.png";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import type { Doc } from "@/convex/_generated/dataModel";

const teamIndexToColor = ["green", "pink", "orange", "mint"] as const;

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

  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      {/* Crown for winner */}

      {isTop && (
        <View style={styles.crownContainer}>
          <Image source={Crown} style={styles.crown} />
        </View>
      )}

      {/* Team image - now much larger and more prominent */}
      {team.imageId && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.teamImage}
            storageId={team.imageId}
            width={300}
            contentFit="cover"
            contentPosition={"center"}
          />
        </View>
      )}
      <View style={styles.teamDetailsContainer}>
        <Text variant="title" numberOfLines={2} style={styles.teamName}>
          {team.nickname}
        </Text>
        <Text variant="h1">{team.score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((th) => ({
  card: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 135,
    padding: th.space.md,
    borderRadius: th.radius.lg,
  },
  crownContainer: {
    position: "absolute",
    top: -50,
    left: -15,
    transform: [{ rotate: "-10deg" }],
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 15,
  },
  crown: {
    width: 85,
    height: 90,
  },
  imageContainer: {
    flex: 1,
  },
  teamImage: {
    borderRadius: th.radius.lg,
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  teamName: {
    textAlign: "center",
  },
  teamDetailsContainer: {
    flex: 1,
    padding: th.space.md,
    alignItems: "center",
    justifyContent: "center",
  },
}));
