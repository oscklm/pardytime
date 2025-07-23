import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { ActionSheetIOS } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import type { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@/providers/user-provider";
import { GameProvider, type GameState } from "./context/GameProvider";
import { BoardView } from "./views/BoardView";
import { LobbyView } from "./views/LobbyView";
import { ResultView } from "./views/ResultView";

const StatusToViewComponent: Record<Doc<"games">["status"], React.FC> = {
  pending: LobbyView,
  active: BoardView,
  completed: ResultView,
} as const;

interface GameViewProps extends GameState {}

const GameView = ({ game, board, teams }: GameViewProps) => {
  const navigation = useNavigation();

  const user = useUser();

  const isOwner = useMemo(() => {
    return game.ownerId === user._id;
  }, [game.ownerId, user._id]);

  const handleQuitGame = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Are you sure u want to leave?",
        options: ["Cancel", "Leave now"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabs" }],
            })
          );
        }
      }
    );
  };

  const activeQuestion = useMemo(() => {
    if (!game.activeQuestionId) return null;

    // Find the actual question, not just the category
    for (const category of board.enriched.categories) {
      const question = category.questions.find(
        (q) => q._id === game.activeQuestionId
      );
      if (question) {
        return question;
      }
    }
    return null;
  }, [game.activeQuestionId]);

  useEffect(() => {
    if (game) {
      navigation.setOptions({
        title: board.title,
        headerLeft: () => (
          <TouchableBounce
            style={styles.headerButton}
            onPress={() => handleQuitGame()}
          >
            <Text style={styles.headerButtonText}>Leave</Text>
          </TouchableBounce>
        ),
      });
    }
  }, [game]);

  const ViewComponent = StatusToViewComponent[game.status];

  return (
    <GameProvider
      game={game}
      board={board}
      activeQuestion={activeQuestion}
      teams={teams}
      isOwner={isOwner}
    >
      <ViewComponent />
    </GameProvider>
  );
};

const styles = StyleSheet.create((th) => ({
  headerButton: {
    paddingHorizontal: th.space.sm,
  },
  headerButtonText: {
    fontSize: 16,
    lineHeight: 16 * 1.3,
    fontWeight: "700",
    color: th.colors.labelSecondary,
  },
}));

export { GameView };
