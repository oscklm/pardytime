import { Modal } from '@/components/layout/Modal';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import Text from '@/components/ui/Text';
import XStack from '@/components/ui/XStack';
import YStack from '@/components/ui/YStack';
import type { Doc, Id } from '@/convex/_generated/dataModel';
import { useState } from 'react';
import { type ModalProps, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useGameContext } from '../hooks/useGame';

interface TeamControlModalProps extends Omit<ModalProps, 'onRequestClose'> {
  team: Doc<'teams'> | null;
  onAnswerSelected?: (
    answer: boolean,
    teamId: Id<'teams'>,
    points: number
  ) => void;
  onRequestClose: () => void;
}

export const TeamControlModal = ({
  visible,
  onAnswerSelected,
  onRequestClose,
  team,
}: TeamControlModalProps) => {
  const { activeQuestion } = useGameContext();

  const [answer, setAnswer] = useState<boolean>(false);

  const [points, setPoints] = useState(activeQuestion?.value || 0);

  const handleSaveChanges = () => {
    if (!team) return;

    onAnswerSelected?.(answer, team._id, points);

    onRequestClose?.();
  };

  const handleAnswer = (value: boolean) => {
    setPoints((prev) => (value ? Math.abs(prev) : -Math.abs(prev)));
    setAnswer(value);
  };

  const handleResetPoints = () => {
    setPoints(
      answer
        ? activeQuestion?.value || 0
        : -Math.abs(activeQuestion?.value || 0)
    );
  };

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <YStack flex={1} pd="lg" gap="xl">
        <YStack gap="xl" ai="center">
          <Image
            storageId={team?.imageId}
            style={styles.teamModalImage}
            width={300}
          />
          <Text variant="h2">{team?.nickname}</Text>
          <View style={styles.teamModalDivider} />
          <YStack ai="center" gap="lg">
            <Text variant="title">Select answer</Text>
            <XStack jc="center" gap="lg" ai="center">
              <Button
                size="lg"
                variant={answer ? undefined : 'danger'}
                onPress={() => handleAnswer(false)}
              >
                Wrong
              </Button>
              <Button
                size="lg"
                variant={answer ? 'success' : undefined}
                onPress={() => handleAnswer(true)}
              >
                Correct
              </Button>
            </XStack>
          </YStack>
          <YStack ai="center" gap="md">
            <Text variant="title">New score</Text>
            <XStack gap="md" ai="center">
              <Button
                size="sm"
                onPress={() =>
                  setPoints((prev) => (answer ? prev - 50 : prev + 50))
                }
              >
                -
              </Button>
              <Text
                style={[
                  styles.teamModalScoreText(
                    points > 0 ? 'green' : points < 0 ? 'red' : 'labelPrimary'
                  ),
                  {
                    fontWeight: 'bold',
                    fontSize: 45,
                    lineHeight: 45 * 1.3,
                  },
                ]}
              >
                {points}
              </Text>
              <Button
                size="sm"
                onPress={() =>
                  setPoints((prev) => (answer ? prev + 50 : prev - 50))
                }
              >
                +
              </Button>
            </XStack>
          </YStack>
        </YStack>
        <View style={styles.teamModalDivider} />

        <XStack gap="md">
          <Button
            style={{ flex: 2 }}
            variant="blue"
            size="md"
            icon="save"
            onPress={handleSaveChanges}
          >
            Save changes
          </Button>
          <Button
            style={{ flex: 1 }}
            size="md"
            icon="refresh"
            onPress={handleResetPoints}
          >
            Reset
          </Button>
        </XStack>
      </YStack>
    </Modal>
  );
};

const styles = StyleSheet.create((th) => ({
  teamModalDivider: {
    width: '100%',
    height: 2,
    backgroundColor: th.colors.borderTertiary,
  },
  teamModalContainer: {
    flex: 1,
    gap: th.space.md,
    padding: th.space.lg,
  },
  teamModalScoreText: (color: 'green' | 'red' | 'labelPrimary') => ({
    fontSize: 32,
    lineHeight: 32 * 1.3,
    textAlign: 'center',
    fontWeight: '700',
    color: th.colors[color],
  }),
  currentScoreText: {
    fontSize: 16,
    lineHeight: 16 * 1.3,
    textAlign: 'center',
    fontWeight: '500',
    textDecorationLine: 'line-through',
    color: th.colors.labelPrimary,
  },
  teamModalImage: {
    width: 185,
    height: 185,
    borderRadius: th.radius.md,
  },
}));
