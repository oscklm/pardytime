import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAppForm } from '.';
import Text from '../ui/Text';

interface Props {
  isLoading?: boolean;
  defaultValues?: {
    name?: string;
  };
  onSubmit?: (data: { name: string }) => void;
}

export const GameCreateForm = ({
  defaultValues,
  isLoading,
  onSubmit,
}: Props) => {
  const form = useAppForm({
    defaultValues: {
      name: '',
    },
    validators: {},
    onSubmit: ({ value }) => onSubmit?.(value),
  });

  return (
    <View style={styles.container}>
      <form.AppField
        name="name"
        children={(field) => (
          <View>
            <Text variant="label">Game Name</Text>
            <field.TextInput
              placeholder="Enter game name"
              value={field.state.value}
              onChangeText={field.handleChange}
            />
          </View>
        )}
      />
      <form.AppForm>
        <form.SubmitButton
          variant="success"
          onPressIn={form.handleSubmit}
          disabled={isLoading}
        >
          Submit
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
