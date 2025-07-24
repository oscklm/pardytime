import type { Doc, Id } from '@/convex/_generated/dataModel';
import { config } from '@/lib/config';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Button } from '../ui/Button';
import { Image } from '../ui/Image';
import Text from '../ui/Text';
import XStack from '../ui/XStack';
import YStack from '../ui/YStack';

interface Props {
  gameId: Id<'games'>;
  teams: Doc<'teams'>[];
}

const TeamList = ({ gameId, teams }: Props) => {
  const { theme } = useUnistyles();
  const navigation = useNavigation();

  const handleEditTeam = async (teamId: Id<'teams'>) => {
    navigation.navigate('EditTeam', {
      teamId,
    });
  };

  return (
    <YStack flex={1} gap="lg">
      <XStack ai="center" jc="between">
        <Text variant="h2">Teams</Text>
        <Button
          icon="plus"
          size="sm"
          screen="CreateTeam"
          disabled={teams.length === 5}
          params={{ gameId }}
        >
          Add Team
        </Button>
      </XStack>
      <FlatList
        data={teams}
        ListEmptyComponent={
          <Text variant="subtitle">
            No teams yet. Add a team to get started.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.teamCard,
                { backgroundColor: theme.colors[config.teamColors[index]] },
              ]}
            >
              <View style={styles.deleteButton}>
                <Button
                  variant="icon"
                  size="sm"
                  iconSize={14}
                  icon="edit"
                  onPress={() => handleEditTeam(item._id)}
                />
              </View>
              <Image
                storageId={item.imageId}
                style={styles.teamImage}
                width={300}
              />
              <Text style={styles.nicknameLabel}>{item.nickname}</Text>
            </View>
          );
        }}
      />
    </YStack>
  );
};

const styles = StyleSheet.create((th) => ({
  contentContainer: {
    gap: th.space.lg,
  },
  teamImage: {
    width: 75,
    height: 75,
    backgroundColor: th.colors.backgroundPrimary,
    borderRadius: th.radius.md,
  },
  deleteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: th.colors.backgroundPrimary,
    borderRadius: th.radius.md,
  },
  teamCard: {
    padding: th.space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: th.space.lg,
    backgroundColor: th.colors.backgroundSecondary,
    borderRadius: th.radius.md,
  },
  nicknameLabel: {
    fontSize: 16,
    lineHeight: 16 * 1.3,
    fontWeight: '700',
    color: th.colors.white,
  },
}));

export default TeamList;
