import { useContext } from 'react';
import { GameContext } from '../context/GameProvider';

export const useGameContext = () => {
  const ctx = useContext(GameContext);

  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return ctx;
};
