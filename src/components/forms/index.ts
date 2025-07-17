import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import Text from "../ui/Text";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
    Text,
  },
  formComponents: {
    SubmitButton: Button,
  },
  fieldContext,
  formContext,
});
