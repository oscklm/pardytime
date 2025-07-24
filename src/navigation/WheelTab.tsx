import SpinningWheel, { Team } from '@/components/SpinningWheel';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

const WheelTab: React.FC = () => {
  const { theme } = useUnistyles();
  const teams: Team[] = [
    { name: 'Team Red', color: theme.colors.red },
    { name: 'Team Blue', color: theme.colors.blue },
    { name: 'Team Green', color: theme.colors.green },
    { name: 'Team Yellow', color: theme.colors.yellow },
    { name: 'Team Purple', color: theme.colors.purple },
  ];

  return <SpinningWheel teams={teams} hitDetectionMode="continuous" />;
};

export default WheelTab;
