import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

export default function IndexScreen() {
	const boards = useQuery(api.boards.getAll); // You need to implement this query

	return (
		<YStack flex={1} style={styles.container}>
			<XStack pd="lg" ai="center" jc="between">
				<YStack>
					<Text variant="h1">JeopardyTime</Text>
				</YStack>
				<YStack>
					<TouchableBounce
						sensory="light"
						onPress={() => router.push("/changelogs")}
					>
						<FontAwesome size={28} name="newspaper-o" color="black" />
					</TouchableBounce>
				</YStack>
			</XStack>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ paddingLeft: 16 }}>
					<Text style={styles.sectionTitle}>All boards</Text>
				</View>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ gap: 16, paddingLeft: 16 }}
				>
					{boards?.map((board) => (
						<TouchableBounce
							key={board._id}
							style={styles.cardTouchable}
							onPress={() => router.push(`/board/${board._id}`)}
						>
							<View style={styles.card}>
								<Text style={styles.cardTitle}>{board.title}</Text>
								<Text style={styles.cardDescription} numberOfLines={2}>
									{board.description}
								</Text>
							</View>
						</TouchableBounce>
					))}
				</ScrollView>
			</ScrollView>
		</YStack>
	);
}

const styles = StyleSheet.create((_th, rt) => ({
	container: {
		paddingTop: rt.insets.top,
	},
	colorsContainer: {
		width: "100%",
		flexDirection: "row",
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
	},
	cardTouchable: {
		marginRight: 16,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 20,
		minWidth: 180,
		minHeight: 120,
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
		justifyContent: "center",
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	cardDescription: {
		fontSize: 14,
		color: "#444",
	},
}));
