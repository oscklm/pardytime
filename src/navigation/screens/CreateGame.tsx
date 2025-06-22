import { useNavigation } from "@react-navigation/native";
import { useMutation } from "convex/react";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import { useUser } from "@/providers/user-provider";

export function CreateGame() {
	const navigation = useNavigation();
	const user = useUser();
	const createGame = useMutation(api.games.mutations.create);

	const handleCreateGame = async () => {
		const gameId = await createGame({
			userId: user._id,
		});

		navigation.canGoBack() && navigation.goBack();
	};

	return (
		<YStack flex={1} gap="md" pd="lg">
			<Text variant="h2">Create a new game</Text>
			<Text>This is WIP. So only to use for testing QR feature.</Text>
			<Button sensory="light" variant="success" onPress={handleCreateGame}>
				Create Test Game
			</Button>
		</YStack>
	);
}
