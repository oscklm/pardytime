import { useNavigation } from '@react-navigation/native';

import {
  TeamCreateForm,
  TeamCreateValues,
} from '@/components/forms/TeamCreateForm';
import Text from '@/components/ui/Text';
import YStack from '@/components/ui/YStack';
import { api } from '@/convex/_generated/api';
import { useUser } from '@/providers/user-provider';
import { useMutation } from 'convex/react';
import { ScreenProps } from '..';

export function CreateTeam({ route }: ScreenProps<'CreateTeam'>) {
  const navigation = useNavigation();
  const { _id: userId } = useUser();

  const createTeam = useMutation(api.teams.mutations.createTeam);

  const handleCreateTeam = async (values: TeamCreateValues) => {
    await createTeam({
      values: {
        gameId: route.params.gameId,
        ownerId: userId,
        nickname: values.nickname,
        score: 0,
        imageId: values.imageId,
      },
    });
    navigation.canGoBack() && navigation.goBack();
  };

  return (
    <YStack flex={1} gap="lg" pd="lg">
      <Text variant="h2">Create a team</Text>
      <TeamCreateForm onSubmit={handleCreateTeam} />
    </YStack>
  );
}
