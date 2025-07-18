import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Crown from "@/assets/icons/crown.png";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import type { Doc } from "@/convex/_generated/dataModel";
import { config } from "@/lib/config";

const teamImageHeightMap = {
  2: 120,
  3: 100,
  4: 80,
  5: 60,
};

interface TeamScoreTileProps {
  team: Doc<"teams">;
  teamCount: number;
  index: number;
  isHighestScoring: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

export const TeamScoreTile = ({
  team,
  teamCount,
  index,
  isHighestScoring,
  disabled,
  onPress,
}: TeamScoreTileProps) => {
  const { theme } = useUnistyles();
  const imageHeight =
    teamImageHeightMap[teamCount as keyof typeof teamImageHeightMap];

  const isHighest = useSharedValue(false);
  const crownScale = useSharedValue(0);
  const crownRotation = useSharedValue(0);

  useEffect(() => {
    isHighest.value = isHighestScoring;
    if (isHighestScoring) {
      crownScale.value = withSpring(1, { damping: 8 });
      crownRotation.value = withSpring(20, { damping: 8 });
    } else {
      crownScale.value = withTiming(0, { duration: 200 });
      crownRotation.value = withTiming(0, { duration: 200 });
    }
  }, [isHighestScoring]);

  const cardColor = theme.colors[config.teamColors[index]];

  const crownAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: crownScale.value },
      { rotate: `${crownRotation.value}deg` },
    ],
  }));

  return (
    <Pressable
      style={[styles.teamCard, { backgroundColor: cardColor }]}
      disabled={disabled}
      onPress={onPress}
    >
      <View>
        <Animated.View style={[crownAnimatedStyle, styles.crownContainer]}>
          <Image source={Crown} style={styles.crownImage} />
        </Animated.View>
        <Image
          style={[styles.teamImage, { height: imageHeight }]}
          storageId={team.imageId}
          contentFit="cover"
          width={300}
        />
        <Text key={team._id} style={styles.teamScoreText}>
          {team.score}
        </Text>
      </View>
    </Pressable>
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
  crownContainer: {
    position: "absolute",
    top: -22,
    right: -12,
    zIndex: 1,
  },
  crownImage: {
    width: 35,
    height: 35,
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
    backgroundColor: th.colors.black,
    borderRadius: th.radius.md,
  },
}));
