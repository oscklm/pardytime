import { useNavigation, usePreventRemove } from '@react-navigation/native';
import { Alert, Platform } from 'react-native';

const DEFAULT_TITLE = 'Unsaved Changes';
const DEFAULT_MESSAGE =
  'You have unsaved changes. Do you want to discard them?';
/**
 * Custom hook to prevent screen removal when there are unsaved changes.
 * Prompts the user with a confirmation dialog before allowing navigation.
 *
 * @param shouldPrevent - Whether to prevent screen removal.
 * @param title - Title of the confirmation dialog.
 * @param message - Message of the confirmation dialog.
 * @param actions - Optional actions for confirm and cancel.
 */

export const usePreventRemoveScreen = (
  shouldPrevent: boolean,
  opts: {
    title?: string;
    message?: string;
    onCancel?: () => void;
  }
) => {
  const navigation = useNavigation();
  usePreventRemove(shouldPrevent, ({ data }) => {
    const { onCancel, title, message } = opts;
    if (Platform.OS === 'web') {
      // Alert is not supported on web, so we can use confirm
      const discard = confirm(
        'You have unsaved changes. Discard them and leave the screen?'
      );

      if (discard) {
        navigation.dispatch(data.action);
      }
    } else {
      // Prompt the user before leaving the screen
      Alert.alert(title || DEFAULT_TITLE, message || DEFAULT_MESSAGE, [
        {
          text: "Don't leave",
          style: 'cancel',
          onPress: onCancel || (() => {}),
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(data.action),
        },
      ]);
    }
  });
};
