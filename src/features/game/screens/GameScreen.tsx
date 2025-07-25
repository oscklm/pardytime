import LoadingView from '@/components/LoadingView';
import YStack from '@/components/ui/YStack';
import { api } from '@/convex/_generated/api';
import { GameView } from '@/features/game/GameView';
import { useQueryWithStatus } from '@/lib/convex';
import { RootStackParamList } from '@/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from 'convex/react';
import { useEffect } from 'react';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

export function GameScreen({ route }: ScreenProps) {
  const navigation = useNavigation();

  const {
    data: game,
    status: gameStatus,
    error: gameError,
  } = useQueryWithStatus(
    api.games.queries.getByGameCode,
    route.params.code
      ? {
          code: route.params.code,
        }
      : 'skip'
  );

  const board = useQuery(
    api.boards.queries.getByIdEnriched,
    game?.boardId
      ? {
          boardId: game.boardId,
        }
      : 'skip'
  );

  const teams = useQuery(
    api.games.queries.getTeamsByGameId,
    game ? { gameId: game._id } : 'skip'
  );

  useEffect(() => {
    if (gameStatus === 'error' && gameError) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabs' }],
      });
    }
  }, [gameStatus, gameError, navigation]);

  if (!game || !board) {
    return <LoadingView />;
  }

  return (
    <YStack flex={1} pd="md">
      <GameView
        game={game}
        board={board}
        activeQuestion={null}
        teams={teams ?? []}
        isOwner={false}
      />
    </YStack>
  );
}
