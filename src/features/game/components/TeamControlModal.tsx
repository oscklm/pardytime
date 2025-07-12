import { FontAwesome6 } from "@expo/vector-icons";
import { useMemo } from "react";
import { type ModalProps, View } from "react-native";
import {
  StyleSheet,
  useUnistyles,
  withUnistyles,
} from "react-native-unistyles";
import { Modal } from "@/components/layout/Modal";
import Button from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import type { Doc } from "@/convex/_generated/dataModel";
import { useGameController } from "../hooks/useGameController";

interface TeamControlModalProps extends Omit<ModalProps, "onRequestClose"> {
  team: Doc<"teams"> | null;
  pointAmount: number;
  onPointAmountChange: (amount: number) => void;
  onRequestClose: () => void;
}

const FontAwesome6Icon = withUnistyles(FontAwesome6, (th) => ({
  color: th.colors.labelPrimary,
}));

export const TeamControlModal = ({
  visible,
  onRequestClose,
  team,
  pointAmount,
  onPointAmountChange,
}: TeamControlModalProps) => {
  const { theme } = useUnistyles();
  const { updateTeamScore } = useGameController();

  const handleGivePoints = () => {
    if (!team) return;

    if (pointAmount === 0) {
      alert("Please enter a point amount");
      return;
    }

    onRequestClose?.();

    const adjustedPointAmount = team.score + pointAmount;
    updateTeamScore(team._id, adjustedPointAmount);

    onPointAmountChange(0);
  };

  const projectedScore = useMemo(() => {
    if (!team) return 0;
    return team.score + pointAmount;
  }, [team, pointAmount]);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <YStack flex={1} pd="lg" gap="xl">
        <YStack gap="lg" ai="center">
          <Image
            storageId={team?.imageId}
            style={styles.teamModalImage}
            width={300}
          />
          <Text variant="h2">{team?.nickname}</Text>
          <YStack ai="center" gap="md">
            <XStack jc="center" gap="sm" ai="center">
              <Text style={styles.currentScoreText}>{team?.score}</Text>
              <FontAwesome6Icon
                name={
                  pointAmount > 0
                    ? "arrow-up"
                    : pointAmount < 0
                      ? "arrow-down"
                      : "equals"
                }
                size={20}
                color={
                  pointAmount > 0
                    ? theme.colors.green
                    : pointAmount < 0
                      ? theme.colors.red
                      : theme.colors.labelPrimary
                }
              />
              <Text
                style={[
                  styles.teamModalScoreText(
                    pointAmount > 0
                      ? "green"
                      : pointAmount < 0
                        ? "red"
                        : "labelPrimary"
                  ),
                  {
                    fontWeight: "bold",
                    fontSize: 40,
                  },
                ]}
              >
                {projectedScore}
              </Text>
            </XStack>
            <Text variant="description">
              {pointAmount > 0 && `Score will increase by ${pointAmount}`}
              {pointAmount < 0 &&
                `Score will decrease by ${Math.abs(pointAmount)}`}
              {pointAmount === 0 && `Use buttons below to change score`}
            </Text>
          </YStack>
          <XStack gap="md">
            <Button
              size="lg"
              variant="danger"
              icon="minus"
              onPress={() => onPointAmountChange(pointAmount - 50)}
            >
              50
            </Button>
            <Button
              size="lg"
              variant="success"
              icon="plus"
              onPress={() => onPointAmountChange(pointAmount + 50)}
            >
              50
            </Button>
            <Button
              size="lg"
              icon="rotate-left"
              onPress={() => onPointAmountChange(0)}
            >
              Undo
            </Button>
          </XStack>
        </YStack>
        <View style={styles.teamModalDivider} />

        <YStack gap="lg">
          <Button variant="blue" size="md" onPress={handleGivePoints}>
            Save changes
          </Button>
        </YStack>
      </YStack>
    </Modal>
  );
};

const styles = StyleSheet.create((th) => ({
  teamModalDivider: {
    width: "100%",
    height: 2,
    backgroundColor: th.colors.borderTertiary,
  },
  teamModalContainer: {
    flex: 1,
    gap: th.space.md,
    padding: th.space.lg,
  },
  teamModalScoreText: (color: "green" | "red" | "labelPrimary") => ({
    fontSize: 32,
    lineHeight: 32 * 1.3,
    textAlign: "center",
    fontWeight: "700",
    color: th.colors[color],
  }),
  currentScoreText: {
    fontSize: 16,
    lineHeight: 16 * 1.3,
    textAlign: "center",
    fontWeight: "500",
    textDecorationLine: "line-through",
    color: th.colors.labelPrimary,
  },
  teamModalImage: {
    width: 185,
    height: 185,
    borderRadius: th.radius.md,
  },
}));
