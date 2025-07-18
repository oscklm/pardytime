import { useNavigation } from "@react-navigation/native";

import { useMutation } from "convex/react";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { ScreenProps } from "..";
import {
  CreateTeamForm,
  TeamCreationValues,
} from "@/components/forms/CreateTeamForm";
import { useUser } from "@/providers/user-provider";

export function CreateTeam({ route }: ScreenProps<"CreateTeam">) {
  const navigation = useNavigation();
  const { _id: userId } = useUser();

  const createTeam = useMutation(api.teams.mutations.createTeam);

  const handleCreateTeam = async (values: TeamCreationValues) => {
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
      <CreateTeamForm onSubmit={handleCreateTeam} />
    </YStack>
  );
}

const styles = StyleSheet.create((th) => ({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: th.space.md,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: th.radius.lg,
    backgroundColor: th.colors.backgroundSecondary,
  },
  boardListContainer: {
    gap: th.space.md,
  },
}));
