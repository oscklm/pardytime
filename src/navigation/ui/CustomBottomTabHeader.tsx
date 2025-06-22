import type {
	BottomTabHeaderProps,
	BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import type React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export interface CustomBottomTabNavigationOptions
	extends BottomTabNavigationOptions {
	hideTitle?: boolean;
	toolbarItems?: React.ReactNode[];
	headerBgColor?: "purple" | "blue" | "green" | "yellow" | "red" | "orange";
}

interface CustomBottomTabHeaderProps
	extends Omit<BottomTabHeaderProps, "options"> {
	options: CustomBottomTabNavigationOptions;
}

export const CustomBottomTabHeader = ({
	navigation,
	options,
	route,
}: CustomBottomTabHeaderProps) => {
	const { title, hideTitle, toolbarItems, headerBgColor } = options;

	styles.useVariants({
		bgColor: headerBgColor,
	});

	return (
		<View style={styles.header}>
			{!hideTitle && <Text style={styles.titleLabel}>{title}</Text>}
			{toolbarItems && (
				<View style={styles.toolbar}>
					{toolbarItems.map((item, index) => (
						<>
							{item}
							{index < toolbarItems.length - 1 && (
								<View style={styles.toolbarSeparator} />
							)}
						</>
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create((th, rt) => ({
	header: {
		paddingTop: rt.insets.top,
		paddingHorizontal: th.space.lg,
		paddingBottom: th.space.lg,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 145,
		variants: {
			bgColor: {
				purple: {
					backgroundColor: th.colors.purple,
				},
				blue: {
					backgroundColor: th.colors.blue,
				},
				green: {
					backgroundColor: th.colors.green,
				},
				yellow: {
					backgroundColor: th.colors.yellow,
				},
				red: {
					backgroundColor: th.colors.red,
				},
				orange: {
					backgroundColor: th.colors.orange,
				},
			},
		},
	},
	toolbarSeparator: {
		width: 1.25,
		height: 24,
		backgroundColor: th.colors.borderTertiary,
	},
	toolbar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: th.colors.borderSecondary,
		gap: th.space.md,
		borderRadius: th.radius.lg,
		backgroundColor: th.colors.backgroundSecondary,
	},
	titleLabel: {
		fontSize: 34,
		lineHeight: 38,
		fontWeight: "900",
		color: th.colors.labelPrimary,
		variants: {
			bgColor: {
				purple: {
					color: th.colors.white,
				},
				blue: {
					color: th.colors.white,
				},
				green: {
					color: th.colors.white,
				},
				yellow: {
					color: th.colors.white,
				},
				red: {
					color: th.colors.white,
				},
				orange: {
					color: th.colors.white,
				},
			},
		},
	},
}));
