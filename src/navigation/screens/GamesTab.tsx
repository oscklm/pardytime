import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native-unistyles";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";

export function GamesTab() {
	const navigation = useNavigation();

	return (
		<YStack flex={1} gap="lg" py="lg">
			<YStack flex={1} gap="md">
				<YStack px="lg">
					<Text variant="h2">Your Games</Text>
				</YStack>
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create((th, rt) => ({
	heroSection: {
		height: 125,
		paddingTop: rt.insets.top,
		padding: th.space.lg,
		gap: th.space.lg,
		backgroundColor: th.colors.purple,
	},
	contentContainer: {
		gap: th.space.lg,
		paddingHorizontal: th.space.lg,
	},
}));
