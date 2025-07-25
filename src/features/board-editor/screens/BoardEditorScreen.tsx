import { Button } from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { StackScreenProps } from '@/navigation';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const BoardEditorScreen: FC<StackScreenProps<'BoardEditor'>> = ({
  navigation,
  route,
}) => {
  const handlePressExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabs' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            icon="close"
            size="sm"
            iconSize={18}
            variant="danger"
            onPress={handlePressExit}
          />
        </View>
        <Text variant="h2">Board Editor</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Text>This screen is under construction. Please check back later!</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    paddingHorizontal: th.space.lg,
    gap: th.space.md,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
