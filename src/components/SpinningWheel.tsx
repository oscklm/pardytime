import React, { useState, useMemo, useRef } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
  useAnimatedReaction,
} from "react-native-reanimated";
import { BlurMask, Canvas, Path, Skia } from "@shopify/react-native-skia";
import Button from "./ui/Button";

import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native-unistyles";

const WHEEL_SIZE = 300;
const RADIUS = WHEEL_SIZE / 2;

const DEBUG_ENABLED = false;

export interface Team {
  name: string;
  color: string;
}

interface WheelConfig {
  segmentCount: number;
  segmentAngle: number;
  rotationOffset: number;
  teams: Team[];
  rotationMap: number[];
}

interface Props {
  teams: Team[];
  // New prop to control hit detection behavior
  hitDetectionMode?: "continuous" | "onComplete" | "disabled";
  // Randomness offset as percentage of segment (0-1)
  randomnessOffset?: number;
  // Range of extra spins [min, max]
  extraSpinsRange?: [number, number];
}

const SpinningWheel: React.FC<Props> = ({
  teams,
  hitDetectionMode = "continuous",
  randomnessOffset = 0.5,
  extraSpinsRange = [8, 12],
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hitSegmentIndex, setHitSegmentIndex] = useState<number | null>(null);
  const [willHitSegmentIndex, setWillHitSegmentIndex] = useState<number | null>(
    null
  );
  const [targetRotation, setTargetRotation] = useState<number | null>(null);
  const rotation = useSharedValue(0);

  // Calculate all wheel properties upfront
  const wheelConfig: WheelConfig = useMemo(() => {
    const segmentCount = teams.length;
    const segmentAngle = 360 / segmentCount;

    const rotationMap = teams.map((_, index) => {
      const segmentCenter = index * segmentAngle + segmentAngle / 2;
      let targetRotation = (270 - segmentCenter) % 360;
      if (targetRotation < 0) targetRotation += 360;
      return targetRotation;
    });

    if (DEBUG_ENABLED) {
      console.log("Wheel Config:", {
        segmentCount,
        segmentAngle: segmentAngle.toFixed(2),
        rotationMap: rotationMap.map((r) => r.toFixed(1)),
      });
    }

    return {
      segmentCount,
      segmentAngle,
      rotationOffset: segmentAngle / 2,
      teams,
      rotationMap,
    };
  }, [teams]);

  const createSegmentPath = (index: number): any => {
    const path = Skia.Path.Make();

    const startAngle = index * wheelConfig.segmentAngle;
    const startRad = (startAngle * Math.PI) / 180;

    const startX = RADIUS + RADIUS * Math.cos(startRad);
    const startY = RADIUS + RADIUS * Math.sin(startRad);

    path.moveTo(RADIUS, RADIUS);
    path.lineTo(startX, startY);

    const sweepAngle = wheelConfig.segmentAngle;
    const useCenter = false;

    path.arcToOval(
      { x: 0, y: 0, width: WHEEL_SIZE, height: WHEEL_SIZE },
      startAngle,
      sweepAngle,
      useCenter
    );

    path.close();

    return path;
  };

  const segmentPaths = useMemo(() => {
    return teams.map((_, index) => createSegmentPath(index));
  }, [teams, wheelConfig]);

  // Hit detection function
  const detectHitSegment = (currentRotation: number) => {
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;
    const originalAngleAtPointer = (270 - normalizedRotation + 360) % 360;
    const segmentIndex =
      Math.floor(originalAngleAtPointer / wheelConfig.segmentAngle) %
      teams.length;

    return segmentIndex;
  };

  // Update hit detection - now respects the mode
  const updateHitDetection = (rotationValue: number) => {
    if (hitDetectionMode === "disabled") return;

    // Only update during spin if mode is continuous
    if (hitDetectionMode === "continuous" || !isSpinning) {
      const hitIndex = detectHitSegment(rotationValue);
      if (hitIndex !== hitSegmentIndex) {
        setHitSegmentIndex(hitIndex);

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);

    // If mode is 'onComplete', update hit detection now
    if (hitDetectionMode === "onComplete") {
      const hitIndex = detectHitSegment(rotation.value);
      setHitSegmentIndex(hitIndex);
    }
  };

  // React to rotation changes
  useAnimatedReaction(
    () => rotation.value,
    (rotationValue, previousValue) => {
      if (!targetRotation) return;

      if (rotationValue >= targetRotation * 0.8) {
        if (hitDetectionMode !== "disabled") {
          runOnJS(updateHitDetection)(rotation.value);
        }
      }
    }
  );

  const resetWheel = () => {
    rotation.value = 0;
    setHitSegmentIndex(null);
    setWillHitSegmentIndex(null);
    setTargetRotation(null);
    setIsSpinning(false);
  };

  const spin = () => {
    if (isSpinning) return;

    resetWheel();

    setIsSpinning(true);

    // Clear hit detection during spin if mode is 'onComplete'
    if (hitDetectionMode === "onComplete") {
      setHitSegmentIndex(null);
    }

    const targetTeamIndex = Math.floor(
      Math.random() * wheelConfig.teams.length
    );
    setWillHitSegmentIndex(targetTeamIndex);

    const targetTeam = wheelConfig.teams[targetTeamIndex];

    // Get base rotation for perfect center
    const baseRotation = wheelConfig.rotationMap[targetTeamIndex];

    // Add randomness offset within the segment
    const maxOffset = wheelConfig.segmentAngle * randomnessOffset;
    const randomOffset = (Math.random() - 0.5) * maxOffset;

    // Generate random extra spins within the specified range
    const [minSpins, maxSpins] = extraSpinsRange;
    const extraSpins =
      Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;

    const targetRotation = extraSpins * 360 + baseRotation + randomOffset; // Total rotation

    setTargetRotation(targetRotation);

    // Set spin duration based on total spins, so less spins = faster and more spins = slower
    const spinDuration = Math.max(9000, 12000 - (extraSpins - 3) * 200);

    if (DEBUG_ENABLED) {
      console.log("=== SPIN DEBUG ===");
      console.log(
        "Target team:",
        targetTeam.name,
        `(index: ${targetTeamIndex})`
      );
      console.log("Base rotation:", baseRotation, "°");
      console.log("Random offset:", randomOffset.toFixed(1), "°");
      console.log("Final rotation:", targetRotation, "°");
    }

    rotation.value = 0;

    // Overshoot and fallback animation
    const overshootAmount = 20; // degrees
    // Phase 1: Spin past the target
    rotation.value = withTiming(
      targetRotation + overshootAmount,
      {
        duration: Math.floor(spinDuration * 0.85),
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          rotation.value = withTiming(
            targetRotation,
            {
              duration: 500,
              easing: Easing.in(Easing.bounce),
            },
            (done) => {
              if (done) {
                runOnJS(handleSpinComplete)();
                runOnJS(setTargetRotation)(null);
              }
            }
          );
        }
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // Create a paint object with a blur effect

  return (
    <View style={styles.wheelContainer}>
      {DEBUG_ENABLED && (
        <Text style={{ marginBottom: 20, fontSize: 16 }}>
          Teams: {wheelConfig.segmentCount} | Angle:{" "}
          {wheelConfig.segmentAngle.toFixed(1)}° | Mode: {hitDetectionMode}
        </Text>
      )}

      <View style={{ position: "relative" }}>
        {/* Pointer */}
        <View style={styles.pointer} />

        {/* Wheel */}
        <Animated.View style={animatedStyle}>
          <Canvas style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
            {wheelConfig.teams.map((team, index) => {
              const isHit = hitSegmentIndex === index;

              const opacity =
                isHit && hitDetectionMode !== "disabled"
                  ? 1.0
                  : hitDetectionMode !== "disabled"
                    ? isSpinning
                      ? 0.65
                      : 0.4
                    : 1;

              return (
                <Path
                  key={`${team.name}-${index}`}
                  path={segmentPaths[index]}
                  color={team.color}
                  style="fill"
                  opacity={opacity}
                >
                  <BlurMask blur={12} style="inner" />
                </Path>
              );
            })}
          </Canvas>
        </Animated.View>

        {/* Center circle */}
        <View style={styles.centerCircleContainer}>
          <View style={styles.centerCircle} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button size="lg" sensory="light" onPress={spin} disabled={isSpinning}>
          SPIN IT!
        </Button>
      </View>

      {/* Debug info */}
      {DEBUG_ENABLED && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
            Current Hit:{" "}
            {hitSegmentIndex !== null
              ? wheelConfig.teams[hitSegmentIndex]?.name
              : "None"}
          </Text>
          <Text style={{ fontSize: 14 }}>
            Will land on:{" "}
            {willHitSegmentIndex !== null
              ? wheelConfig.teams[willHitSegmentIndex]?.name
              : "None"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create(() => ({
  wheelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pointer: {
    position: "absolute",
    top: -15,
    left: RADIUS - 15,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    zIndex: 10,
  },
  centerCircleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerCircle: {
    width: 45,
    height: 45,
    borderRadius: 999,
    backgroundColor: "white",
  },
  spinButton: {
    marginTop: 20,
  },
  debugInfo: {
    marginTop: 20,
    alignItems: "center",
  },
}));

export default SpinningWheel;
