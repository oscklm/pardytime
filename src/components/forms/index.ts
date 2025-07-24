import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Button } from '../ui/Button';
import { ImageInput } from '../ui/ImageInput';
import Text from '../ui/Text';
import TextInput from '../ui/TextInput';

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
    ImageInput,
    Text,
  },
  formComponents: {
    SubmitButton: Button,
  },
  fieldContext,
  formContext,
});
