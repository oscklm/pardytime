import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { AnimatedSpinner } from "./AnimatedSpinner";

interface LoadingViewProps {
  message?: string;
}

const LoadingView = ({ message }: LoadingViewProps) => {
  return (
    <View style={styles.container}>
      <AnimatedSpinner colored opacity={0.5} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    alignItems: "center",
    justifyContent: "center",
    gap: th.space.md,
    backgroundColor: th.colors.backgroundPrimary,
  },
  indicator: {
    color: th.colors.labelPrimary,
  },
}));

export default LoadingView;
