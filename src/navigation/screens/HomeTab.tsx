import { ActionModal } from '@/components/ActionModal';
import { GameListItem } from '@/components/game/GameListItem';
import { ListEmptyComponent } from '@/components/ListEmptyComponent';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import { api } from '@/convex/_generated/api';
import { useQueryWithStatus } from '@/lib/convex';
import { useUser } from '@/providers/user-provider';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export function HomeTab() {
  const user = useUser();
  const navigation = useNavigation();

  const { data, status, error } = useQueryWithStatus(
    api.games.queries.getAllByOwnerId,
    { ownerId: user._id }
  );

  return (
    <>
      <YStack flex={1} gap="lg" py="lg">
        <YStack flex={1} gap="md">
          <YStack px="lg">
            <Text variant="h2">Your Games</Text>
          </YStack>
          <FlatList
            data={data}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={() => (
              <ListEmptyComponent
                status={status}
                descriptor="games"
                message={error?.message}
              />
            )}
            renderItem={({ item }) => <GameListItem game={item} />}
          />
        </YStack>
      </YStack>
      <ActionModal
        position="center"
        actions={[
          {
            id: 'note',
            label: 'Join Game',
            description: 'Scan a QR code to join a game',
            color: 'green',
            icon: 'qrcode',
            onPress: () => navigation.navigate('Scanner'),
          },
          {
            id: 'game',
            label: 'Start Game',
            description: 'Start a game to play with your friends',
            color: 'pink',
            icon: 'gamepad',
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'CreateGame', params: { gameId: 'new' } }],
                })
              ),
          },
          {
            id: 'board',
            label: 'Build Board',
            description: 'Build your own custom Jeopardy board',
            color: 'orange',
            icon: 'pencil-ruler',
            onPress: () => navigation.navigate('BoardEditor', {}),
          },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create((th, rt) => ({
  contentContainer: {
    gap: th.space.lg,
    paddingHorizontal: th.space.lg,
  },
}));
