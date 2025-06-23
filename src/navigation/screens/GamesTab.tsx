import { FlatList } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { GameListItem } from "@/components/games/GameListItem";
import { ListEmptyComponent } from "@/components/ListEmptyComponent";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/lib/convex";
import { useUser } from "@/providers/user-provider";

export function GamesTab() {
	const user = useUser();

	const { data, status, error } = useQueryWithStatus(
		api.games.queries.getAllByOwnerId,
		{
			ownerId: user._id,
		},
	);

	return (
		<YStack flex={1} gap="lg" py="lg">
			<YStack flex={1} gap="md">
				<YStack px="lg">
					<Text variant="h2">Your Games</Text>
				</YStack>
				<FlatList
					data={data}
					contentContainerStyle={styles.contentContainer}
					ListEmptyComponent={() => (
						<ListEmptyComponent
							status={status}
							descriptor="games"
							message={error?.message}
						/>
					)}
					renderItem={({ item }) => <GameListItem game={item} />}
				/>
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
