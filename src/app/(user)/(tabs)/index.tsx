import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";

export default function IndexScreen() {
	return (
		<YStack flex={1} pd="lg" gap="lg" style={styles.container}>
			<XStack ai="center" jc="between">
				<YStack>
					<Text variant="h1">JeopardyTime</Text>
				</YStack>
				<YStack>
					<TouchableBounce onPress={() => router.push("/changelogs")}>
						<FontAwesome size={28} name="newspaper-o" color="black" />
					</TouchableBounce>
				</YStack>
			</XStack>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ gap: 24 }}
			>
				<YStack flex={0} gap="lg">
					<Card>
						<CardHeader>
							<XStack ai="center" gap="sm">
								<FontAwesome size={24} name="star" color="black" />
								<Text variant="h2">Your Boards</Text>
							</XStack>
						</CardHeader>
						<CardContent>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									gap: 20,
									padding: 10,
								}}
							>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "yellow",
									}}
								/>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "green",
									}}
								/>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "blue",
									}}
								/>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "pink",
									}}
								/>
							</ScrollView>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<XStack ai="center" gap="sm">
								<FontAwesome size={24} name="trophy" color="black" />
								<Text variant="h2">Top Boards</Text>
							</XStack>
						</CardHeader>
						<CardContent>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{
									gap: 20,
									padding: 10,
								}}
							>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "brown",
									}}
								/>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "yellow",
									}}
								/>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "teal",
									}}
								/>
								<View
									style={{
										height: 200,
										width: 200,
										borderRadius: 8,
										backgroundColor: "orange",
									}}
								/>
							</ScrollView>
						</CardContent>
					</Card>
				</YStack>
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
}));
