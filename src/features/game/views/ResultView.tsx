import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ActionModal } from '@/components/ActionModal';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import { TeamResultCard } from '../components/TeamResultCard';
import { useGameContext } from '../hooks/useGame';
import { useGameController } from '../hooks/useGameController';

export const ResultView = () => {
  const { resetToLobby } = useGameController();
  const { teams } = useGameContext();

  const highestScoringTeam = useMemo(() => {
    if (teams.every((team) => team.score === 0)) {
      return null;
    }
    return teams.reduce(
      (max, team) => (team.score > max.score ? team : max),
      teams[0]
    );
  }, [teams]);

  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => b.score - a.score);
  }, [teams]);

  return (
    <>
      <View style={styles.container}>
        <YStack ai="center">
          <Text variant="h1">Results</Text>
        </YStack>
        <View style={styles.teamListContainer}>
          {sortedTeams.map((team, index) => (
            <TeamResultCard
              key={team._id}
              team={team}
              index={index}
              isTop={team._id === highestScoringTeam?._id}
            />
          ))}
        </View>
      </View>
      <ActionModal
        icon="hand-sparkles"
        actions={[
          {
            id: 'back-to-lobby',
            label: 'Back to lobby',
            icon: 'arrow-left',
            color: 'yellow',
            onPress: () => resetToLobby(),
          },
          // {
          //   id: "reset-game",
          //   label: "Reset game",
          //   icon: "redo",
          //   color: "red",
          //   onPress: () => resetGame(),
          // },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create((th, rt) => ({
  container: {
    flex: 1,
    paddingTop: th.space.md,
    paddingBottom: rt.insets.bottom + 40,
  },
  teamListContainer: {
    flex: 1,
    paddingTop: th.space.lg,
    paddingHorizontal: th.space.md,
    gap: th.space.lg,
  },
}));
