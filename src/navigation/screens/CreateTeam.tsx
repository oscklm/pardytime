import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useMutation } from "convex/react";
import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type Props = StaticScreenProps<{
	gameId: Id<"games">;
}>;

export function CreateTeam({ route }: Props) {
	const navigation = useNavigation();
	const [nickname, setNickname] = useState("");
	const createTeam = useMutation(api.games.mutations.createTeam);

	const handleCreateTeam = async () => {
		await createTeam({
			gameId: route.params.gameId,
			nickname,
		});

		navigation.canGoBack() && navigation.goBack();
	};

	return (
		<YStack flex={1} gap="lg" pd="lg">
			<Text variant="h2">Create a new team</Text>
			<YStack>
				<View>
					<TextInput
						placeholder="Team name"
						value={nickname}
						onChangeText={setNickname}
					/>
				</View>
			</YStack>
			<Button variant="success" onPress={handleCreateTeam}>
				Create team
			</Button>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	boardListContainer: {
		gap: th.space.md,
	},
}));
