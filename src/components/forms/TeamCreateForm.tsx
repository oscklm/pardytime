import { View } from "react-native";
import { useAppForm } from ".";
import { StyleSheet } from "react-native-unistyles";
import { z } from "zod";
import { teamSchema } from "@/convex/teams/schema";
import Text from "../ui/Text";

const teamCreateSchema = teamSchema.pick({
  nickname: true,
  imageId: true,
});

export type TeamCreateValues = z.infer<typeof teamCreateSchema>;

const localDefaultValues: TeamCreateValues = {
  nickname: "",
  imageId: undefined,
};

interface Props {
  defaultValues?: TeamCreateValues;
  onSubmit?: (data: TeamCreateValues) => void;
}

export const TeamCreateForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useAppForm({
    defaultValues: defaultValues || localDefaultValues,
    validators: {
      onChange: teamCreateSchema,
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
      <View>
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
      </View>
      <form.AppForm>
        <form.SubmitButton onPressIn={form.handleSubmit}>
          {defaultValues ? "Update Team" : "Create Team"}
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
