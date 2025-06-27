import { FontAwesome6 } from "@expo/vector-icons";
import { withUnistyles } from "react-native-unistyles";

export const Icon = withUnistyles(FontAwesome6, (th) => ({
	color: th.colors.labelPrimary,
}));
