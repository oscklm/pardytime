import {
  Canvas,
  DiffRect,
  interpolateColors,
  rect,
  rrect,
  Skia,
} from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

const innerDimension = 300;

export const ScannerOverlay = ({
  isScanned,
  parentWidth,
  parentHeight,
}: {
  isScanned: boolean;
  parentWidth: number;
  parentHeight: number;
}) => {
  const progress = useSharedValue(0);

  const outer = useMemo(
    () => rrect(rect(0, 0, parentWidth, parentHeight), 0, 0),
    [parentWidth, parentHeight]
  );

  const inner = useMemo(
    () =>
      rrect(
        rect(
          parentWidth / 2 - innerDimension / 2,
          parentHeight / 2 - innerDimension / 2,
          innerDimension,
          innerDimension
        ),
        50,
        50
      ),
    [parentWidth, parentHeight]
  );

  useEffect(() => {
    if (isScanned) {
      progress.value = withRepeat(
        withTiming(1, { duration: 250, easing: Easing.linear }),
        4, // Blink twice (on-off, on-off)
        true // Yoyo effect (reverses the animation)
      );
    } else {
      progress.value = 0;
    }
  }, [isScanned, progress]);

  const animatedColor = useDerivedValue(() => {
    return interpolateColors(
      progress.value,
      [0, 1],
      [Skia.Color('black'), Skia.Color('lime')]
    );
  }, [progress]);

  return (
    <Canvas style={styles.container}>
      <DiffRect
        inner={inner}
        outer={outer}
        color={animatedColor}
        opacity={0.5}
      />
    </Canvas>
  );
};

const styles = StyleSheet.create((_th) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
}));
