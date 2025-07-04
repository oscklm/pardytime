import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { RootStackParamList } from "@/navigation/RootStack";

type CreateTeamScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"CreateTeam"
>;

export function CreateTeam({ route, navigation }: CreateTeamScreenProps) {
	const [nickname, setNickname] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const createTeam = useMutation(api.games.mutations.createTeam);
	const generateUploadUrl = useMutation(
		api.storage.mutations.generateUploadUrl,
	);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1], // Square crop
			quality: 0.2, // Moderate quality
		});
		if (!result.canceled && result.assets && result.assets.length > 0) {
			setImage(result.assets[0].uri);
		}
	};

	const handleCreateTeam = async () => {
		if (!nickname) {
			alert("Team name is required");
			return;
		}

		if (nickname.length < 2) {
			alert("Nickname must be at least 2 characters");
			return;
		}

		if (nickname.length > 16) {
			alert("Nickname must be less than 16 characters");
			return;
		}

		let imageId: Id<"_storage"> | undefined;

		setIsLoading(true);

		if (image) {
			const uploadUrl = await generateUploadUrl();
			const response = await fetch(uploadUrl, {
				method: "POST",
				headers: { "Content-Type": "image/jpeg" },
				body: await (await fetch(image)).blob(),
			});
			const { storageId } = await response.json();
			imageId = storageId;
		}

		await createTeam({
			values: {
				gameId: route.params.gameId,
				nickname,
				score: 0,
				imageId,
			},
		});

		setIsLoading(false);
		navigation.canGoBack() && navigation.goBack();
	};

	return (
		<YStack flex={1} gap="lg" pd="lg">
			<Text variant="h2">Create a team</Text>
			<YStack gap="lg">
				<View style={styles.imageContainer}>
					<Image source={{ uri: image ?? undefined }} style={styles.image} />
					<Button variant="outline" onPress={pickImage}>
						{image ? "Change image" : "Pick image"}
					</Button>
				</View>
				<View>
					<TextInput
						placeholder="Team name"
						autoComplete="off"
						autoCorrect={false}
						value={nickname}
						onChangeText={setNickname}
					/>
				</View>
			</YStack>
			<Button
				variant="success"
				onPress={handleCreateTeam}
				isLoading={isLoading}
				disabled={isLoading}
			>
				Create team
			</Button>
		</YStack>
	);
}

const styles = StyleSheet.create((th) => ({
	imageContainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: th.space.md,
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: th.radius.lg,
		backgroundColor: th.colors.backgroundSecondary,
	},
	boardListContainer: {
		gap: th.space.md,
	},
}));
