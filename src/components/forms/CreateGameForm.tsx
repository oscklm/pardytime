import { View } from "react-native";
import { useAppForm } from ".";
import { type } from "arktype";
import { StyleSheet } from "react-native-unistyles";

interface Props {
  defaultValues?: {
    name?: string;
  };
  onSubmit?: (data: { name: string }) => void;
}

export const CreateGameForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useAppForm({
    defaultValues: {
      name: "",
    },
    validators: {
      // Pass a schema or function to validate
      onChange: type({
        name: "string >= 3",
      }),
    },
    onSubmit: ({ value }) => onSubmit?.(value),
  });

  return (
    <View style={styles.container}>
      <form.AppField
        name="name"
        children={(field) => (
          <field.TextInput
            placeholder="Enter game name"
            value={field.state.value}
            onChangeText={field.handleChange}
          />
        )}
      />
      {/* Components in `form.AppForm` have access to the form context */}
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
