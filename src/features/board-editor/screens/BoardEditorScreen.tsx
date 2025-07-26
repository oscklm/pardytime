import { Button } from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import { usePreventRemoveScreen } from '@/hooks/usePreventRemoveScreen';
import { StackScreenProps } from '@/navigation';
import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Modal } from '../Modal';

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

  usePreventRemoveScreen(true, {
    onCancel: () => {},
  });

  // Minimal Modal usage example
  const [modalVisible, setModalVisible] = useState(false);

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
      <Button
        onPress={() => setModalVisible((prev) => !prev)}
        variant="blue"
        style={{ marginBottom: 16 }}
      >
        Open Modal
      </Button>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Text>This screen is under construction. Please check back later!</Text>
      </ScrollView>
      <Modal
        position="center"
        visible={modalVisible}
        onDismiss={() => setModalVisible((prev) => !prev)}
      >
        <YStack gap="lg">
          <Text variant="h2">Modal Content</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            dignissimos ad excepturi iste debitis laudantium repudiandae
            blanditiis temporibus, esse fugit! Ipsa asperiores inventore eaque
            amet autem praesentium dolores unde molestiae?
          </Text>
          <YStack gap="lg">
            <Button
              size="sm"
              onPress={() => setModalVisible((prev) => !prev)}
              variant="success"
            >
              Accept
            </Button>
            <Button
              size="sm"
              onPress={() => setModalVisible((prev) => !prev)}
              variant="danger"
            >
              Decline
            </Button>
          </YStack>
        </YStack>
      </Modal>
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
