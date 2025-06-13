import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { Card, CardContent } from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import TouchableBounce from "@/components/ui/TouchableBounce";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { useUser } from "@/providers/user-provider";

export default function MyProfileScreen() {
	const { user } = useUser();
	return (
		<YStack flex={1} pd="lg" gap="lg" style={styles.container}>
			<XStack ai="center" jc="between">
				<YStack>
					<Text variant="h1">@{user.username}</Text>
				</YStack>
				<YStack>
					<TouchableBounce
						sensory="light"
						onPress={() => router.push("/settings")}
					>
						<FontAwesome size={28} name="cog" color="black" />
					</TouchableBounce>
				</YStack>
			</XStack>
			<YStack flex={0} gap="lg">
				<Card>
					<CardContent>
						<Text>Something...</Text>
					</CardContent>
				</Card>
			</YStack>
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
