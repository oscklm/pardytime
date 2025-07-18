import { View } from "react-native";
import { useAppForm } from ".";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { teamSchema } from "@/convex/teams/schema";
import Text from "../ui/Text";

const createTeamSchema = teamSchema.omit({
  gameId: true,
  ownerId: true,
  score: true,
});

export type TeamCreationValues = z.infer<typeof createTeamSchema>;

const defaultValues: TeamCreationValues = {
  nickname: "",
  imageId: undefined,
};

interface Props {
  onSubmit?: (data: TeamCreationValues) => void;
}

export const CreateTeamForm = ({ onSubmit }: Props) => {
  const form = useAppForm({
    defaultValues: defaultValues,
    validators: {
      onChange: createTeamSchema,
    },
    onSubmit: ({ value }) => onSubmit?.(value),
  });

  return (
    <View style={styles.container}>
      <form.AppField
        name="nickname"
        children={(field) => (
          <View>
            <Text variant="label">Team Nickname</Text>
            <field.TextInput
              placeholder="Enter team nickname"
              value={field.state.value}
              onChangeText={field.handleChange}
            />
          </View>
        )}
      />
      <form.AppField
        name="imageId"
        children={(field) => (
          <View>
            <Text variant="label">Team Image</Text>
            <field.ImageInput
              value={field.state.value}
              onChange={field.handleChange}
              disabled={form.state.isSubmitting}
            />
          </View>
        )}
      />
      <form.AppForm>
        <form.SubmitButton variant="success" onPressIn={form.handleSubmit}>
          Start Game
        </form.SubmitButton>
      </form.AppForm>
    </View>
  );
};

const styles = StyleSheet.create((th) => ({
  container: {
    gap: th.space.xl,
  },
}));
