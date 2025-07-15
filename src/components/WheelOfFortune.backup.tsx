import React, { useState, useMemo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";

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

interface SpinningWheelProps {
  teams: Team[];
  // New prop to control hit detection behavior
  hitDetectionMode?: "continuous" | "onComplete" | "disabled";
  // Randomness offset as percentage of segment (0-1)
  randomnessOffset?: number;
  // Range of extra spins [min, max]
  extraSpinsRange?: [number, number];
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({
  teams,
  hitDetectionMode = "continuous",
  randomnessOffset = 0.5, // 30% of segment by default
  extraSpinsRange = [3, 5], // 3-5 extra spins by default
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hitSegmentIndex, setHitSegmentIndex] = useState<number | null>(null);
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

    console.log("Wheel Config:", {
      segmentCount,
      segmentAngle: segmentAngle.toFixed(2),
      rotationMap: rotationMap.map((r) => r.toFixed(1)),
    });

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
      setHitSegmentIndex(hitIndex);
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

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Clear hit detection during spin if mode is 'onComplete'
    if (hitDetectionMode === "onComplete") {
      setHitSegmentIndex(null);
    }

    const targetTeamIndex = Math.floor(
      Math.random() * wheelConfig.teams.length
    );
    const targetTeam = wheelConfig.teams[targetTeamIndex];

    // Get base rotation for perfect center
    const baseRotation = wheelConfig.rotationMap[targetTeamIndex];

    // Add randomness offset within the segment
    const maxOffset = wheelConfig.segmentAngle * randomnessOffset;
    const randomOffset = (Math.random() - 0.5) * maxOffset;
    const targetRotation = baseRotation + randomOffset;

    // Generate random extra spins within the specified range
    const [minSpins, maxSpins] = extraSpinsRange;
    const extraSpins =
      (Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins) * 360;
    const finalRotation = extraSpins + targetRotation;

    if (DEBUG_ENABLED) {
      console.log("=== SPIN DEBUG ===");
      console.log(
        "Target team:",
        targetTeam.name,
        `(index: ${targetTeamIndex})`
      );
      console.log("Base rotation:", baseRotation, "°");
      console.log("Random offset:", randomOffset.toFixed(1), "°");
      console.log("Target rotation:", targetRotation, "°");
      console.log("Final rotation:", finalRotation, "°");
    }

    rotation.value = 0;

    setTimeout(() => {
      rotation.value = withTiming(
        finalRotation,
        {
          duration: 3000,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        },
        (finished) => {
          if (finished) {
            runOnJS(handleSpinComplete)();
          }
        }
      );
    }, 50);
  };

  const animatedStyle = useAnimatedStyle(() => {
    // Only run hit detection based on mode
    if (hitDetectionMode !== "disabled") {
      runOnJS(updateHitDetection)(rotation.value);
    }

    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ marginBottom: 20, fontSize: 16 }}>
        Teams: {wheelConfig.segmentCount} | Angle:{" "}
        {wheelConfig.segmentAngle.toFixed(1)}° | Mode: {hitDetectionMode}
      </Text>

      <View style={{ position: "relative" }}>
        {/* Pointer */}
        <View
          style={{
            position: "absolute",
            top: -15,
            left: RADIUS - 10,
            width: 0,
            height: 0,
            borderLeftWidth: 10,
            borderRightWidth: 10,
            borderTopWidth: 20,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopColor: "white",
            zIndex: 10,
          }}
        />

        {/* Wheel */}
        <Animated.View style={animatedStyle}>
          <Canvas style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}>
            {wheelConfig.teams.map((team, index) => {
              const isHit = hitSegmentIndex === index;
              const opacity =
                isHit && hitDetectionMode !== "disabled" ? 1.0 : 0.4;

              return (
                <Path
                  key={`${team.name}-${index}`}
                  path={segmentPaths[index]}
                  color={team.color}
                  style="fill"
                  opacity={opacity}
                />
              );
            })}
          </Canvas>
        </Animated.View>

        {/* Center circle */}
        <View
          style={{
            position: "absolute",
            top: RADIUS - 15,
            left: RADIUS - 15,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#333",
            zIndex: 10,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: isSpinning ? "#ccc" : "#007AFF",
          padding: 15,
          marginTop: 30,
          borderRadius: 10,
          minWidth: 120,
          alignItems: "center",
        }}
        onPress={spin}
        disabled={isSpinning}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {isSpinning ? "Spinning..." : "SPIN"}
        </Text>
      </TouchableOpacity>

      {/* Debug info */}
      {DEBUG_ENABLED && (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
            Current Hit:{" "}
            {hitSegmentIndex !== null
              ? wheelConfig.teams[hitSegmentIndex]?.name
              : "None"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SpinningWheel;
