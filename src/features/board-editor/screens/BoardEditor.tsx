import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const Comp = () => {
  return (
    <View style={styles.container}>
      <Text>Comp</Text>
    </View>
  );
};

const styles = StyleSheet.create((th) => ({
  container: {
    gap: th.space.md,
  },
}));
