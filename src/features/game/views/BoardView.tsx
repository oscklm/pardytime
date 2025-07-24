import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ActionModal } from '@/components/ActionModal';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import type { Id } from '@/convex/_generated/dataModel';
import { QuestionCard } from '@/features/game/components/QuestionCard';
import { ActiveQuestionDisplay } from '../components/ActiveQuestionDisplay';
import { TeamControlModal } from '../components/TeamControlModal';
import { TeamScoreTile } from '../components/TeamScoreTile';
import { useGameContext } from '../hooks/useGame';
import { useGameController } from '../hooks/useGameController';

export const BoardView = () => {
  const [focusedTeamId, setFocusedTeamId] = useState<Id<'teams'> | undefined>(
    undefined
  );

  const { game, board, activeQuestion, teams, isOwner } = useGameContext();

  const {
    setActiveQuestion,
    resetGame,
    resetToLobby,
    handleTeamAnswered,
    endGame,
  } = useGameController();

  const focusedTeam = useMemo(() => {
    return teams.find((team) => team._id === focusedTeamId) ?? null;
  }, [focusedTeamId, teams]);

  const highestScoringTeam = useMemo(() => {
    // If no score are highest, thus all being 0 or none being in plus
    if (teams.every((team) => team.score === 0)) {
      return null;
    }

    return teams.reduce(
      (max, team) => (team.score > max.score ? team : max),
      teams[0]
    );
  }, [teams]);

  const isCurrentQuestionAnswered = useMemo(() => {
    if (!game.activeQuestionId) return false;
    return game.answeredQuestions.includes(game.activeQuestionId);
  }, [game.activeQuestionId, game.answeredQuestions]);

  // Compute if any team has a score greater than 0
  const shouldShowHelp = useMemo(() => {
    return !!!teams.some((team) => team.score > 0) && activeQuestion;
  }, [teams, activeQuestion]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.teamScoreContainer}>
          {teams.map((team, index) => (
            <TeamScoreTile
              key={team._id}
              team={team}
              teamCount={teams.length}
              index={index}
              isHighestScoring={team._id === highestScoringTeam?._id}
              disabled={!isOwner}
              onPress={() => setFocusedTeamId(team._id)}
            />
          ))}
        </View>
        <View>
          {shouldShowHelp && (
            <Text
              variant="subtitle"
              style={{
                fontSize: 13,
                lineHeight: 16,
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Click on any team you want to award points
            </Text>
          )}
          <ActiveQuestionDisplay
            question={activeQuestion}
            isAnswered={isCurrentQuestionAnswered}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {board.enriched.categories.map((category) => (
            <YStack key={category._id} gap="md">
              <Text variant="h3">{category.title}</Text>
              {category.questions.map((question) => {
                const isSelected = game.activeQuestionId === question._id;
                const isAnswered = game.answeredQuestions.includes(
                  question._id
                );
                return (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    isAnswered={isAnswered}
                    isSelected={isSelected}
                    disabled={!isOwner}
                    onPress={() => setActiveQuestion(question._id)}
                  />
                );
              })}
            </YStack>
          ))}
        </ScrollView>
      </View>

      <TeamControlModal
        visible={!!focusedTeam}
        onRequestClose={() => setFocusedTeamId(undefined)}
        team={focusedTeam}
        onAnswerSelected={handleTeamAnswered}
      />
      {isOwner && (
        <ActionModal
          icon="hand-sparkles"
          actions={[
            {
              id: 'back-to-lobby',
              label: 'Back to lobby',
              icon: 'arrow-left',
              description: 'Pause game, and go back to lobby',
              color: 'yellow',
              onPress: () => resetToLobby(),
            },
            {
              id: 'end-game',
              label: 'Finish game',
              icon: 'check',
              description: 'End the game and calculate scores',
              color: 'green',
              onPress: () => endGame(),
            },
            {
              id: 'reset-game',
              label: 'Reset game',
              description: 'Reset all scores and questions',
              icon: 'redo',
              color: 'red',
              onPress: () => resetGame(),
            },
          ]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create((th) => ({
  container: {
    gap: th.space.md,
    _web: {
      padding: th.space.lg,
    },
  },
  teamScoreContainer: {
    flexDirection: 'row',
    gap: th.space.md,
    marginVertical: th.space.md,
  },
  contentContainer: {
    gap: th.space.lg,
    paddingBottom: 300,
  },
}));
