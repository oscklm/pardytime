import {
	type StaticScreenProps,
	useNavigation,
} from "@react-navigation/native";
import { useQuery } from "convex/react";
import QRCode from "react-native-qrcode-svg";
import { StyleSheet } from "react-native-unistyles";
import LoadingView from "@/components/LoadingView";
import Text from "@/components/ui/Text";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

type Props = StaticScreenProps<{
	code: string;
}>;

export function Game({ route }: Props) {
	const navigation = useNavigation();

	const game = useQuery(api.games.queries.getByGameCode, {
		code: route.params.code,
	});

	if (!game) {
		return <LoadingView />;
	}

	const gameLink = `jeopardytime://game?code=${game.gameCode}`;

	return (
		<YStack flex={1} gap="lg" py="xl" insetTop>
			<YStack gap="md" ai="center">
				<QRCode value={gameLink} size={200} />
				<YStack>
					<Text variant="h1">#{game.gameCode}</Text>
				</YStack>
			</YStack>
		</YStack>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 9999,
	},
});
