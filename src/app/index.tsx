import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function Index() {
  const boards = useQuery(api.boards.queries.getAll);
  return (
    <View style={styles.container}>
      {boards?.map(({ _id, title }) => <Text key={_id}>{title}</Text>)}
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
