import type { StaticScreenProps } from "@react-navigation/native";
import { useQuery } from "convex/react";
import QRCode from "react-native-qrcode-svg";
import { GameStatusBadge } from "@/components/games/GameStatusBadge";
import LoadingView from "@/components/LoadingView";
import Text from "@/components/ui/Text";
import XStack from "@/components/ui/XStack";
import YStack from "@/components/ui/YStack";
import { api } from "@/convex/_generated/api";

type Props = StaticScreenProps<{
	code: string;
}>;

const statusToColor = {
	pending: "yellow",
	active: "green",
	completed: "red",
};

export function Game({ route }: Props) {
	const game = useQuery(api.games.queries.getByGameCode, {
		code: route.params.code,
	});

	if (!game) {
		return <LoadingView />;
	}

	const gameLink = `jeopardytime://game?code=${game.code}`;

	return (
		<YStack flex={1} gap="lg" pd="lg">
			<YStack gap="md">
				<XStack jc="between" gap="md">
					<YStack>
						<GameStatusBadge status={game.status} />
						<Text variant="h1">#{game.code}</Text>
					</YStack>
					<QRCode value={gameLink} size={100} />
				</XStack>
			</YStack>
		</YStack>
	);
}
