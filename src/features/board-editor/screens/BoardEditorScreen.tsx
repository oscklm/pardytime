import { Modal } from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import TextInput from '@/components/ui/TextInput';
import TouchableBounce from '@/components/ui/TouchableBounce';
import YStack from '@/components/ui/YStack';
import { usePreventRemoveScreen } from '@/hooks/usePreventRemoveScreen';
import { StackScreenProps } from '@/navigation';
import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const BoardEditorScreen: FC<StackScreenProps<'BoardEditor'>> = ({
  navigation,
  route,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handlePressExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabs' }],
    });
  };

  usePreventRemoveScreen(true, {
    onCancel: () => {},
  });

  const toggleModal = () => setModalVisible((p) => !p);

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
      <Button onPress={toggleModal} variant="blue" style={{ marginBottom: 16 }}>
        Open Modal
      </Button>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Text>
          This screen is under construction and currently used for testing
          modals. Please check back later!
        </Text>
        <Text variant="subtitle">Test card showing modal values:</Text>
        <YStack pd="lg">
          <TouchableBounce sensory="light" onPress={toggleModal}>
            <Card>
              <Text variant="h2">{question}</Text>
              <Text>{answer}</Text>
            </Card>
          </TouchableBounce>
        </YStack>
      </ScrollView>

      <Modal
        variant="bottomsheet"
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        opts={{
          backdrop: {
            canDismiss: true,
            enabled: true,
          },
          showCancelBtn: false,
        }}
      >
        <YStack gap="lg">
          <YStack>
            <Text variant="h1">Edit question</Text>
            <Text variant="subtitle">Customize it how you&apos;d like</Text>
          </YStack>
          {/* <GameCreateForm onSubmit={handleSubmit} /> */}
          <YStack>
            <Text variant="label">Question</Text>
            <TextInput value={question} onChangeText={setQuestion} />
          </YStack>
          <YStack>
            <Text variant="label">Answer</Text>
            <TextInput value={answer} onChangeText={setAnswer} />
          </YStack>
          <YStack gap="lg">
            <Button
              size="sm"
              sensory="success"
              onPress={() => {
                toggleModal();
              }}
              variant="success"
            >
              Submit
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
