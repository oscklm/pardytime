import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { ImageInput } from "../ui/ImageInput";

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
