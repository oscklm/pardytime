import { CommonActions, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import BoardCard from "@/components/BoardCard";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@/providers/user-provider";

export function CreateGame() {
	const navigation = useNavigation();
	const user = useUser();
	const createGame = useMutation(api.games.mutations.create);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [boardId, setBoardId] = useState<Id<"boards"> | undefined>(undefined);
	const [boardLabel, setBoardLabel] = useState<string | undefined>(undefined);

	const boards = useQuery(api.boards.queries.getAll, {});

	const handleCreateGame = async () => {
		if (!boardId) {
			alert("Please select a board");
			return;
		}

		const code = await createGame({
			userId: user._id,
			boardId,
		});

		navigation.canGoBack() && navigation.goBack();

		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "Game", params: { code } }],
			}),
		);
	};

	const handleSelectBoard = (board: Doc<"boards">) => {
		setBoardId(board._id);
		setBoardLabel(board.title);
		setIsModalVisible(false);
	};

	return (
		<>
			<YStack flex={1} gap="lg" pd="lg">
				<Text variant="h2">Create a new game</Text>
				<YStack>
					<Text variant="label">Board</Text>
					<View>
						<TextInput
							editable={false}
							placeholder="Select a board"
							value={boardLabel}
							onPress={() => setIsModalVisible(true)}
						/>
						<View
							style={{
								position: "absolute",
								right: 4,
								top: 0,
								bottom: 0,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button
								variant="icon"
								icon="edit"
								onPress={() => setIsModalVisible(true)}
							/>
						</View>
					</View>
				</YStack>
				<Button variant="success" onPress={handleCreateGame}>
					Create game
				</Button>
			</YStack>
			<Modal
				presentationStyle="formSheet"
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<YStack gap="md" pd="lg">
					<Text variant="h2">Pick a board</Text>
					<FlatList
						data={boards}
						contentContainerStyle={styles.boardListContainer}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => handleSelectBoard(item)}>
								<BoardCard board={item} />
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item._id}
					/>
				</YStack>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create((th) => ({
	boardListContainer: {
		gap: th.space.md,
	},
}));
