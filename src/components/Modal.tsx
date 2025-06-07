import { type ModalProps, Modal as RNModal } from "react-native";

export function Modal(props: ModalProps) {
	return (
		<RNModal animationType="slide" presentationStyle="pageSheet" {...props} />
	);
}
