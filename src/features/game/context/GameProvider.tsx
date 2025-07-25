import type { Doc } from '@/convex/_generated/dataModel';
import type { BoardEnrichedResult } from '@/convex/types';
import { createContext, type PropsWithChildren } from 'react';

export interface GameState {
  game: Doc<'games'>;
  teams: Doc<'teams'>[];
  activeQuestion: Doc<'questions'> | null;
  board: BoardEnrichedResult;
  isOwner: boolean;
}

export const GameContext = createContext<GameState>({} as GameState);

type GameViewProps = PropsWithChildren<GameState>;

const GameProvider = ({ children, ...state }: GameViewProps) => {
  return <GameContext value={state}>{children}</GameContext>;
};

export { GameProvider };
