import {
  TeamCreateForm,
  TeamCreateValues,
} from '@/components/forms/TeamCreateForm';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import { api } from '@/convex/_generated/api';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery } from 'convex/react';
import { ScreenProps } from '..';

export function EditTeamScreen({ route }: ScreenProps<'EditTeam'>) {
  const navigation = useNavigation();

  const currentTeam = useQuery(api.teams.queries.getById, {
    id: route.params.teamId,
  });

  const updateTeam = useMutation(api.teams.mutations.updateTeam);

  const handleUpdateTeam = async (values: TeamCreateValues) => {
    console.log(currentTeam);
    if (!currentTeam) {
      alert('Team not found');
      return;
    }
    await updateTeam({
      teamId: route.params.teamId,
      values: {
        gameId: currentTeam.gameId,
        ownerId: currentTeam.ownerId,
        nickname: values.nickname,
        imageId: values.imageId,
      },
    });
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <YStack flex={1} gap="lg" pd="lg">
      <Text variant="h2">Edit team</Text>
      <TeamCreateForm defaultValues={currentTeam} onSubmit={handleUpdateTeam} />
    </YStack>
  );
}
