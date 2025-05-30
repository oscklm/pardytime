import { api } from "@/convex/_generated/api";
import TouchableBounce from "@/shared/ui/TouchableBounce";
import { useQuery } from "convex/react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
  const boards = useQuery(api.boards.queries.getAll);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        {boards?.map(({ _id, title }) => <Text key={_id}>{title}</Text>)}
      </View>
      <TouchableBounce
        sensory="light"
        onPress={() => {
          console.log("Button pressed");
        }}
      >
        <View
          style={{
            backgroundColor: "lightblue",
            paddingHorizontal: 25,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "black" }}>Press Me</Text>
        </View>
      </TouchableBounce>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
}));
