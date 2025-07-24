import BoardCard from '@/components/BoardCard';
import { GameCreateForm } from '@/components/forms/GameCreateForm';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/layout/Modal';
import { Button } from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import TextInput from '@/components/ui/TextInput';
import XStack from '@/components/ui/XStack';
import YStack from '@/components/ui/YStack';
import { api } from '@/convex/_generated/api';
import type { Doc, Id } from '@/convex/_generated/dataModel';
import { useUser } from '@/providers/user-provider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function CreateGame() {
  // Local state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [boardId, setBoardId] = useState<Id<'boards'> | undefined>(undefined);
  const [boardLabel, setBoardLabel] = useState<string>(
    'Click to select a board'
  );

  // Hooks
  const navigation = useNavigation();
  const user = useUser();

  // API hooks
  const createGame = useMutation(api.games.mutations.create);
  const boards = useQuery(api.boards.queries.getAll, {});

  const handleCreateGame = async (data: { name: string }) => {
    if (!boardId) {
      alert('Please select a board');
      return;
    }

    const code = await createGame({
      userId: user._id,
      boardId,
      name: data.name,
    });

    navigation.canGoBack() && navigation.goBack();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Game', params: { code } }],
      })
    );
    setIsLoading(false);
  };

  const handleSelectBoard = (board: Doc<'boards'>) => {
    setBoardId(board._id);
    setBoardLabel(board.title);
    setIsModalVisible(false);
  };

  return (
    <>
      <YStack flex={1} gap="lg" pd="lg">
        <YStack py="md">
          <Text variant="subtitle">
            Once you start your game a code will be generated, that others can
            join by scanning or entering into their app.
          </Text>
        </YStack>
        <View>
          <Text variant="label">Game Name</Text>
          <View>
            <TextInput
              editable={false}
              placeholder="Click to select a board"
              value={boardLabel}
              onPress={() => setIsModalVisible(true)}
            />
            <View
              style={{
                position: 'absolute',
                right: 4,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="icon"
                icon="edit"
                onPress={() => setIsModalVisible(true)}
              />
            </View>
          </View>
        </View>

        <GameCreateForm onSubmit={handleCreateGame} isLoading={isLoading} />

        <YStack>
          <XStack gap="md" ai="center" style={{ width: 320 }}>
            <Icon name="clock" size={20} />
            <Text>
              Games are automatically deleted after 24 hours. Don&apos;t worry
              your boards will not be deleted.
            </Text>
          </XStack>
        </YStack>
      </YStack>
      <Modal
        presentationStyle="formSheet"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <YStack gap="md" pd="lg">
          <YStack py="md">
            <Text variant="h2">Pick a board</Text>
            <Text variant="subtitle">Click on the board you want to play.</Text>
          </YStack>
          <FlatList
            data={boards}
            contentContainerStyle={styles.boardListContainer}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectBoard(item)}>
                <BoardCard board={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
          />
        </YStack>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create((th) => ({
  boardListContainer: {
    gap: th.space.md,
  },
}));
