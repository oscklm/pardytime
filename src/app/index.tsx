import Button from "@/shared/ui/Button";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#04F",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ fontSize: 48, fontWeight: "800", color: "white" }}
        >
          Primary
        </Text>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#F64C43",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ fontSize: 48, fontWeight: "800", color: "white" }}
        >
          Primary
        </Text>
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
    padding: 20,
    gap: 20,
  },
}));
