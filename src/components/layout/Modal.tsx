import { type ModalProps, Modal as RNModalBase } from "react-native";
import { withUnistyles } from "react-native-unistyles";

const RNModal = withUnistyles(RNModalBase, (th) => ({
  backdropColor: th.colors.backgroundSecondary,
}));

export function Modal(props: ModalProps) {
  return (
    <RNModal animationType="slide" presentationStyle="pageSheet" {...props} />
  );
}
