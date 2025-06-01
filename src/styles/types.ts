import type { Theme } from "@react-navigation/native";
import type { fonts } from "./fonts";

export interface UnistylesTheme extends Omit<Theme, "dark"> {
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		card: string;
		text: string;
		border: string;
		notification: string;
	};
	fonts: typeof fonts;
}
