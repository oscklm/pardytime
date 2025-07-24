import Text from '@/components/ui/Text';
import type { Doc } from '@/convex/_generated/dataModel';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { useGameContext } from '../hooks/useGame';

interface ActiveQuestionDisplayProps {
  question: Doc<'questions'> | null;
  isAnswered: boolean;
}

export const ActiveQuestionDisplay = ({
  question,
  isAnswered,
}: ActiveQuestionDisplayProps) => {
  const { theme } = useUnistyles();
  const { isOwner } = useGameContext();
  const opacity = useSharedValue<number>(0);
  const flipRotation = useSharedValue<number>(0);

  // Animate fade in/out when question changes
  useEffect(() => {
    if (question) {
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [question, opacity]);

  // Reset flip animation when question changes, then animate based on isAnswered
  useEffect(() => {
    // Reset flip rotation immediately when question changes
    flipRotation.value = 0;

    // Then animate to the correct state based on isAnswered
    if (isAnswered) {
      flipRotation.value = withTiming(180, { duration: 600 });
    }
  }, [question, flipRotation, isAnswered]);

  // Separate effect for when only isAnswered changes (same question)
  useEffect(() => {
    if (isAnswered) {
      flipRotation.value = withTiming(180, { duration: 600 });
    } else {
      flipRotation.value = withTiming(0, { duration: 600 });
    }
  }, [isAnswered, flipRotation]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const frontCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180]);
    const opacity = interpolate(flipRotation.value, [0, 90, 180], [1, 0, 0]);

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360]);
    const opacity = interpolate(flipRotation.value, [0, 90, 180], [0, 0, 1]);

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.green,
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
      backfaceVisibility: 'hidden',
    };
  });

  // Show placeholder when no question
  if (!question) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>
          Hold down on any question to select it.
        </Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      {/* Front of card - Question */}
      <Animated.View style={[styles.cardContent, frontCardStyle]}>
        <Text variant="h4" style={styles.text}>
          {question.text}
        </Text>
        {isOwner && (
          <Text variant="subtitle" style={styles.answerPreviewText}>
            {question.answer}
          </Text>
        )}
      </Animated.View>
      {/* Back of card - Answer */}
      <Animated.View style={[styles.cardContent, backCardStyle]}>
        <Text variant="h3" style={styles.text}>
          {question.answer}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((th) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: th.space.lg,
    gap: th.space.md,
    backgroundColor: th.colors.backgroundTertiary,
    borderRadius: th.radius.md,
    overflow: 'hidden',
    minHeight: 115,
  },
  placeholderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: th.space.lg,
    backgroundColor: th.colors.backgroundTertiary,
    borderRadius: th.radius.md,
    minHeight: 115,
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 16 * 1.3,
    fontWeight: '700',
    textAlign: 'center',
    color: th.colors.labelSecondary,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    zIndex: 1,
    textAlign: 'center',
    color: th.colors.labelPrimary,
  },
  answerPreviewText: {
    marginTop: th.space.xs,
  },
}));
