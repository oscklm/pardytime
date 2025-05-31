import ColorPreview from "@/shared/components/ColorPreview";
import Button from "@/shared/ui/Button";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>Theme colors</Text>
        <View style={styles.colorsContainer}>
          <ColorPreview percent={60} color="hsl(252, 87.90%, 42.00%)" />
          <ColorPreview percent={30} color="hsl(158, 74.00%, 60.80%)" />
          <ColorPreview percent={10} color="hsl(252, 36.50%, 50.60%)" />
        </View>
      </View>
      <Button label="Click on me" onPress={() => alert("Button Pressed!")} />
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsl(44, 9%, 69%)",
    padding: 20,
    gap: 20,
  },
  colorsContainer: {
    flexDirection: "row",
    width: 200,
  },
}));
